'use client';

import { useState } from 'react';
import { Search, Sparkles, ArrowRight } from "lucide-react";

export function HeroSearch() {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        // For MVP, trigger the FloatingConcierge (we can simulate this by dispatching an event, 
        // or directly handling the search here if we want to show results in a modal right away)
        // As a simple UX bridge, we'll dispatch a custom event that FAM can listen to, OR just scroll down.
        window.dispatchEvent(new CustomEvent('open-concierge', { detail: { query } }));
    };

    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden flex justify-center items-center flex-col animate-in fade-in duration-700">
            {/* High-Tech Background Elements */}
            <div className="absolute top-0 w-full h-full overflow-hidden -z-10 bg-slate-50 dark:bg-slate-950">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-cyan-400/20 blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 backdrop-blur-sm mb-8 animate-in slide-in-from-bottom-2 duration-500">
                    <Sparkles size={14} className="animate-pulse" />
                    <span>Busca Semântica IA Ativada</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl animate-in slide-in-from-bottom-4 duration-700">
                    Transforme sua Empresa com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Inteligência Artificial</span>
                </h1>

                <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl animate-in slide-in-from-bottom-6 duration-1000">
                    O que você precisa automatizar ou resolver hoje? <br className="hidden md:block" />
                    Nossa IA ajuda você a encontrar o caminho em nossa prateleira de serviços e insights.
                </p>

                {/* The Search-First Magnetic Form */}
                <div className="w-full max-w-2xl mt-10 relative animate-in slide-in-from-bottom-8 duration-1000">
                    <form
                        onSubmit={handleSearch}
                        className="relative group flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 p-2 pl-6"
                    >
                        <Search className="text-slate-400 group-hover:text-blue-500 transition-colors" size={24} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ex: Como reduzir custos usando análise de dados?"
                            className="flex-1 bg-transparent border-none outline-none py-3 px-4 text-slate-900 dark:text-white text-lg placeholder:text-slate-400"
                        />
                        <button
                            type="submit"
                            className="bg-black dark:bg-white text-white dark:text-black rounded-full px-6 py-3 font-medium flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                            Buscar <ArrowRight size={18} />
                        </button>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-cyan-300 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-full" />
                    </form>

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-medium mr-2">Sugestões:</span>
                        {['Criação de Agentes', 'BPO Financeiro', 'Déficit de Leads'].map(term => (
                            <button
                                key={term}
                                onClick={() => setQuery(term)}
                                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1 rounded-full transition-colors"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
