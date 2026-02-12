import { createClient } from '@/utils/supabase/server';

export interface SearchResult {
    id: string;
    content: string;
    metadata: Record<string, unknown>;
    similarity: number;
}

export class SupabaseVectorStore {
    async search(queryEmbedding: number[], matchThreshold: number = 0.7, matchCount: number = 5): Promise<SearchResult[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.rpc('match_documents', {
            query_embedding: queryEmbedding,
            match_threshold: matchThreshold,
            match_count: matchCount,
        });

        if (error) throw new Error(`Vector search failed: ${error.message}`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (data as any[]).map((item) => ({
            id: item.id,
            content: item.content,
            metadata: item.metadata,
            similarity: item.similarity,
        }));
    }
}
