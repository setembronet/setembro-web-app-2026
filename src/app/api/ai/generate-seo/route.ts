import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        if (!content) {
            return NextResponse.json({ error: "Conteúdo não fornecido." }, { status: 400 });
        }

        // Initialize Supabase admin client to bypass RLS and read settings
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
        const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

        const { data: settings } = await supabase.from("system_settings").select("*");
        const provider = settings?.find(s => s.key === "ai_provider")?.value || "gemini";
        const geminiKey = settings?.find(s => s.key === "gemini_api_key")?.value;
        const openaiKey = settings?.find(s => s.key === "openai_api_key")?.value;

        const prompt = `Você é um especialista em SEO. Aja como Agente Julia da Setembro.net.
Analise o seguinte conteúdo de artigo de blog em HTML e sugira os metadados ideais (Title, Description, Excerpt, e FAQs) em formato JSON estrito.
        
Conteúdo:
"""
${content}
"""

Responda SOMENTE e exclusivamente com o objeto JSON abaixo, preservando as chaves exatas (title, description, excerpt, faq_items).
- title: Meta title focado em SEO (max 60 chars)
- description: Meta description atraente (max 160 chars)
- excerpt: Um resumo de 2 parágrafos para a listagem (max 300 chars)
- faq_items: Array de 3 a 5 objetos contendo { "question": "...", "answer": "..." }

FORMATO OBRIGATÓRIO (retorne apenas JSON):
{
    "title": "String",
    "description": "String",
    "excerpt": "String",
    "faq_items": [ { "question": "String", "answer": "String" } ]
}`;

        let metadata = {};

        if (provider === "openai") {
            if (!openaiKey) return NextResponse.json({ error: "OpenAI API Key não configurada." }, { status: 500 });

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${openaiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    response_format: { type: "json_object" },
                    messages: [
                        { role: "system", content: "Você é um assistente de extração SEO estruturado em JSON." },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.2,
                })
            });

            if (!response.ok) throw new Error("Falha ao chamar OpenAI API");
            const data = await response.json();
            const rawOutput = data.choices[0].message.content || "{}";
            metadata = JSON.parse(rawOutput);

        } else {
            // Default Gemini
            if (!geminiKey) return NextResponse.json({ error: "Gemini API Key não configurada." }, { status: 500 });

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${geminiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.2,
                        responseMimeType: "application/json"
                    }
                })
            });

            if (!response.ok) throw new Error("Falha ao chamar Gemini API");
            const data = await response.json();
            const rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
            metadata = JSON.parse(rawOutput);
        }

        return NextResponse.json(metadata);
    } catch (error) {
        console.error("Error generating SEO metatags:", error);
        return NextResponse.json({ error: "Erro interno ao gerar o SEO." }, { status: 500 });
    }
}
