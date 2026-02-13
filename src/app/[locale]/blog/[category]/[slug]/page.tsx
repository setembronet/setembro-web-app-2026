import { Metadata } from 'next';
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getPost, getCategoryBySlug } from "@/lib/blog-data";

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return { title: 'Post não encontrado' };

    return {
        title: `${post.title} | Setembro.net Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params;
    const post = getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Navbar />
            <main className="flex-1">
                <article className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
                    <header className="mb-8 text-center">
                        <div className="mb-4 flex justify-center gap-2">
                            <Badge variant="secondary">{post.category_id}</Badge>
                        </div>
                        <h1 className="mb-4 font-heading text-4xl font-bold leading-tight md:text-5xl text-foreground">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                Setembro.net
                            </span>
                            <span>•</span>
                            <time dateTime={post.date}>
                                {post.date}
                            </time>
                        </div>
                    </header>

                    <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl bg-muted">
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover" /> : "Capa do Post"}
                        </div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert mx-auto max-w-none text-foreground/90">
                        <p>{post.excerpt}</p>
                        <p>Conteúdo completo do post aqui...</p>
                    </div>

                    <hr className="my-12 border-border" />

                </article>
            </main>
            {/* Footer removed for now as import was uncertain, can add back later */}
        </div>
    );
}
