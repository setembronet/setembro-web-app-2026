import { Agent } from '../domain/entities/Agent';

export interface IAgentRepository {
    findAllActive(): Promise<Agent[]>;
    findBySlug(slug: string): Promise<Agent | null>;
    getSystemPrompt(agentId: string): Promise<string | null>;
}
