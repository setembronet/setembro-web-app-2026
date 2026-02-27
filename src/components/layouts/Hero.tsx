"use client";

import { fingerprintLead } from "@/actions/fingerprint-lead";

export function Hero() {
    const handleConciergeOpen = async () => {
        try {
            await fingerprintLead(window.location.href, "layouts-premium: btn_hero_cta");
        } catch (error) {
            console.error("Tracking failure:", error);
        }
        const event = new CustomEvent("open-concierge", {
            detail: {
                message: "Olá! Projetos de layouts premium oferecem o equilíbrio perfeito entre agilidade, design pré-aprovado e excelente custo-benefício. Sou a Ana, orquestradora da Setembro.net. Me conte: qual é o segmento da sua empresa?",
                context: "layouts-premium"
            }
        });
        window.dispatchEvent(event);
    };
    return (
        <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-24 pb-16">

            {/* Subtle radial gradient background for the "High-End Portfolio" feel */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />

            {/* Minimalist Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.2] dark:opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #8882 1px, transparent 1px), linear-gradient(to bottom, #8882 1px, transparent 1px)',
                    backgroundSize: '4rem 4rem'
                }}
            />

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-10">

                <div className="space-y-6 animate-fade-in-up">
                    <h2 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">
                        Engenharia Visual
                    </h2>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-neutral-900 dark:text-white">
                        Interfaces que Definem
                        <br />
                        <span className="text-blue-600 dark:text-blue-500 relative inline-block">
                            Autoridade
                        </span>
                    </h1>
                </div>

                <p className="max-w-[800px] text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light tracking-tight leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    Criamos a identidade do seu projeto unindo a sensibilidade do design humano à potência da Inteligência Artificial. Sistemas de design exclusivos sob medida.
                </p>

                <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center w-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <button
                        onClick={handleConciergeOpen}
                        className="group relative inline-flex items-center justify-center px-8 py-5 text-sm font-bold tracking-widest uppercase text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                    >
                        <span className="absolute inset-0 w-full h-full bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 flex items-center gap-3">
                            Solicitar Projeto Visual
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </button>
                </div>

            </div>
        </section>
    );
}
