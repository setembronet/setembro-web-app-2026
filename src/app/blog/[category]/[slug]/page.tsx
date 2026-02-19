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
    const post = await getPost(slug);
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
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.meta_description || post.excerpt,
        "image": post.featured_image ? [post.featured_image] : [],
        "datePublished": post.published_at,
        "dateModified": post.updated_at || post.published_at,
        "author": [{
            "@type": "Person",
            "name": post.author?.name || "Setembro.net",
            "url": "https://setembro.net"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "Setembro.net",
            "logo": {
                "@type": "ImageObject",
                "url": "https://setembro.net/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://setembro.net/blog/${category}/${slug}`
        }
    };

    const faqJsonLd = post.faq_items && post.faq_items.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faq_items.map((item: any) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    } : null;

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <Navbar />
            <main className="flex-1">
                <article className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
                    <header className="mb-8 text-center">
                        <div className="mb-4 flex justify-center gap-2">
                            <Badge variant="secondary">{post.category?.name}</Badge>
                        </div>
                        <h1 className="mb-4 font-heading text-4xl font-bold leading-tight md:text-5xl text-foreground">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                Setembro.net
                            </span>
                            <span>•</span>
                            <time dateTime={post.published_at || post.created_at}>
                                {post.published_at ? format(new Date(post.published_at), "d 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Data não disponível"}
                            </time>
                        </div>
                    </header>

                    <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl bg-muted">
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            {(post.featured_image || post.cover_image) ? (
                                <Image
                                    src={post.featured_image || post.cover_image || ""}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                "Capa do Post"
                            )}
                        </div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert mx-auto max-w-none text-foreground/90">
                        <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                    </div>

                    {post.faq_items && post.faq_items.length > 0 && (
                        <div className="max-w-3xl mx-auto mt-12 bg-card p-6 rounded-xl border">
                            <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
                            <div className="space-y-4">
                                {post.faq_items.map((item: any, i: number) => (
                                    <div key={i} className="border-b pb-4 last:border-0">
                                        <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                                        <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.answer }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <hr className="my-12 border-border" />

                </article>
            </main>
        </div>
    );
}
