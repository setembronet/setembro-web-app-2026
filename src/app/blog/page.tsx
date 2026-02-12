import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { BlogCard } from "@/components/molecules/BlogCard";
import { SearchField } from "@/components/molecules/SearchField";

// Mock Data
const posts = [
    {
        slug: "futuro-da-ia-2026",
        title: "O Futuro da IA em 2026: Tendências e Oportunidades",
        excerpt: "Descubra como a inteligência artificial generativa está redefinindo o mercado de trabalho e criando novas oportunidades de negócio para empresas inovadoras.",
        publishedAt: new Date("2026-02-10"),
        author: { name: "Sergio", avatarUrl: "https://github.com/shadcn.png" }, // Placeholder avatar
        category: "Inteligência Artificial",
        coverImage: "/blog/ai-future.jpg" // Placeholder
    },
    {
        title: "Otimização de Performance Web com Next.js 15",
        slug: "performance-nextjs-15",
        excerpt: "Um guia prático para extrair o máximo de performance do seu site utilizando as novas features do Next.js 15 e React Server Components.",
        publishedAt: new Date("2026-02-05"),
        author: { name: "Equipe Setembro", avatarUrl: "" },
        category: "Desenvolvimento",
    },
    {
        title: "SEO Técnico: O Que Mudou no Algoritmo?",
        slug: "seo-tecnico-2026",
        excerpt: "Core Web Vitals, E-E-A-T e a importância da experiência do usuário nas novas atualizações dos motores de busca.",
        publishedAt: new Date("2026-01-20"),
        author: { name: "Sergio", avatarUrl: "https://github.com/shadcn.png" },
        category: "SEO",
    }
];

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog | Setembro.net",
    description: "Artigos e insights sobre inteligência artificial, desenvolvimento de software e tecnologia.",
    openGraph: {
        title: "Blog | Setembro.net",
        description: "Artigos e insights sobre inteligência artificial, desenvolvimento de software e tecnologia.",
        url: "https://setembro.net/blog",
    }
};

export default function BlogListing(): React.ReactNode {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
                <div className="mb-12 flex flex-col items-center text-center space-y-4">
                    <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
                        Nosso Blog
                    </h1>
                    <p className="max-w-xl text-lg text-muted-foreground">
                        Artigos sobre tecnologia, desenvolvimento de software e o impacto da IA nos negócios.
                    </p>
                    <div className="w-full max-w-md pt-4">
                        <SearchField />
                    </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} {...post} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
