import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

export default async function BlogPage() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from("blog_posts")
        .select(`
            *,
            author:author_id(name, avatar_url),
            category:category_id(name, slug)
        `)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });

    console.log("BlogPage: Fetched posts:", posts?.length);

    return (
        <div className="container py-20">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Blog</h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    Artigos, novidades e insights sobre inteligência artificial e automação.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow">
                            {post.featured_image && (
                                <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary">{post.category?.name || "Geral"}</Badge>
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.published_at || post.created_at).toLocaleDateString("pt-BR")}
                                    </span>
                                </div>
                                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.category?.slug || 'geral'}/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {post.meta_description || post.excerpt}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="mt-auto pt-0">
                                <Link href={`/blog/${post.category?.slug || 'geral'}/${post.slug}`} className="w-full">
                                    <Button variant="ghost" className="w-full justify-between group">
                                        Ler artigo
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">Nenhum post encontrado.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
