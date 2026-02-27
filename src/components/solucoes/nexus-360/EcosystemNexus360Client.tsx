"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Workflow, BrainCircuit, Activity, LineChart, Code2, Waypoints, Globe, Database, Network } from "lucide-react";
import { fingerprintLead } from "@/actions/fingerprint-lead";

export function EcosystemNexus360Client() {
    // Interceptor Ana connection Context
    const handleConciergeOpen = async (sectionContext: string) => {
        try {
            await fingerprintLead(window.location.href, `nexus-360: ${sectionContext}`);
        } catch (error) {
            console.error("Tracking failure:", error);
        }

        const event = new CustomEvent("open-concierge", {
            detail: {
                message: "Bem-vindo ao Nexus360. Eu sou a Ana, o primeiro agente de inteligência deste ecossistema. Como posso orquestrar seu crescimento hoje?",
                context: "nexus-360"
            }
        });
        window.dispatchEvent(event);
    };

    const agents = [
        {
            name: "Ana (Concierge & Lead Qual)",
            icon: <BrainCircuit className="h-5 w-5 text-blue-500" />,
            role: "Frontend Interceptor",
            dna: "Classificação em Tempo Real, Análise Semântica de Leads, Orquestração Handoff.",
            impact: "Redução de 90% no SLA de primeira resposta."
        },
        {
            name: "Julia (SEO Strategist)",
            icon: <Globe className="h-5 w-5 text-slate-500 dark:text-slate-400" />,
            role: "Search Authority",
            dna: "Densidade Semântica, Monitoramento SR, Indexação em Top-Tier Networks.",
            impact: "Aumento progressivo de tráfego orgânico invisível à concorrência."
        },
        {
            name: "Antigravity Code-Engine",
            icon: <Code2 className="h-5 w-5 text-slate-500 dark:text-slate-400" />,
            role: "Backend Generation",
            dna: "Engenharia Reversa, Compilação de APIs Livres, Deploy Rápido.",
            impact: "Redução de meses para semanas na entrega de soft-wares crúciais."
        },
        {
            name: "Nexus Analytics Watcher",
            icon: <Activity className="h-5 w-5 text-slate-500 dark:text-slate-400" />,
            role: "Data Orchestration",
            dna: "Webhooks Auditivos, Processamento Stream, Monitoramento Transacional.",
            impact: "Detecção de falhas e gaps de conversão na escala dos milissegundos."
        }
    ];

    return (
        <div className="w-full font-sans text-slate-800 dark:text-slate-200">
            {/* HERO SECTION - NEXUS FLOW AESTHETIC */}
            <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-background">
                {/* Visual "Nexus" Background Lines converging to center */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none opacity-20" />

                    {/* Converging lines simulated with SVG or pseudo-elements */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="0" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                        <line x1="100%" y1="0" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                        <line x1="0" y1="100%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                        <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                        <line x1="50%" y1="0" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                        <line x1="0" y1="50%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                        <line x1="100%" y1="50%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
                        <line x1="50%" y1="100%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />

                        {/* The Nexus Node */}
                        <circle cx="50%" cy="50%" r="120" stroke="currentColor" strokeWidth="1" fill="transparent" strokeDasharray="4 4" className="animate-spin-slow" />
                        <circle cx="50%" cy="50%" r="240" stroke="currentColor" strokeWidth="1" fill="transparent" strokeDasharray="2 8" />
                    </svg>

                    {/* Central Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full mix-blend-screen" />
                </div>

                <div className="container relative z-20 mx-auto px-4 md:px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out flex flex-col items-center">
                    <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-4 py-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 mb-8 uppercase tracking-widest shadow-sm">
                        <Network className="h-4 w-4 mr-2" />
                        Arquitetura Global B2B
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl mx-auto text-foreground">
                        Setembro <span className="text-blue-600 dark:text-blue-500">Nexus360</span>
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-slate-600 dark:text-slate-400 max-w-3xl">
                        O Ponto de Convergência da Inteligência do seu Negócio.
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        Não é apenas um site. É o ecossistema 360 que integra sua presença digital, sua força de trabalho de IA e sua orquestração de dados em um único núcleo formidável.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            size="lg"
                            className="h-14 px-8 text-base shadow-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all rounded-sm backdrop-blur-md"
                            onClick={() => handleConciergeOpen('hero_cta')}
                        >
                            Orquestrar o Meu Crescimento <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* WHAT IS NEXUS360? DECONSTRUCTING THE CORE */}
            <section className="py-24 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-mono text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-3">Conexão Absoluta</h3>
                                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-slate-800 dark:text-slate-100">Por que o chamamos de Nexus?</h2>
                            </div>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                "Nexus" significa conexão; o ponto central onde tudo se encontra. "360" significa que nenhuma ponta solta da sua rotina fica de fora.
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                Criamos a solução Setembro Nexus360 para corporações que estão exaustas de gerenciar dezenas de painéis espalhados. Ele funde o tráfego do site à ingestão de leads da ANA, orquestra suas integrações via Webhooks e monitora seu SEO orgânico de forma centralizada.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 rounded-2xl -rotate-3 transform scale-105 shadow-sm border border-slate-200/50 dark:border-slate-800/50" />
                            <div className="relative bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex justify-center items-center h-[400px]">
                                {/* Conceptual Diagram of Nexus */}
                                <div className="relative w-full h-full flex justify-center items-center">
                                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex justify-center items-center z-20 shadow-[0_0_40px_rgba(37,99,235,0.4)] animate-pulse">
                                        <Waypoints className="h-10 w-10" />
                                    </div>

                                    {/* Orbital rings */}
                                    <div className="absolute w-[200px] h-[200px] rounded-full border border-slate-200 dark:border-slate-700 animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute w-[300px] h-[300px] rounded-full border border-slate-200 dark:border-slate-700 animate-[spin_15s_linear_infinite_reverse]" />

                                    {/* Nodes */}
                                    <div className="absolute top-[20%] left-[20%] w-12 h-12 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex justify-center items-center shadow-lg z-10 transition-transform hover:scale-110 cursor-pointer">
                                        <Globe className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <div className="absolute bottom-[20%] right-[20%] w-12 h-12 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex justify-center items-center shadow-lg z-10 transition-transform hover:scale-110 cursor-pointer">
                                        <Database className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <div className="absolute bottom-[20%] left-[20%] w-12 h-12 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex justify-center items-center shadow-lg z-10 transition-transform hover:scale-110 cursor-pointer">
                                        <BrainCircuit className="h-5 w-5 text-slate-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AGENTS SHOWCASE TABLE - THE SYNAPSES */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/40 relative">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-6">
                            <Workflow className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">A Vitrine de Agentes (As Sinapses do Nexus)</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                            Nós não vendemos "chatbots". Nós recrutamos Inteligências Artificiais e as treinamos para assumir o front da sua estratégia. Elas são o DNA de execução da ferramenta.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-mono">Agente / Entidade</th>
                                        <th scope="col" className="px-6 py-4 font-mono">Status Board (Role)</th>
                                        <th scope="col" className="px-6 py-4 font-mono">DNA Operacional</th>
                                        <th scope="col" className="px-6 py-4 font-mono">Impacto Real</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agents.map((agent, i) => (
                                        <tr key={i} className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td className="px-6 py-5 font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                                                {agent.icon}
                                                {agent.name}
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                                                    {agent.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-xs">
                                                {agent.dna}
                                            </td>
                                            <td className="px-6 py-5 text-slate-600 dark:text-slate-400 font-light">
                                                {agent.impact}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* CLOSING CALL */}
            <section className="py-24 bg-slate-950 text-slate-50 border-t border-slate-800">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-6 font-mono">A centralização é o único caminho para a escala.</h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        A Setembro.net atua como a consultoria arquitetônica que ergue sua plataforma Nexus360. Transforme processos fragmentados em uma máquina operacional impecável construída do zero para a sua empresa.
                    </p>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-10 border-blue-600/50 hover:border-blue-500 bg-transparent hover:bg-blue-600 text-blue-400 hover:text-white transition-all uppercase tracking-wider text-sm font-mono"
                        onClick={() => handleConciergeOpen('bottom_cta')}
                    >
                        [&nbsp;Iniciar Infraestrutura Nexus360&nbsp;]
                    </Button>
                </div>
            </section>
        </div>
    );
}
