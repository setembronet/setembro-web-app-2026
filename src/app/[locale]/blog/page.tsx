import { BLOG_CATEGORIES, MOCK_POSTS } from "@/lib/blog-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";

export default function BlogPage() {
    const locale = useLocale();
    const lang = locale as 'pt' | 'en' | 'es';

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Blog & Insights</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Novidades sobre IA, Desenvolvimento e estratégias digitais.
                </p>
            </header>

            {/* Categories Grid */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Categorias</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {BLOG_CATEGORIES.map((category) => (
                        <Link key={category.id} href={`/blog/${category.slug}`} className="group">
                            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col items-start bg-card">
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {category.label[lang]}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {category.description[lang]}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Recent Posts */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Últimas Publicações</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {MOCK_POSTS.map((post) => (
                        <Link key={post.id} href={`/blog/${post.category_id}/${post.slug}`} className="group">
                            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                                <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground">
                                    {/* Placeholder for Image */}
                                    <span>Imagem do Post</span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-semibold text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
                                            {BLOG_CATEGORIES.find(c => c.id === post.category_id)?.label[lang]}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 flex-1">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
