'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getRAGDocuments() {
    const supabase = await createClient();

    // Fetch all metadata to group by document. 
    // For extremely large datasets, this should be moved to a Postgres RPC grouped query.
    const { data, error } = await supabase
        .from('document_chunks')
        .select('id, metadata, created_at');

    if (error) {
        console.error("Error fetching RAG documents:", error);
        return [];
    }

    const grouped = new Map<string, any>();

    data.forEach((chunk) => {
        const meta = chunk.metadata || {};
        const key = meta.post_id || meta.slug || chunk.id;

        if (!grouped.has(key)) {
            grouped.set(key, {
                id: key,
                title: meta.title || 'Sem Título',
                slug: meta.slug || '',
                source: meta.source || 'Desconhecido',
                post_id: meta.post_id,
                chunkCount: 1,
                last_updated: chunk.created_at
            });
        } else {
            const existing = grouped.get(key);
            existing.chunkCount += 1;
            if (new Date(chunk.created_at) > new Date(existing.last_updated)) {
                existing.last_updated = chunk.created_at;
            }
        }
    });

    return Array.from(grouped.values()).sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime());
}

export async function deleteRAGDocument(identifier: string, type: 'post_id' | 'slug') {
    const supabase = await createClient();

    const filterKey = type === 'post_id' ? 'metadata->>post_id' : 'metadata->>slug';

    const { data: chunksToDelete } = await supabase
        .from('document_chunks')
        .select('id')
        .filter(filterKey, 'eq', identifier);

    if (!chunksToDelete || chunksToDelete.length === 0) {
        return { success: false, message: "Conhecimento não encontrado na memória." };
    }

    const idsToDelete = chunksToDelete.map((c: any) => c.id);

    const { error } = await supabase
        .from('document_chunks')
        .delete()
        .in('id', idsToDelete);

    if (error) {
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/rag');
    return { success: true };
}
