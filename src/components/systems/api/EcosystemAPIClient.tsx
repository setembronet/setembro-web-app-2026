"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Cable, Activity, Workflow, Code2, Lock, Route, Webhook, Database } from "lucide-react";
import { fingerprintLead } from "@/actions/fingerprint-lead";

export function EcosystemAPIClient() {
    // Interceptor Ana connection Context
    const handleConciergeOpen = async (sectionContext: string) => {
        try {
            await fingerprintLead(window.location.href, `integracao-api: ${sectionContext}`);
        } catch (error) {
            console.error("Tracking failure:", error);
        }

        const event = new CustomEvent("open-concierge", {
            detail: {
                message: "Olá! Sou a Ana. Vi que você quer criar pontes inteligentes entre seus sistemas. Qual integração é prioritária para sua empresa hoje?",
                context: "integracao-api"
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <div className="w-full font-sans text-slate-800 dark:text-slate-200">
            {/* HERO SECTION - Data Flow Concept */}
            <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-background">
                {/* Circuit Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-lg h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative mx-auto px-4 md:px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out flex flex-col items-center">
                    <div className="inline-flex items-center rounded-sm border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 text-xs font-mono text-blue-600 dark:text-blue-400 mb-8 uppercase tracking-widest shadow-sm">
                        <Cable className="h-4 w-4 mr-2" />
                        Engenharia de Conectividade
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto text-foreground">
                        Onde seus Sistemas Finalmente se <span className="text-blue-600 dark:text-blue-500">Conversam.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Eliminamos intervenções manuais construindo Pontes de Eficiência. Transforme ilhas isoladas de software em um ecossistema de inteligência escalável e seguro.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            size="lg"
                            className="h-14 px-8 text-base shadow-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all rounded-sm"
                            onClick={() => handleConciergeOpen('hero_cta')}
                        >
                            Conectar Meus Sistemas <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* DATA ORCHESTRATION & MIDDLEWARE */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-border">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-2">
                                <Workflow className="h-5 w-5" />
                                <span className="font-semibold tracking-wider uppercase text-sm font-mono">Arquitetura Integrada</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">O Fim dos Silos de Dados</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Softwares desconectados geram perda de dados, duplicação massiva de trabalho e falhas operacionais críticas. A <strong className="text-foreground">Integração de APIs</strong> estabelece protocolos diretos de comunicação entre suas ferramentas.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Trabalhamos desde conexões diretas Point-to-Point até o desenvolvimento de <strong className="text-foreground">Middlewares Customizados</strong> para orquestração avançada, padronizando formatos de dados (JSON/XML) e centralizando a inteligência.
                            </p>
                        </div>

                        <div className="flex-1 w-full bg-white dark:bg-slate-950 p-8 rounded-sm shadow-xl border border-slate-100 dark:border-slate-800 relative group overflow-hidden">
                            {/* Visual representation of nodes connecting */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f60a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f60a_1px,transparent_1px)] bg-[size:24px_24px]" />

                            <div className="relative h-64 flex flex-col justify-center items-center gap-6">
                                <div className="flex justify-between items-center w-full max-w-[280px]">
                                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center z-10 animate-pulse">
                                        <Code2 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <div className="h-1 flex-1 bg-gradient-to-r from-slate-200 via-blue-500 to-slate-200 dark:from-slate-700 dark:via-blue-500 dark:to-slate-700"></div>
                                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center z-10 animate-pulse delay-300">
                                        <Database className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                                    </div>
                                </div>
                                <div className="w-full max-w-[280px] bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-center border border-blue-100 dark:border-blue-800/50 backdrop-blur-sm relative z-10">
                                    <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Antigravity Middleware</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROTOCOLS & SECURITY CAPABILITIES */}
            <section className="py-24 bg-background relative">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Padrões de Mercado & Segurança</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Empregar as melhores tecnologias não é luxo, é sobrevivência de dados. Reduzimos o atrito conectando os ecossistemas com proteção rigorosa.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* 1. RESTful */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                            <Route className="h-8 w-8 mb-6 text-blue-600 dark:text-blue-500" />
                            <h3 className="text-xl font-bold mb-3 font-mono tracking-tight">Arquitetura RESTful</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Desenho de APIs rápidas, estruturadas sob requisições padronizadas do método HTTP. Integramos sistemas legados com interfaces modernas e alta disponibilidade.
                            </p>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">Protocolos de Escala</p>
                        </div>

                        {/* 2. Webhooks */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                            <Webhook className="h-8 w-8 mb-6 text-blue-600 dark:text-blue-500" />
                            <h3 className="text-xl font-bold mb-3 font-mono tracking-tight">Webhooks (Real-Time)</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Atualizações assíncronas no exato milissegundo em que os eventos acontecem. Sem *polling* exaustivo; os dados são reativos e orquestrados na hora.
                            </p>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">Ação Sob Demanda</p>
                        </div>

                        {/* 3. Security */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                            <Lock className="h-8 w-8 mb-6 text-blue-600 dark:text-blue-500" />
                            <h3 className="text-xl font-bold mb-3 font-mono tracking-tight">Segurança Extrema</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Criptografia de ponta a ponta. Túneis trafegados e encapsulados sobre HTTPS. Autenticação reforçada utilizando JWT e OAuth2 para garantir que nenhuma payload vaze.
                            </p>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">Confiança Inegociável</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5-STEP METHODOLOGY */}
            <section className="py-20 bg-slate-900 text-slate-50 border-t border-slate-800">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col items-center text-center mb-16">
                        <Activity className="h-10 w-10 text-blue-400 mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">A Metodologia Otimizada</h2>
                        <p className="text-slate-400 text-lg max-w-2xl font-light">
                            Desenvolvimento veloz não significa pular etapas. Nossa esteira de entrega para APIs é rígida e validada através de testes massivos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-slate-800 z-0"></div>

                        {[
                            { step: "01", title: "Identificação", desc: "Mapeamento rigoroso de necessidades e volumetria" },
                            { step: "02", title: "Curadoria", desc: "Seleção detalhada de Endpoints e contratos de dados" },
                            { step: "03", title: "Conexão", desc: "Desenvolvimento dos adaptadores lógicos" },
                            { step: "04", title: "Estresse", desc: "Bateria QA de estresse com cargas pesadas" },
                            { step: "05", title: "Monitoramento", desc: "Observabilidade persistente de logs 24/7" },
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-14 h-14 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center mb-4 text-blue-400 font-mono font-bold group-hover:border-blue-500 group-hover:bg-blue-900/20 transition-all">
                                    {item.step}
                                </div>
                                <h4 className="font-bold text-slate-200 mb-2">{item.title}</h4>
                                <p className="text-xs text-slate-400 px-2">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLOSING CALL */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight mb-4">Automação de Dados é o Novo Padrão Global.</h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        Produtividade aumentada, escalabilidade em todos os canais de receita e uma drástica minoria de erros operacionais manuais. Quando sua empresa não digita dados, ela toma decisões.
                    </p>
                    <Button
                        size="lg"
                        className="h-14 px-10 border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 transition-colors uppercase tracking-wider text-sm shadow-xl"
                        onClick={() => handleConciergeOpen('bottom_cta')}
                    >
                        Solicitar Assessment de APIs
                    </Button>
                </div>
            </section>
        </div>
    );
}
