import { createClient } from '@/utils/supabase/server';
import { IAgentRepository } from '@/core/repositories/IAgentRepository';
import { Agent, AgentRole } from '@/core/domain/entities/Agent';

interface AgentRow {
    id: string;
    slug: string;
    name: string;
    role: string;
    description: string | null;
    active_prompt: string | null;
    system_prompt: string;
    base_prompt: string | null;
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
            .select('system_prompt, active_prompt')
            .eq('id', agentId)
            .single();

        if (error || !data) return null;
        return data.active_prompt || data.system_prompt; // Fallback to system_prompt if active is null during migration
    }

    private mapToEntity(data: AgentRow): Agent {
        return new Agent(
            data.id,
            data.slug,
            data.name,
            data.role as AgentRole,
            data.description || '', // Handle potential null definition
            data.active_prompt || data.system_prompt, // System prompt is now active_prompt
            data.base_prompt || data.system_prompt,
            data.active_prompt || data.system_prompt,
            data.temperature,
            data.model_config,
            data.avatar_url,
            data.is_active,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}

