import { NextResponse } from 'next/server';

// Mock OpenAI for now to avoid key dependency immediately, 
// allows testing loop without cost. User can enable real one later.
export async function POST(request: Request) {
    try {
        const { content } = await request.json();

        if (!content) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 });
        }

        // Simulating AI delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple heuristic generation
        const words = content.split(/\s+/);
        const title = words.slice(0, 10).join(' ') + '...';
        const description = words.slice(0, 30).join(' ') + '...';

        return NextResponse.json({
            title: `[AI] ${title}`,
            description: `[AI Generated] ${description}`,
            excerpt: description
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate SEO' }, { status: 500 });
    }
}
