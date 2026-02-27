"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, PenTool, LayoutTemplate, Megaphone, MonitorPlay, Infinity, Layers, Cpu } from "lucide-react";
import { fingerprintLead } from "@/actions/fingerprint-lead";

export function EcosystemDesignClient() {
    // Interceptor Ana connection Context
    const handleConciergeOpen = async (sectionContext: string) => {
        try {
            await fingerprintLead(window.location.href, `design-branding: ${sectionContext}`);
        } catch (error) {
            console.error("Tracking failure:", error);
        }

        const event = new CustomEvent("open-concierge", {
            detail: {
                message: "Olá! Sou a Ana. Vi que você quer elevar o nível visual da sua marca. Vamos criar algo memorável hoje?",
                context: "design-branding"
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <div className="w-full font-sans text-slate-800 dark:text-slate-200">
            {/* HERO SECTION - Titanium Minimalism */}
            <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
                {/* Subtle Grid - Minimalist approach */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />

                <div className="container relative mx-auto px-4 md:px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                    <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-sm text-muted-foreground mb-8 shadow-sm">
                        <PenTool className="h-4 w-4 mr-2" />
                        Engenharia Estética
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto text-foreground">
                        Design que Define <span className="text-slate-500 dark:text-slate-400">Autoridade.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        Construímos a face da sua empresa com a precisão do design humano e a potência infinita da Inteligência Artificial.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            size="lg"
                            className="h-14 px-8 text-base shadow-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 transition-all rounded-sm"
                            onClick={() => handleConciergeOpen('hero_cta')}
                        >
                            Solicitar Projeto de Design <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* HYBRID DESIGN STATEMENT */}
            <section className="py-24 bg-card border-y">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center space-x-2 text-foreground/80 mb-2">
                                <Infinity className="h-5 w-5" />
                                <span className="font-semibold tracking-wider uppercase text-sm">Tecnologia Criativa Híbrida</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">O Fim dos Templates Prontos</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Nós recusamos atalhos visuais e clichês de mercado. Nosso ecossistema une as plataformas mais sofisticadas da indústria (Adobe Suite) aos modelos mais puros de <strong className="text-foreground">Inteligência Artificial Generativa</strong>.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Geramos texturas de alta resolução matemáticas, conceitos fotorealistas e ilustrações inéditas exclusivas para a sua marca. O resultado? Uma identidade visual impenetrável que sua concorrência não consegue replicar.
                            </p>
                        </div>
                        <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                            {/* Abstract Graphic Element emphasizing Hybrid Design */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-slate-200/50 dark:bg-slate-800/50 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
                            <div className="relative h-64 flex items-center justify-center">
                                <div className="space-y-4 text-center">
                                    <div className="inline-flex gap-4 items-center justify-center px-6 py-4 bg-background border rounded-xl shadow-lg">
                                        <Layers className="h-8 w-8 text-slate-400" />
                                        <span className="text-2xl font-light text-slate-300">+</span>
                                        <Cpu className="h-8 w-8 text-slate-800 dark:text-slate-200" />
                                    </div>
                                    <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground">Originalidade em Escala</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OMNICHANNEL DESIGN GRID */}
            <section className="py-24 bg-background relative">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Presença Total: Do Pixel ao Papel</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            A Autoridade Visual transcende a tela. Desenhamos componentes que entregam a mesma consistência tática seja em uma interface, seja num painel urbano.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* 1. Branding */}
                        <div className="group bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-none transition-all hover:bg-slate-100 dark:hover:bg-slate-900">
                            <PenTool className="h-8 w-8 mb-6 text-foreground" />
                            <h3 className="text-xl font-bold mb-3">Branding & Logo</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Marcas exclusivas, manuais de identidade volumosos e tipografia rigorosamente selecionada.
                            </p>
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-foreground uppercase tracking-widest">Diferencial</span>
                                <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Design atemporal construído matematicamente para funcionar do favicon ao outdoor.</p>
                            </div>
                        </div>

                        {/* 2. Offline */}
                        <div className="group bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-none transition-all hover:bg-slate-100 dark:hover:bg-slate-900">
                            <LayoutTemplate className="h-8 w-8 mb-6 text-foreground" />
                            <h3 className="text-xl font-bold mb-3">Papelaria & Offline</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Cartões de visita com verniz localizado, papéis timbrados, envelopes texturizados e folders.
                            </p>
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-foreground uppercase tracking-widest">Diferencial</span>
                                <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Tangibilizamos o valor da marca no mundo físico, validando sua autoridade no toque.</p>
                            </div>
                        </div>

                        {/* 3. Outdoor */}
                        <div className="group bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-none transition-all hover:bg-slate-100 dark:hover:bg-slate-900">
                            <Megaphone className="h-8 w-8 mb-6 text-foreground" />
                            <h3 className="text-xl font-bold mb-3">Mídia de Impacto</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Fechamento de arquivo para Banners em Lona, mega outdoors de rodovia e sinalização interna de lojas.
                            </p>
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-foreground uppercase tracking-widest">Diferencial</span>
                                <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Projetos com leitura em frações de segundo para captura de atenção em ecossistemas de alta distração.</p>
                            </div>
                        </div>

                        {/* 4. Digital Assets */}
                        <div className="group bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-none transition-all hover:bg-slate-100 dark:hover:bg-slate-900">
                            <MonitorPlay className="h-8 w-8 mb-6 text-foreground" />
                            <h3 className="text-xl font-bold mb-3">Ativos Digitais</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Mockups de alta fidelidade para redes sociais, criativos para performance (ads) e UI para sistemas.
                            </p>
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-foreground uppercase tracking-widest">Diferencial</span>
                                <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">Trazemos a IA massivamente para gerar variações fotorealistas e cenários infinitos para os seus produtos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CLOSING ECOSYSTEM NOTE */}
            <section className="py-20 bg-slate-100 dark:bg-slate-900">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 className="text-2xl font-bold tracking-tight mb-4">Identidades Visuais feitas para o Ecossistema de Inteligência.</h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Se a Automação executa e a IA pensa, é o <strong>Design que estabelece o status</strong>. Fechamos a arquitetura do seu negócio embalando tecnologias complexas em matrizes de confiança globais.
                    </p>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-12 px-8 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                        onClick={() => handleConciergeOpen('bottom_cta')}
                    >
                        Validar Minha Presença de Marca
                    </Button>
                </div>
            </section>

        </div>
    );
}
