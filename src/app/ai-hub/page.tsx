'use client';

import * as React from 'react';
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { AgentSelector } from "@/components/molecules/AgentSelector";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Icons } from "@/components/atoms/Icons";

// Mock Agents
const agents = [
    { id: '1', name: 'Sofia', role: 'Sales Specialist', description: 'Especialista em qualificação de leads e estratégias de vendas.' },
    { id: '5', name: 'Zoe', role: 'Customer Support', description: 'Suporte ágil e resolução de problemas 24/7.' },
];

// Metadata moved to layout.tsx

export default function AIHubPage() {
    const [selectedAgent, setSelectedAgent] = React.useState<string>(agents[0].id);

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 md:py-12 h-[calc(100vh-64px)] flex flex-col">
                <div className="mb-8">
                    <Badge className="mb-2 bg-accent/10 text-accent hover:bg-accent/20 border-accent/20">Setembro AI Hub</Badge>
                    <h1 className="font-heading text-3xl font-bold text-foreground">Converse com nossos Especialistas</h1>
                    <p className="text-muted-foreground">Selecione um agente especializado para iniciar o atendimento.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-4 flex-1 min-h-0">
                    {/* Sidebar / Agent Selector */}
                    <div className="lg:col-span-1 border-r pr-4 overflow-y-auto hidden lg:block">
                        <h3 className="mb-4 font-semibold text-foreground">Agentes Disponíveis</h3>
                        <div className="space-y-3">
                            {agents.map((agent) => (
                                <div
                                    key={agent.id}
                                    onClick={() => setSelectedAgent(agent.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelectedAgent(agent.id);
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    aria-pressed={selectedAgent === agent.id}
                                    className={`p-3 rounded-lg cursor-pointer border transition-colors ${selectedAgent === agent.id ? 'bg-accent/10 border-accent' : 'bg-card border-border hover:bg-accent/5'}`}
                                >
                                    <div className="font-medium text-sm">{agent.name}</div>
                                    <div className="text-xs text-muted-foreground">{agent.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Selector (Visible only on small screens) */}
                    <div className="lg:hidden mb-4">
                        <AgentSelector agents={agents} selectedId={selectedAgent} onSelect={setSelectedAgent} />
                    </div>

                    {/* Chat Area */}
                    <div className="lg:col-span-3 flex flex-col rounded-xl border bg-card shadow-sm h-full">
                        {/* Chat Header */}
                        <div className="p-4 border-b flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                                {agents.find(a => a.id === selectedAgent)?.name[0]}
                            </div>
                            <div>
                                <div className="font-bold text-foreground">{agents.find(a => a.id === selectedAgent)?.name}</div>
                                <div className="text-xs text-muted-foreground">{agents.find(a => a.id === selectedAgent)?.role}</div>
                            </div>
                        </div>

                        {/* Chat Messages (Placeholder) */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-secondary/5">
                            <div className="flex gap-3">
                                <div className="h-8 w-8 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-xs font-bold text-accent">AI</div>
                                <div className="bg-card border p-3 rounded-lg text-sm shadow-sm max-w-[80%]">
                                    Olá! Sou {agents.find(a => a.id === selectedAgent)?.name}, seu {agents.find(a => a.id === selectedAgent)?.role}. Como posso ajudar hoje?
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t bg-background rounded-b-xl">
                            <div className="flex gap-2">
                                <Input placeholder="Digite sua mensagem..." className="flex-1" aria-label="Mensagem" />
                                <Button size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Icons.message className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
