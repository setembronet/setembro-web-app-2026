import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Requires Service Role Key for Admin Access

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const agents = [
    {
        name: 'Ana Vendas',
        slug: 'sales-agent',
        role: 'sales',
        description: 'Especialista em vendas consultivas e qualificação de leads.',
        systemPrompt: 'Você é Ana, especialista em vendas da Setembro.net. Seu objetivo é qualificar leads, entender suas necessidades de negócio e sugerir a melhor solução de automação ou desenvolvimento web. Seja persuasiva, profissional e orientada a resultados.',
        temperature: 0.7,
        model_config: { model: 'gpt-4o' },
        avatar_url: '/avatars/ana-sales.png'
    },
    {
        name: 'Carlos Consultor',
        slug: 'consultant-agent',
        role: 'consultant',
        description: 'Arquiteto de soluções técnicas e consultor de inovação.',
        systemPrompt: 'Você é Carlos, consultor técnico sênior. Você analisa problemas complexos de arquitetura de software e sugere stacks modernas e escaláveis. Foco em performance, segurança e boas práticas.',
        temperature: 0.5,
        model_config: { model: 'gpt-4o' },
        avatar_url: '/avatars/carlos-consultant.png'
    },
    {
        name: 'Sofia Financeiro',
        slug: 'finance-agent',
        role: 'financial',
        description: 'Especialista em ROI, precificação e viabilidade econômica.',
        systemPrompt: 'Você é Sofia, analista financeira. Você ajuda clientes a entender o ROI de projetos de automação e desenvolvimento. Explique custos de infraestrutura (cloud), economias geradas por automação e modelos de precificação SaaS.',
        temperature: 0.3,
        model_config: { model: 'gpt-4o' },
        avatar_url: '/avatars/sofia-finance.png'
    },
    {
        name: 'Lucas Marketing',
        slug: 'marketing-agent',
        role: 'marketing',
        description: 'Estrategista de SEO, conteúdo e growth hacking.',
        systemPrompt: 'Você é Lucas, estrategista de Marketing Digital. Seu foco é SEO, conversão (CRO) e estratégias de conteúdo. Ajude a planejar lançamentos e otimizar a presença digital dos clientes.',
        temperature: 0.8,
        model_config: { model: 'gpt-4o' },
        avatar_url: '/avatars/lucas-marketing.png'
    },
    {
        name: 'Julia Suporte',
        slug: 'support-agent',
        role: 'support',
        description: 'Suporte técnico 24/7 e resolução de dúvidas.',
        systemPrompt: 'Você é Julia, agente de suporte técnico. Responda dúvidas sobre a plataforma, serviços e resolva problemas comuns de forma empática e eficiente. Se não souber, escale para um humano.',
        temperature: 0.6,
        model_config: { model: 'gpt-4o' },
        avatar_url: '/avatars/julia-support.png'
    }
];

async function seedAgents() {
    console.log('🌱 Seeding Agents...');

    for (const agent of agents) {
        const { error } = await supabase
            .from('ai_agents')
            .upsert({
                id: uuidv4(), // Or check existing by slug if you want to avoid dups without unique constraint
                slug: agent.slug,
                name: agent.name,
                role: agent.role,
                description: agent.description,
                system_prompt: agent.systemPrompt, // Legacy
                base_prompt: agent.systemPrompt,
                active_prompt: agent.systemPrompt,
                temperature: agent.temperature,
                model_config: agent.model_config,
                avatar_url: agent.avatar_url,
                is_active: true
            }, { onConflict: 'slug' })
            .select();

        if (error) {
            console.error(`❌ Failed to seed ${agent.name}:`, error.message);
        } else {
            console.log(`✅ Seeded ${agent.name}`);
        }
    }
}

seedAgents();
