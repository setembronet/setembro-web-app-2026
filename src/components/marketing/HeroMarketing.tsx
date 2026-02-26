"use client";

import { ArrowRight, BarChart3, Search, Target } from "lucide-react";

export function HeroMarketing() {
    const handleOpenConcierge = () => {
        const event = new CustomEvent("open-concierge", {
            detail: {
                initialMessage: "Olá! Sou a Ana. Vi que você quer impulsionar seu marketing. Como posso ajudar?",
                leadSource: "Marketing Digital/SEO",
            },
        });
        window.dispatchEvent(event);
    };

    return (
        <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 bg-white dark:bg-black overflow-hidden border-b border-neutral-100 dark:border-neutral-900">
            {/* Subtle background grid (Neo-Corporate) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
                <div
                    className="space-y-8 max-w-4xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-both"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase border border-blue-100 dark:border-blue-800">
                        <Target size={16} />
                        <span>Crescimento Acelerado</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-neutral-900 dark:text-white leading-[1.05]">
                        Marketing de <span className="text-blue-600 dark:text-blue-500">Precisão.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl leading-relaxed">
                        Sua marca onipresente e estratégica em todos os pontos de contato, do Google às Redes Sociais.
                    </p>

                    <div className="pt-8 w-full sm:w-auto">
                        <button
                            onClick={handleOpenConcierge}
                            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 text-sm font-bold tracking-widest uppercase text-white bg-blue-600 dark:bg-blue-600 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] rounded-none shadow-[0_10px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.6)]"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Impulsionar Meu Negócio
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
