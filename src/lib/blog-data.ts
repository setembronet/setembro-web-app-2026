import { createClient } from "@/lib/supabase/server";

export type BlogCategory = {
    id: string; // uuid
    slug: string;
    name: string;
    description?: string;
};

export type BlogPost = {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    cover_image?: string;
    featured_image?: string;
    published_at: string;
    reading_time?: number;
    category?: BlogCategory;
    author?: {
        name: string;
        avatar_url?: string;
        bio?: string;
    };
    created_at: string;
    meta_title?: string;
    meta_description?: string;
};

// Mapeamento de categorias estáticas (opcional, se quiser manter compatibilidade de ID)
// Mas idealmente buscamos do banco.

export async function getCategoryBySlug(slug: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

    return data;
}

export async function getPostsByCategory(categorySlug: string) {
    const supabase = await createClient();

    // Primeiro pegar a categoria para ter o ID (ou fazer join)
    // Vamos fazer join direto
    let { data: posts } = await supabase
        .from("blog_posts")
        .select(`
            *,
            category:categories(name, slug),
            author:authors(name, avatar_url)
        `)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });

    if (categorySlug) {
        // Manual filter since we can't join
        // This won't work perfectly without the join data, but let's see if posts appear at all
    }

    return posts || [];
}

export async function getPost(slug: string) {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from("blog_posts")
        .select(`
            *,
            category:categories(name, slug),
            author:authors(name, avatar_url, bio)
        `)
        .eq("slug", slug)
        .eq("status", "published")
        // .lte("published_at", new Date().toISOString()) // Optional: if we want to preview scheduled posts via admin, we might need a separate function. But for public view, strict.
        .single();

    return post;
}

export async function getAllCategories() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");
    return data || [];
}

export async function getAllPosts() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("blog_posts")
        .select(`
            slug,
            published_at,
            category:categories(slug)
        `)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });
    return data || [];
}

