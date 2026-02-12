import { createClient } from '@/utils/supabase/server';
import { IBlogRepository } from '@/core/repositories/IBlogRepository';
import { BlogPost } from '@/core/domain/entities/BlogPost';
import { Author } from '@/core/domain/entities/Author';

interface AuthorRow {
    id: string;
    name: string;
    bio: string;
    avatar_url: string;
    social_links: Record<string, string>;
}

interface BlogPostRow {
    id: string;
    slug: string;
    title: string;
    content: string;
    category_id: string;
    author_id: string;
    excerpt: string;
    cover_image: string;
    seo_metadata: Record<string, unknown>;
    published_at: string | null;
    author: AuthorRow;
}

export class SupabaseBlogRepository implements IBlogRepository {
    async findLatest(limit: number): Promise<BlogPost[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('blog_posts')
            .select(`
        *,
        author:authors(*)
      `)
            .order('published_at', { ascending: false })
            .limit(limit)
            .returns<BlogPostRow[]>();

        if (error) throw new Error(`Failed to fetch latest posts: ${error.message}`);

        return data.map(this.mapToEntity);
    }

    async findBySlug(slug: string): Promise<BlogPost | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('blog_posts')
            .select(`
        *,
        author:authors(*)
      `)
            .eq('slug', slug)
            .single<BlogPostRow>();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw new Error(`Failed to fetch post by slug: ${error.message}`);
        }

        return this.mapToEntity(data);
    }

    async findByCategory(categoryId: string): Promise<BlogPost[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('blog_posts')
            .select(`
        *,
        author:authors(*)
      `)
            .eq('category_id', categoryId)
            .order('published_at', { ascending: false })
            .returns<BlogPostRow[]>();

        if (error) throw new Error(`Failed to fetch posts by category: ${error.message}`);

        return data.map(this.mapToEntity);
    }

    async search(query: string): Promise<BlogPost[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('blog_posts')
            .select(`
        *,
        author:authors(*)
      `)
            .ilike('title', `%${query}%`)
            .order('published_at', { ascending: false })
            .returns<BlogPostRow[]>();

        if (error) throw new Error(`Failed to search posts: ${error.message}`);

        return data.map(this.mapToEntity);
    }

    private mapToEntity(data: BlogPostRow): BlogPost {
        const author = data.author ? new Author(
            data.author.id,
            data.author.name,
            data.author.bio,
            data.author.avatar_url,
            data.author.social_links
        ) : new Author('unknown', 'Unknown Author'); // Fallback

        return new BlogPost(
            data.id,
            data.slug,
            data.title,
            data.content,
            data.category_id,
            data.author_id,
            author,
            data.excerpt,
            data.cover_image,
            data.seo_metadata,
            data.published_at ? new Date(data.published_at) : undefined,
            undefined, // createdAt
            undefined  // updatedAt
        );
    }
}
