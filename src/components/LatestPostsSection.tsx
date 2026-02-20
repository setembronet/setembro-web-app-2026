import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export async function LatestPostsSection() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from("blog_posts")
        .select(`
            *,
            category:categories(name, slug),
            author:authors(name, avatar_url)
        `)
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

    console.log("LatestPostsSection: Fetched posts:", posts?.length, posts);
    if (!posts || posts.length === 0) {
        console.log("LatestPostsSection: No posts found or error occurred.");
        return null;
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Últimas do Blog
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Fique por dentro das novidades sobre tecnologia, IA e automação.
                        </p>
                    </div>
                    <Button variant="ghost" className="gap-2" asChild>
                        <Link href="/blog">
                            Ver todos os artigos <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                            {(post.featured_image || post.cover_image) && (
                                <div className="aspect-video w-full overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.featured_image || post.cover_image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardHeader className="p-6 pb-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <span className="bg-secondary px-2 py-0.5 rounded-md text-xs font-medium text-secondary-foreground">
                                        {post.category?.name || "Geral"}
                                    </span>
                                    {post.published_at && (
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>
                                                {format(new Date(post.published_at), "d 'de' MMMM", {
                                                    locale: ptBR,
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <Link href={`/blog/${post.category?.slug || 'geral'}/${post.slug}`} className="hover:underline">
                                    <h3 className="line-clamp-2 text-xl font-bold leading-tight">
                                        {post.title}
                                    </h3>
                                </Link>
                            </CardHeader>
                            <CardContent className="p-6 pt-2 flex-1">
                                <p className="line-clamp-3 text-muted-foreground text-sm">
                                    {post.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 mt-auto">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    {post.author?.avatar_url && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={post.author.avatar_url}
                                            alt={post.author.name}
                                            className="h-6 w-6 rounded-full"
                                        />
                                    )}
                                    <span className="text-muted-foreground">
                                        Por <span className="text-foreground">{post.author?.name}</span>
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
