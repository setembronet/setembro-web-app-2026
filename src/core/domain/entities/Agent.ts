export type AgentRole = 'sales' | 'consultant' | 'financial' | 'marketing' | 'support';

export class Agent {
  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly name: string,
    public readonly role: AgentRole,
    public readonly description: string,
    public readonly systemPrompt: string, // Kept for backward compatibility, mapped to activePrompt
    public readonly basePrompt: string,
    public readonly activePrompt: string,
    public readonly temperature: number = 0.7,
    public readonly modelConfig: Record<string, unknown> = {},
    public readonly avatarUrl?: string,
    public readonly isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) { }
}
