'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePost(prevState: any, formData: FormData) {
    console.log("Updating post...");
    const supabase = await createClient();

    const id = formData.get('id') as string;
    if (!id) return { success: false, message: "Post ID is required for update" };

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // Calculate reading time
    const words = content ? content.trim().split(/\s+/).length : 0;
    const reading_time = Math.ceil(words / 200);

    const slug = formData.get('slug') as string;

    // Check for author - simplified for now, assuming single author or handled by defaults
    // In a real app we'd get the current user's author profile
    const { data: defaultAuthor } = await supabase
        .from('authors')
        .select('id')
        .limit(1)
        .single();

    const rawData = {
        title,
        slug,
        category_id: formData.get('category_id') as string, // MUST be UUID
        excerpt: formData.get('excerpt') as string,
        content,
        featured_image_alt: formData.get('featured_image_alt') as string,
        // is_published: formData.get('is_published') === 'on', // Deprecated
        status: formData.get('status') as string,
        published_at: formData.get('published_at') as string,
        is_featured: formData.get('is_featured') === 'on',
        meta_title: formData.get('meta_title') as string,
        meta_description: formData.get('meta_description') as string,
        canonical_url: formData.get('canonical_url') as string,
        reading_time,
        faq_items: JSON.parse(formData.get('faq_items') as string || '[]'),
        updated_at: new Date().toISOString(),
        // Only set author if not already set (fetching existing to check would be safer, 
        // but typically we don't change author on edit unless explicitly requested)
        // For now, we leave author_id alone on update unless strictly needed.
    };

    // Remove undefined/null keys if any? No, formData.get returns string or null.
    // If category_id is invalid (e.g. empty string), we should sanitize.
    if (!rawData.category_id || rawData.category_id.length < 10) {
        // Fallback or error?
        // Let's try to lookup category by slug/name 'Geral' just in case, or fail?
        // Failing is better so we fix frontend.
        delete (rawData as any).category_id; // Don't update if empty
    }

    const { error } = await supabase
        .from('blog_posts')
        .update(rawData)
        .eq('id', id);

    if (error) {
        console.error("Update Error:", error);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/posts');
    revalidatePath('/blog');

    // Instead of redirect, maybe return success so UI can show toast?
    // But standardized flow is redirect.
    redirect('/admin/posts');
}
