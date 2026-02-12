import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedContent() {
    console.log('🌱 Seeding Content...');

    // 1. Seed Author
    console.log('Creating Author...');
    const authorId = uuidv4();
    const { data: author, error: authorError } = await supabase
        .from('authors')
        .insert({
            id: authorId,
            name: 'Sergio',
            bio: 'Lead Full Stack Developer e fundador da Setembro.net. Especialista em automação e desenvolvimento de sistemas escaláveis.',
            avatar_url: '/avatars/sergio.jpg',
            social_links: { twitter: '@sergio', linkedin: 'linkedin.com/in/sergio', github: 'github.com/sergio' }
        })
        .select()
        .single();

    if (authorError) {
        console.error('❌ Failed to create author:', authorError.message);
        return;
    }
    console.log('✅ Author Created:', author.name);

    // 2. Seed Categories
    console.log('Creating Categories...');
    const categories = [
        { name: 'Automação', slug: 'automacao' },
        { name: 'Desenvolvimento', slug: 'desenvolvimento' },
        { name: 'SEO', slug: 'seo' }
    ];

    const categoryMap: Record<string, string> = {};

    for (const cat of categories) {
        const { data } = await supabase.from('categories').upsert(cat, { onConflict: 'slug' }).select().single();
        if (data) categoryMap[cat.slug] = data.id;
    }

    // 3. Seed Posts
    console.log('Creating Blog Posts...');
    const posts = [
        {
            title: 'Automação com IA: O Futuro dos Negócios',
            slug: 'automacao-com-ia-futuro',
            excerpt: 'Descubra como agentes de IA podem reduzir custos operacionais em até 40%.',
            content: '# Automação com IA\n\nA inteligência artificial deixou de ser hype...',
            category_id: categoryMap['automacao'],
            author_id: authorId,
            published_at: new Date().toISOString()
        },
        {
            title: 'Desenvolvimento Web Moderno em 2026',
            slug: 'dev-web-moderno-2026',
            excerpt: 'Next.js 15, React 19 e o novo paradigma de Server Actions.',
            content: '# Web Moderno\n\nO ecossistema JavaScript evoluiu para...',
            category_id: categoryMap['desenvolvimento'],
            author_id: authorId,
            published_at: new Date().toISOString()
        },
        {
            title: 'SEO em 2026: Sobrevivendo aos Motores de Busca AI',
            slug: 'seo-2026-ai-search',
            excerpt: 'Como otimizar seu site para o Google SGE e SearchGPT.',
            content: '# SEO na Era da IA\n\nPalavras-chave não são mais suficientes...',
            category_id: categoryMap['seo'],
            author_id: authorId,
            published_at: new Date().toISOString()
        }
    ];

    for (const post of posts) {
        await supabase.from('blog_posts').upsert(post, { onConflict: 'slug' });
        console.log(`✅ Post Created: ${post.title}`);
    }
}

seedContent();
