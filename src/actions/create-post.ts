'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateEmbedding } from "@/lib/ai/gemini";
import { syncPostToRAG } from "@/lib/ai/sync-rag";

export async function createPost(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // Calculate reading time directly here for now (simple heuristic: 200 words/min)
    const words = content ? content.trim().split(/\s+/).length : 0;
    const reading_time = Math.ceil(words / 200);

    let slug = formData.get('slug') as string;

    // Ensure slug uniqueness (simple append random string if exists - or better, check DB)
    // For MVP/Speed, we'll append a random 4-char string if it's a new post or slug changed
    // Real implementation would check DB, but here we trust the form unless conflict
    // Actually, let's just sanitise it here.
    slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Get default author if needed
    const { data: defaultAuthor } = await supabase
        .from('authors')
        .select('id')
        .limit(1)
        .single();

    const category_id = formData.get('category_id') as string;

    const rawData = {
        title,
        slug,
        category_id: category_id && category_id.length > 10 ? category_id : undefined, // crude UUID check
        author_id: defaultAuthor?.id, // Ensure author is linked
        excerpt: formData.get('excerpt') as string,
        content,
        image: formData.get('image') as string,
        featured_image_alt: formData.get('featured_image_alt') as string,
        download_pdf_url: formData.get('download_pdf_url') as string,
        // is_published: formData.get('is_published') === 'on', // Deprecated
        status: formData.get('status') as string || 'draft',
        published_at: formData.get('published_at') as string || new Date().toISOString(),
        is_featured: formData.get('is_featured') === 'on',
        meta_title: formData.get('meta_title') as string,
        meta_description: formData.get('meta_description') as string,
        canonical_url: formData.get('canonical_url') as string,
        reading_time,
        faq_items: JSON.parse(formData.get('faq_items') as string || '[]'),
    };

    // --- Início Integração IA (Julia) ---
    // Gerar embedding semântico para a Busca Híbrida combinando título, resumo e conteúdo
    const textToEmbed = `${title}\n${rawData.excerpt}\n${content}`;
    const embedding = await generateEmbedding(textToEmbed);

    const finalData = {
        ...rawData,
        ...(embedding ? { embedding } : {}) // Adiciona o campo embedding se a IA responder
    };
    // --- Fim Integração IA ---

    const { data: insertedPost, error } = await supabase
        .from('blog_posts')
        .insert(finalData)
        .select()
        .single();

    if (!error && insertedPost) {
        // --- Injeta o Artigo no Cérebro da Ana (RAG) ---
        // A função interna já cuida do status (só vai se for 'published')
        await syncPostToRAG(
            insertedPost.id,
            insertedPost.title,
            insertedPost.content,
            insertedPost.slug,
            insertedPost.status
        );
    }

    if (error) {
        // If unique violation on slug, try appending random suffix
        if (error.code === '23505' && error.message.includes('slug')) { // Unique violation
            const newSlug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
            console.log(`Slug conflict for ${slug}, trying ${newSlug}`);
            return createPost(prevState, {
                ...formData,
                get: (key: string) => (key === 'slug' ? newSlug : formData.get(key)),
            } as any);
        }
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/posts');
    revalidatePath('/blog');
    redirect('/admin/posts');
}
