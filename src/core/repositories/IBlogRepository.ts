import { BlogPost } from '../domain/entities/BlogPost';

export interface IBlogRepository {
    findLatest(limit: number): Promise<BlogPost[]>;
    findBySlug(slug: string): Promise<BlogPost | null>;
    findByCategory(categoryId: string): Promise<BlogPost[]>;
    search(query: string): Promise<BlogPost[]>;
}
