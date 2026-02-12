export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export class ChatHistory {
  constructor(
    public readonly id: string,
    public readonly agentId: string,
    public readonly sessionId: string,
    public readonly messages: ChatMessage[],
    public readonly userId?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  addMessage(role: ChatMessage['role'], content: string): void {
    this.messages.push({
      role,
      content,
      timestamp: new Date()
    });
  }
}
