import { BLOG_CATEGORIES, getCategoryBySlug, getPostsByCategory } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "next-intl";

type Props = {
    params: Promise<{ category: string; locale: string }>;
};

export function generateStaticParams() {
    return BLOG_CATEGORIES.flatMap((category) => [
        { category: category.slug },
        { category: category.id } // Support both ID and Slug if needed, or just slug
    ]);
}

export default async function CategoryPage({ params }: Props) {
    const { category: categorySlug, locale } = await params;
    const category = getCategoryBySlug(categorySlug);

    if (!category) {
        notFound();
    }

    const posts = getPostsByCategory(category.id);
    const lang = locale as 'pt' | 'en' | 'es';

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href="/blog">
                    <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para o Blog
                    </Button>
                </Link>
            </div>

            <header className="mb-12 text-center">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {category.label[lang]}
                </span>
                <h1 className="text-4xl font-bold mt-2 mb-4">{category.label[lang]}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {category.description[lang]}
                </p>
            </header>

            {posts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${category.slug}/${post.slug}`} className="group">
                            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                                <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground">
                                    {/* Placeholder for Image */}
                                    <span>Imagem do Post</span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="text-sm text-muted-foreground mt-auto">
                                        {post.date}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
                    <p className="text-muted-foreground">
                        Nenhum post encontrado nesta categoria ainda.
                    </p>
                    <Button className="mt-4" variant="outline">
                        Sugerir um Tópico
                    </Button>
                </div>
            )}
        </div>
    );
}
