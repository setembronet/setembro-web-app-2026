'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const rawData = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        category_id: formData.get('category_id') as string,
        excerpt: formData.get('excerpt') as string,
        content: formData.get('content') as string,
        image: formData.get('image') as string,
        is_published: formData.get('is_published') === 'on',
        published_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('blog_posts')
        .insert(rawData);

    if (error) {
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/posts');
    revalidatePath('/blog');
    redirect('/admin/posts');
}
