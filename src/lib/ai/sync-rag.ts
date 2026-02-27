import { createClient } from "@/lib/supabase/server";
import { generateEmbedding } from "@/lib/ai/gemini";

/**
 * Splits a large text into smaller chunks (approx 1000 characters by default) 
 * prioritizing paragraph breaks.
 */
function chunkText(text: string, maxChunkLength: number = 1000): string[] {
    const paragraphs = text.split('\n\n');
    const chunks: string[] = [];
    let currentChunk = '';

    for (const paragraph of paragraphs) {
        if (currentChunk.length + paragraph.length > maxChunkLength) {
            if (currentChunk.length > 0) {
                chunks.push(currentChunk.trim());
            }
            currentChunk = paragraph + '\n\n';
        } else {
            currentChunk += paragraph + '\n\n';
        }
    }

    if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

export async function syncPostToRAG(
    postId: string,
    title: string,
    content: string,
    slug: string,
    status: string
) {
    const supabase = await createClient();

    // 1. Delete old chunks related to this post (if updating or unpublishing)
    // We identify them via metadata->>'post_id'
    // To do this reliably without raw SQL, we use a raw query or match metadata->post_id directly
    // Supabase JS doesn't support deep JSON querying for delete easily, 
    // so it's safer to query the IDs first, then delete.
    const { data: chunksToDelete } = await supabase
        .from('document_chunks')
        .select('id, metadata')
        .filter('metadata->>post_id', 'eq', postId);

    if (chunksToDelete && chunksToDelete.length > 0) {
        const idsToDelete = chunksToDelete.map((c: any) => c.id);
        await supabase.from('document_chunks').delete().in('id', idsToDelete);
    }

    // 2. If it's not published, we stop here (forget it from Ana's memory)
    if (status !== 'published') {
        return;
    }

    // 3. Chunk the content combined with the title for context
    const fullText = `Título do Artigo: ${title}\n\n${content}`;
    const chunks = chunkText(fullText, 1000);

    // 4. Generate embeddings and insert into `document_chunks`
    console.log(`Starting RAG sync for post ${postId}. Chunks: ${chunks.length}`);
    for (const chunk of chunks) {
        try {
            const embedding = await generateEmbedding(chunk);
            if (embedding) {
                console.log(`Inserting chunk for post ${postId}...`);
                const { error } = await supabase.from('document_chunks').insert({
                    content: chunk,
                    embedding: embedding,
                    metadata: {
                        post_id: postId,
                        title: title,
                        slug: slug,
                        source: 'blog'
                    }
                });
                if (error) console.error("Supabase Error detail:", error);
            } else {
                console.warn(`Failed to generate embedding for a chunk of post ${postId}`);
            }
        } catch (err) {
            console.error(`Error inserting RAG chunk for post ${postId}:`, err);
        }
    }
    console.log(`Finished RAG sync for post ${postId}`);
}
