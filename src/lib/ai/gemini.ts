// src/lib/ai/gemini.ts

export async function generateEmbedding(text: string): Promise<number[] | null> {
    if (!text || text.trim() === '') return null;

    // Note: In Next.js Server Actions, process.env is securely available.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn("GEMINI_API_KEY is not set. Embedding generation will fail.");
        return null;
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "models/text-embedding-004",
                    content: { parts: [{ text }] }
                })
            }
        );

        if (!response.ok) {
            console.error("Gemini API falhou com status:", response.status);
            return null;
        }

        const data = await response.json();

        if (data.embedding && data.embedding.values) {
            return data.embedding.values;
        }

        return null;
    } catch (error) {
        console.error("Failed to generate embedding with Gemini:", error);
        return null;
    }
}
