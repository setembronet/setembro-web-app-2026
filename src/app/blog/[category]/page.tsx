import { Navbar } from "@/components/Navbar";
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const categoryData = await getCategoryBySlug(category);

    if (!categoryData) {
        notFound();
    }

    const categories = await getAllCategories();
    const posts = await getPostsByCategory(category);

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Navbar />
            <div className="container py-20">
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                    <Badge variant="outline" className="text-lg px-4 py-1">{categoryData.name}</Badge>
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">posts sobre {categoryData.name}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        {categoryData.description}
                    </p>

                    {categories && categories.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            <Link href="/blog">
                                <Badge variant="outline" className="text-sm px-4 py-1.5 cursor-pointer hover:bg-secondary transition-colors">Todos</Badge>
                            </Link>
                            {categories.map((cat: any) => (
                                <Link key={cat.id} href={`/blog/${cat.slug}`}>
                                    <Badge variant={cat.slug === categoryData.slug ? "default" : "outline"} className="text-sm px-4 py-1.5 cursor-pointer hover:bg-secondary transition-colors">
                                        {cat.name}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow">
                                {(post.image) && (
                                    <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-muted relative">
                                        <Image
                                            src={post.image || ""}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform hover:scale-105"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="secondary">{post.category?.name || categoryData.name}</Badge>
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {post.published_at ? format(new Date(post.published_at), "d 'de' MMM", { locale: ptBR }) : ""}
                                        </span>
                                    </div>
                                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                                        <Link href={`/blog/${category}/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {post.excerpt}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="mt-auto pt-0">
                                    <Link href={`/blog/${category}/${post.slug}`} className="w-full">
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
                            <p className="text-muted-foreground">Nenhum post encontrado nesta categoria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
