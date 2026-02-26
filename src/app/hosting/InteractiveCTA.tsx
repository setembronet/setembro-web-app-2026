'use client';

import { Sparkles, ArrowRight } from 'lucide-react';

export function InteractiveCTA() {
    const handleConciergeClick = () => {
        // Dispara evento para o componente global FloatingConcierge abrir
        if (typeof window !== 'undefined') {
            window.dispatchEvent(
                new CustomEvent('open-concierge', {
                    detail: { query: 'Dimensionar meu Plano' },
                })
            );
        }
    };

    return (
        <button
            onClick={handleConciergeClick}
            className="group relative overflow-hidden bg-black dark:bg-white text-white dark:text-black rounded-full px-8 py-4 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-lg flex items-center gap-3 mx-auto"
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles size={20} className="text-blue-400 dark:text-blue-600 animate-pulse" />
                Falar com a Ana: Dimensionar meu Plano
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
        </button>
    );
}
