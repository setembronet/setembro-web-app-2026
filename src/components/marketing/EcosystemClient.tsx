"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Share2, Globe, Database } from "lucide-react";
import { fingerprintLead } from "@/actions/fingerprint-lead";

export function EcosystemClient() {
    // Handler interceptor specifically designed for ANA
    const handleConciergeOpen = async (sectionContext: string) => {
        // Trigger lead tracking/fingerprinting
        try {
            await fingerprintLead(window.location.href, `marketing-ecossistema: ${sectionContext}`);
        } catch (error) {
            console.error("Tracking failure:", error);
        }

        // Intercept intent and wake up ANA
        const event = new CustomEvent("open-concierge", {
            detail: {
                message: "Olá! Sou a Ana. Vi que você quer implementar um Ecossistema de Inteligência no seu negócio. Por onde começamos?",
                context: "marketing-ecossistema"
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b bg-card">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200 via-background to-background dark:from-slate-900 opacity-60"></div>
                <div className="container relative mx-auto px-4 md:px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        Ecossistema de Inteligência
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto text-foreground">
                        Marketing de Precisão: O Ecossistema de Inteligência que <span className="text-primary">Escala seu Negócio.</span>
                    </h1>

                    {/* MANIFESTO DE ATIVOS */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        <strong className="text-foreground tracking-wide uppercase text-sm border-b border-primary/20 pb-1 mb-4 block inline-block">Manifesto de Ativos</strong><br />
                        Não operamos canais isolados. Construímos ativos digitais que monitoram tendências em tempo real e garantem retorno mensurável.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="h-12 px-8 text-base shadow-lg" onClick={() => handleConciergeOpen('hero_cta')}>
                            Diagnóstico do Ecossistema <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* 4 PILLARS SECTION */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl animate-in fade-in duration-1000 delay-150">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Arquitetura do Crescimento</h2>
                        <p className="text-muted-foreground text-lg">Os 4 pilares tecnológicos da nossa engenharia de aquisição.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Pilar 1 */}
                        <div className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all hover:border-primary/30 group">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <Target className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Performance Preditiva (Ads)</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Google, Meta e LinkedIn Ads focados em redução de CPL e maximização de ROI via IA. Antecipamos a intenção de busca do seu cliente.
                            </p>
                            <Button variant="outline" className="w-full" onClick={() => handleConciergeOpen('pilar_1_ads')}>
                                Escalar Campanhas
                            </Button>
                        </div>

                        {/* Pilar 2 */}
                        <div className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all hover:border-primary/30 group">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <Share2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Autoridade e Onipresença</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Gestão de Redes Sociais e Google Business com narrativa premium e consistente. Transforme seu feed em uma ferramenta de vendas corporativa.
                            </p>
                            <Button variant="outline" className="w-full" onClick={() => handleConciergeOpen('pilar_2_social')}>
                                Construir Autoridade
                            </Button>
                        </div>

                        {/* Pilar 3 */}
                        <div className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all hover:border-primary/30 group">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <Globe className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">SEO de Infraestrutura</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Unimos a performance do nosso hosting ao SEO Técnico e Semântico. Orientamos o algoritmo para que o seu site seja a resposta definitiva do Google.
                            </p>
                            <Button variant="outline" className="w-full" onClick={() => handleConciergeOpen('pilar_3_seo')}>
                                Dominar as Buscas
                            </Button>
                        </div>

                        {/* Pilar 4 - Engenharia de Dados (Específico para hook do Backend) */}
                        <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 shadow-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                    Diferencial Analítico
                                </span>
                            </div>
                            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Database className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Engenharia de Dados & Retenção</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Analytics avançado e automação de nutrição. Transformamos visitantes anônimos em leads qualificados, e leads em clientes recorrentes de alto LTV.
                            </p>
                            <Button className="w-full shadow-md" onClick={() => handleConciergeOpen('pilar_4_engenharia_dados')}>
                                Implementar Analytics
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-20 border-t bg-card text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Pare de Pagar por Cliques, Invista em Ativos</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Deixe a inteligência artificial trabalhar pelo seu faturamento. Nosso ecossistema é desenhado para crescer com a sua operação.
                    </p>
                    <Button size="lg" className="h-14 px-10 text-lg shadow-xl" onClick={() => handleConciergeOpen('bottom_cta')}>
                        Iniciar Projeto <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
