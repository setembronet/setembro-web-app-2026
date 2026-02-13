export type BlogCategory = {
    id: string;
    slug: string;
    label: {
        pt: string;
        en: string;
        es: string;
    };
    description: {
        pt: string;
        en: string;
        es: string;
    };
};

export const BLOG_CATEGORIES: BlogCategory[] = [
    {
        id: "ai",
        slug: "inteligencia-artificial",
        label: { pt: "Inteligência Artificial", en: "Artificial Intelligence", es: "Inteligencia Artificial" },
        description: { pt: "Notícias e tutoriais sobre IA.", en: "News and tutorials about AI.", es: "Noticias y tutoriales sobre IA." }
    },
    {
        id: "dev",
        slug: "desenvolvimento-web",
        label: { pt: "Desenvolvimento Web", en: "Web Development", es: "Desarrollo Web" },
        description: { pt: "Tech stack e programação.", en: "Tech stack and programming.", es: "Tech stack y programación." }
    },
    {
        id: "seo",
        slug: "seo",
        label: { pt: "SEO", en: "SEO", es: "SEO" },
        description: { pt: "Otimização para motores de busca.", en: "Search engine optimization.", es: "Optimización motores búsqueda." }
    },
    {
        id: "automation",
        slug: "automacao",
        label: { pt: "Automação", en: "Automation", es: "Automatización" },
        description: { pt: "Fluxos de trabalho eficientes.", en: "Efficient workflows.", es: "Flujos de trabajo eficientes." }
    },
    {
        id: "design",
        slug: "design",
        label: { pt: "Design & UX", en: "Design & UX", es: "Diseño y UX" },
        description: { pt: "Interfaces e experiências.", en: "Interfaces and experiences.", es: "Interfaces y experiencias." }
    },
    {
        id: "marketing",
        slug: "marketing",
        label: { pt: "Marketing Digital", en: "Digital Marketing", es: "Marketing Digital" },
        description: { pt: "Estratégias de crescimento.", en: "Growth strategies.", es: "Estrategias de crecimiento." }
    },
    {
        id: "systems",
        slug: "sistemas",
        label: { pt: "Sistemas & Cloud", en: "Systems & Cloud", es: "Sistemas y Cloud" },
        description: { pt: "Infraestrutura robusta.", en: "Robust infrastructure.", es: "Infraestructura robusta." }
    },
    {
        id: "business",
        slug: "negocios",
        label: { pt: "Negócios & Inovação", en: "Business & Innovation", es: "Negocios e Innovación" },
        description: { pt: "Tendências de mercado.", en: "Market trends.", es: "Tendencias de mercado." }
    }
];

export function getCategoryBySlug(slug: string) {
    return BLOG_CATEGORIES.find(c => c.slug === slug || c.id === slug);
}

export const MOCK_POSTS = [
    {
        id: "1",
        title: "IA Generativa nos Negócios",
        slug: "ia-generativa-nos-negocios",
        category_id: "ai",
        excerpt: "Como utilizar LLMs para otimizar processos.",
        date: "2024-02-12",
        image: "/images/blog/ai-business.jpg"
    },
    {
        id: "2",
        title: "Next.js 15: O Guia Completo",
        slug: "nextjs-15-guia-completo",
        category_id: "dev",
        excerpt: "Tudo o que você precisa saber sobre as novas features.",
        date: "2024-02-10",
        image: "/images/blog/nextjs.jpg"
    },
    {
        id: "3",
        title: "Automação de Marketing com n8n",
        slug: "automacao-marketing-n8n",
        category_id: "automation",
        excerpt: "Crie fluxos de nutrição de leads automáticos.",
        date: "2024-02-08",
        image: "/images/blog/automation.jpg"
    }
];

export function getPostsByCategory(categoryId: string) {
    return MOCK_POSTS.filter(p => p.category_id === categoryId);
}

export function getPost(slug: string) {
    return MOCK_POSTS.find(p => p.slug === slug);
}
