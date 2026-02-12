import { Metadata } from 'next';
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Badge } from "@/components/atoms/Badge";
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock Data Fetcher (Replace with Supabase Service later)
async function getPost(slug: string) {
    // Simulating fetch
    if (slug === 'not-found') return null;

    return {
        slug,
        title: "O Futuro da IA em 2026: Tendências e Oportunidades",
        content: `
      <p>A inteligência artificial continua a evoluir em um ritmo acelerado. Em 2026, observamos uma integração ainda mais profunda de agentes autônomos nos processos de negócios.</p>
      <h2>O Papel dos Agentes de IA</h2>
      <p>Agentes especializados não são mais uma novidade, mas uma necessidade para empresas que buscam eficiência operacional.</p>
      <h2>Conclusão</h2>
      <p>Investir em IA agora é garantir a competitividade no futuro próximo.</p>
    `,
        excerpt: "Descubra como a inteligência artificial generativa está redefinindo o mercado de trabalho.",
        publishedAt: new Date("2026-02-10"),
        author: {
            name: "Sergio",
            role: "Lead Developer",
            bio: "Especialista em desenvolvimento web e inteligência artificial com mais de 10 anos de experiência.",
            avatarUrl: "https://github.com/shadcn.png"
        },
        category: "Inteligência Artificial",
        coverImage: "/blog/ai-future.jpg"
    };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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
            publishedTime: post.publishedAt.toISOString(),
            authors: [post.author.name],
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

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
                            <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        <h1 className="mb-4 font-heading text-4xl font-bold leading-tight md:text-5xl text-foreground">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                {post.author.avatarUrl && (
                                    <Image
                                        src={post.author.avatarUrl}
                                        alt={post.author.name}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                )}
                                {post.author.name}
                            </span>
                            <span>•</span>
                            <time dateTime={post.publishedAt.toISOString()}>
                                {format(post.publishedAt, "d 'de' MMMM, yyyy", { locale: ptBR })}
                            </time>
                        </div>
                    </header>

                    <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl bg-muted">
                        {/* <Image src={post.coverImage} alt={post.title} fill className="object-cover" /> */}
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">Capa do Post</div>
                    </div>

                    <div
                        className="prose prose-lg dark:prose-invert mx-auto max-w-none text-foreground/90"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <hr className="my-12 border-border" />

                    <div className="flex items-center gap-4 rounded-xl border bg-card p-6">
                        {post.author.avatarUrl && (
                            <div className="relative h-16 w-16 overflow-hidden rounded-full shrink-0">
                                <Image src={post.author.avatarUrl} alt={post.author.name} fill className="object-cover" />
                            </div>
                        )}
                        <div>
                            <h3 className="font-heading font-bold text-lg text-foreground">{post.author.name}</h3>
                            <p className="text-sm text-muted-foreground">{post.author.role}</p>
                            <p className="mt-2 text-foreground/80">{post.author.bio}</p>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
