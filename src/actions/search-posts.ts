'use server';

import { createClient } from '@/lib/supabase/server';
import { generateEmbedding } from '@/lib/ai/gemini';

export type SearchResult = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    published_at: string;
    category_id: string;
    category_slug: string;
    semantic_similarity: number;
    keyword_score: number;
};

export async function searchPosts(query: string, limit: number = 5): Promise<SearchResult[]> {
    if (!query || query.trim().length === 0) return [];

    const supabase = await createClient();

    // 1. Generate an embedding for the user's search query using Gemini (Julia)
    const queryEmbedding = await generateEmbedding(query);

    // Fallback: If AI fails or doesn't return vector, use zero-vector to run keyword-only search
    const vectorStr = queryEmbedding
        ? `[${queryEmbedding.join(',')}]`
        : `[${new Array(3072).fill(0).join(',')}]`;

    // 2. Call the hybrid search RPC function we created in Supabase
    const { data, error } = await supabase.rpc('search_posts_hybrid', {
        query_embedding: vectorStr,
        query_text: query,
        match_count: limit
    });

    if (error) {
        console.error("Hybrid Search Error:", error.message);
        return [];
    }

    return (data as SearchResult[]) || [];
}
