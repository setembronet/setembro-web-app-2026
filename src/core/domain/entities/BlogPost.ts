import { Author } from './Author';

export interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export class BlogPost {
  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly title: string,
    public readonly content: string,
    public readonly categoryId: string,
    public readonly authorId: string,
    public readonly author: Author | null,
    public readonly excerpt?: string,
    public readonly coverImage?: string,
    public readonly seoMetadata: SeoMetadata = {},
    public readonly publishedAt?: Date,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) { }

  get isPublished(): boolean {
    return !!this.publishedAt && this.publishedAt <= new Date();
  }
}
