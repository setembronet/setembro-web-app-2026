"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, MessageSquare, LineChart, Network } from "lucide-react";
import { fingerprintLead } from "@/actions/fingerprint-lead";
import Link from "next/link";

export function EcosystemAiClient() {
    // Interceptor for ANA the Cognitive Agent
    const handleConciergeOpen = async (sectionContext: string) => {
        try {
            await fingerprintLead(window.location.href, `inteligencia-artificial: ${sectionContext}`);
        } catch (error) {
            console.error("Tracking failure:", error);
        }

        const event = new CustomEvent("open-concierge", {
            detail: {
                message: "Olá! Sou a Ana. Sou fruto da tecnologia que implementamos aqui. Como posso ajudar sua empresa a ganhar um cérebro digital hoje?",
                context: "inteligencia-artificial"
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <div className="w-full font-sans text-slate-800 dark:text-slate-200">
            {/* HERO SECTION - Titanium/Cobalt Minimalist */}
            <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b bg-background">
                {/* Abstract Data Flow Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"></div>
                {/* Cobalt Glow */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container relative mx-auto px-4 md:px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                    <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 mb-6 glassmorphism">
                        <Brain className="h-4 w-4 mr-2 animate-pulse" />
                        O Núcleo Cognitivo do seu Negócio
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto text-foreground">
                        Inteligência Artificial: Onde a Intuição Encontra a <span className="text-blue-600 dark:text-blue-500">Escala Infinita.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        Vá além da execução. Implemente camadas de raciocínio artificial que transformam dados em decisões e ideias em ativos digitais instantâneos.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            size="lg"
                            className="h-12 px-8 text-base shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => handleConciergeOpen('hero_cta')}
                        >
                            Implementar IA no meu Negócio <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* THE POWER TRINITY (Cards with Glassmorphism) */}
            <section className="py-24 bg-slate-50/50 dark:bg-slate-900/20 border-b">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Capacidade Cognitiva em Escala</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Não usamos &quot;respostas prontas&quot;. Criamos camadas de raciocínio personalizadas e treinadas exclusivamente para as regras do seu modelo de negócio.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Layer 1: Generative */}
                        <div className="bg-background/80 backdrop-blur-md p-8 rounded-2xl border shadow-sm transition-all hover:shadow-md hover:border-blue-500/30">
                            <div className="mb-6">
                                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">IA Generativa (Escala Criativa)</h3>
                                <p className="text-sm font-medium text-red-500/80 mb-2 uppercase tracking-wide">Gargalo de Produção</p>
                                <p className="text-muted-foreground mb-6 text-sm">Sua equipe chega no limite criativo e sofre para produzir conteúdo, copies, vídeos e designs em ritmo competitivo.</p>
                            </div>
                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <p className="font-semibold text-sm mb-2 text-foreground">Solução Setembro:</p>
                                <p className="text-sm text-foreground/80 leading-relaxed">Produção em massa de ativos digitais com a alma da sua marca, mantendo a qualidade premium em frações de segundo.</p>
                            </div>
                        </div>

                        {/* Layer 2: Conversational */}
                        <div className="bg-background/80 backdrop-blur-md p-8 rounded-2xl border shadow-sm transition-all hover:shadow-md hover:border-blue-500/30">
                            <div className="mb-6">
                                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">IA Conversacional (Experiência)</h3>
                                <p className="text-sm font-medium text-red-500/80 mb-2 uppercase tracking-wide">Atendimento Engessado</p>
                                <p className="text-muted-foreground mb-6 text-sm">Atendimento humano lento ou &quot;chatbots tradicionais&quot; burros guiados por árvores de decisão que frustram o cliente.</p>
                            </div>
                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <p className="font-semibold text-sm mb-2 text-foreground">Solução Setembro:</p>
                                <p className="text-sm text-foreground/80 leading-relaxed">Agentes residentes cognitivos que entendem contexto complexo, resolvem problemas e vendem com extrema naturalidade, 24/7.</p>
                            </div>
                        </div>

                        {/* Layer 3: Analytical */}
                        <div className="bg-background/80 backdrop-blur-md p-8 rounded-2xl border shadow-sm transition-all hover:shadow-md hover:border-blue-500/30">
                            <div className="mb-6">
                                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                                    <LineChart className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">IA Analítica e Preditiva</h3>
                                <p className="text-sm font-medium text-red-500/80 mb-2 uppercase tracking-wide">Decisões no Escuro</p>
                                <p className="text-muted-foreground mb-6 text-sm">Excesso de dados (Big Data) brutos e falta de clareza imediata sobre qual deve ser o próximo passo tático da diretoria.</p>
                            </div>
                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <p className="font-semibold text-sm mb-2 text-foreground">Solução Setembro:</p>
                                <p className="text-sm text-foreground/80 leading-relaxed">Algoritmos que identificam padrões invisíveis de consumo e antecipam tendências, permitindo que você reaja muito antes da concorrência.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BRIDGE BACK TO EXECUTION (Upsell to Automation) */}
            <section className="py-20 bg-background relative overflow-hidden">
                <div className="absolute left-0 bottom-0 w-1/2 h-full bg-slate-200/50 dark:bg-slate-800/20 blur-3xl -z-10 rounded-full -translate-x-1/2"></div>
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900/80 dark:to-background p-8 md:p-12 rounded-3xl border shadow-lg relative overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <div className="inline-flex items-center rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-800 dark:text-slate-300 mb-4">
                                    O Ciclo Completo
                                </div>
                                <h2 className="text-3xl font-bold mb-4 text-foreground">A IA pensa. A Automação executa.</h2>
                                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                    Uma inteligência sem braços não executa; uma execução sem cérebro não evolui. Nosso diferencial é integrar o raciocínio da IA à nossa <strong className="text-foreground font-semibold">Engenharia de Fluxos</strong>, criando sistemas corporativos que não apenas <em>fazem</em>, mas <em>sabem o porquê</em> estão fazendo.
                                </p>
                                <Link
                                    href="/automation"
                                    className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Network className="mr-2 h-4 w-4" /> Conheça nossa Engenharia de Fluxos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-24 border-t bg-card text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Escalabilidade Cognitiva</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Incorpore ativos inteligentes ao seu time hoje. Deixe que nosso Cérebro Digital tome conta das ineficiências para que você foque na sua visão.
                    </p>
                    <Button
                        size="lg"
                        className="h-14 px-10 text-lg shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleConciergeOpen('bottom_cta')}
                    >
                        Diagnóstico de Inteligência Artificial <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
