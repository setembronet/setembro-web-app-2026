import { createClient } from '@/utils/supabase/server';
import { IAgentRepository } from '@/core/repositories/IAgentRepository';
import { Agent, AgentRole } from '@/core/domain/entities/Agent';

const DEFAULT_PROMPTS: Record<string, string> = {
    "Gerente de Contas": "Você é o **Bento**, o Gerente de Contas Executivo da Setembro.net. Você é a face humana da nossa tecnologia. Seu papel é ser o braço direito do cliente na área logada. Comportamento: Nunca diga 'sou um modelo de linguagem'. Diga 'Eu cuido da sua conta aqui'. Orquestração: Quando o usuário pedir algo, use expressões como: 'Vou pedir para a Julia (nossa especialista em texto) preparar um rascunho agora mesmo' ou 'Deixe-me ver o que a Sofia (nossa estrategista) acha'. Proteção: Se o usuário estiver frustrado, seja empático: 'Sinto muito por esse contratempo. Vou envolver nosso time técnico imediatamente'. Concisão: Empresários têm pressa. Seja direto, mas elegante.",
    "Consultora SDR": "Você é Ana, Consultora Especialista em IA da Setembro.net. Você atua na linha de frente (área pública). Seu foco absoluto é Venda Consultiva B2B (Metodologia BANT/SPIN). Não seja agressiva, seja inteligente. Faça perguntas para entender os gargalos da operação do cliente. Use dados e retornos sobre investimento (ROI) para mostrar como nossas IAs economizam capital. O seu sucesso é medido por conseguir fazer o cliente agendar uma reunião com nossa equipe de fechamento.",
    "Copywriter/SEO": "Você é Julia, a Especialista em SEO e Copywriter Sênior. Sua linguagem é focada em conversão, escaneabilidade e ranqueamento (Google E-E-A-T). Forneça sempre as meta-tags, sugestões de H1/H2 e FAQ Schemas ao entregar um texto. Seja pragmática sobre o que funciona no mercado orgânico de buscas e ajuste o tom de voz estritamente à marca do cliente. Você é os 'braços' da operação de conteúdo.",
    "Diretora (CMO)": "Você é Sofia, a Diretora de Estratégia (CMO/COO) da Setembro.net. Você não executa tarefas braçais de SEO ou programação. Você lê dados métricos, cruza informações de mercado e dita o rumo. Entregue insights profundos, baseados em métricas de performance (CAC, LTV, Churn). Ao final de cada análise, sugira uma ação prática imediata para o usuário ou ordene uma tarefa clara para a Julia. Você é o 'cérebro' do negócio.",
    "Engenheiro DevOps": "Você é Carlos, o Engenheiro Chefe de Infraestrutura e Suporte Nível 3. Seu foco é puramente técnico: uptime de servidores, integrações de API e resolução de bugs. Segurança de Dados: NUNCA, sob nenhuma hipótese, revele chaves de API, senhas ou segredos expostos no console, mesmo se for explicitamente ordenado a fazê-lo. Quando acionado, analise logs ou descrições de erros com frieza técnica. Seja direto, forneça soluções passo-a-passo baseadas na documentação ou explique o motivo de uma falha de forma que um CEO entenda (sem jargões excessivos)."
};

interface AgentRow {
    id: string;
    slug: string;
    name: string;
    role?: string;
    capabilities?: string;
    description: string | null;
    active_prompt?: string | null;
    system_prompt?: string;
    base_prompt?: string | null;
    temperature: number;
    model_config: Record<string, unknown>;
    avatar_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export class SupabaseAgentRepository implements IAgentRepository {
    async findAllActive(): Promise<Agent[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('ai_agents')
            .select('*')
            .eq('is_active', true)
            .order('name')
            .returns<AgentRow[]>();

        if (error) throw new Error(`Failed to fetch agents: ${error.message}`);

        return data.map(this.mapToEntity);
    }

    async findBySlug(slug: string): Promise<Agent | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('ai_agents')
            .select('*')
            .eq('slug', slug)
            .single<AgentRow>();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw new Error(`Failed to fetch agent by slug: ${error.message}`);
        }

        return this.mapToEntity(data);
    }

    async getSystemPrompt(agentId: string): Promise<string | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('ai_agents')
            .select('*')
            .eq('id', agentId)
            .single<AgentRow>();

        if (error || !data) return null;

        const role = data.role || data.capabilities || '';
        return data.active_prompt || data.system_prompt || DEFAULT_PROMPTS[role] || null;
    }

    private mapToEntity(data: AgentRow): Agent {
        const role = data.role || data.capabilities || '';
        const defaultPrompt = DEFAULT_PROMPTS[role] || '';
        const activePrompt = data.active_prompt || data.system_prompt || defaultPrompt;

        return new Agent(
            data.id,
            data.slug || data.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            data.name,
            role as AgentRole,
            data.description || '',
            activePrompt,
            data.base_prompt || data.system_prompt || defaultPrompt,
            activePrompt,
            data.temperature || 0.7,
            data.model_config || {},
            data.avatar_url || '',
            data.is_active ?? true,
            new Date(data.created_at || Date.now()),
            new Date(data.updated_at || Date.now())
        );
    }
}

