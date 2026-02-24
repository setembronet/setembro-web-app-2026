import { getAllPosts } from "@/lib/blog-data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://setembro.net";

    const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.category?.[0]?.slug || 'geral'}/${post.slug}`,
        lastModified: new Date(post.published_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...blogEntries,
    ];
}
