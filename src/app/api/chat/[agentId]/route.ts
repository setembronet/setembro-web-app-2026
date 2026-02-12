import { NextRequest, NextResponse } from 'next/server';
import { SupabaseAgentRepository } from '@/infrastructure/adapters/SupabaseAgentRepository';
import { SupabaseVectorStore } from '@/infrastructure/adapters/SupabaseVectorStore';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ agentId: string }> } // params is now a Promise in Next.js 15+
) {
    try {
        // Await params to access agentId
        const { agentId } = await params;
        const { message, messages } = await request.json();

        if (!message && (!messages || messages.length === 0)) {
            return NextResponse.json(
                { error: 'Message is required.' },
                { status: 400 }
            );
        }

        const currentMessage = message || messages[messages.length - 1].content;

        // 1. Fetch Agent System Prompt
        const agentRepository = new SupabaseAgentRepository();
        const systemPrompt = await agentRepository.getSystemPrompt(agentId);

        if (!systemPrompt) {
            return NextResponse.json(
                { error: 'Agent not found or inactive.' },
                { status: 404 }
            );
        }

        // 2. Generate Embedding for User Query
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: currentMessage,
        });
        const embedding = embeddingResponse.data[0].embedding;

        // 3. Search for Context (RAG)
        const vectorStore = new SupabaseVectorStore();
        const searchResults = await vectorStore.search(embedding, 0.7, 5);

        // 4. Construct Context String
        const context = searchResults.map((result) => result.content).join('\n\n');

        // 5. Prepare Messages for LLM
        const finalSystemPrompt = `${systemPrompt}\n\nRelevant Context:\n${context}`;

        // Use history if provided, otherwise standard chat structure
        const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: 'system', content: finalSystemPrompt },
            ...(messages ? messages.slice(0, -1).map((m: OpenAI.Chat.Completions.ChatCompletionMessageParam) => ({ role: m.role, content: m.content })) : []),
            { role: 'user', content: currentMessage }
        ];

        // 6. Call LLM (Streaming response could be an enhancement, handling simple JSON for now)
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: chatMessages,
            temperature: 0.7,
        });

        const reply = completion.choices[0].message.content;

        // 7. Store Interaction (Optional - can be done via Supabase directly or another repository)
        // For now, we return the response.

        return NextResponse.json({ reply });

    } catch (error: unknown) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
