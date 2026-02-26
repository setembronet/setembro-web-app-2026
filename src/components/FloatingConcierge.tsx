'use client';

import { useState, useEffect, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Sparkles, X, ChevronUp, ArrowRight, Loader2, MessageCircle } from 'lucide-react';
import { searchPosts, SearchResult } from '@/actions/search-posts';
import { fingerprintLead } from '@/actions/fingerprint-lead';

export function FloatingConcierge() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [query, setQuery] = useState('');
    const [initialMessage, setInitialMessage] = useState('Olá! Sou a Ana. Posso entender **conceitos**, **problemas** e o **contexto** do que você precisa. Experimente me contar uma dor do seu negócio em vez de usar palavras-chave isoladas.');
    const [results, setResults] = useState<SearchResult[] | null>(null);
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    // Detect scroll for back to top
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Listen to custom event from HeroSearch or CTAs
    useEffect(() => {
        const handleOpenConcierge = (e: any) => {
            setIsOpen(true);
            if (e.detail?.query) {
                setQuery(e.detail.query);
                performSearch(e.detail.query);
            }
            if (e.detail?.initialMessage) {
                setInitialMessage(e.detail.initialMessage);
            }
            if (e.detail?.leadSource) {
                fingerprintLead(window.location.href, e.detail.leadSource).catch(console.error);
            }
        };
        window.addEventListener('open-concierge', handleOpenConcierge as EventListener);
        return () => window.removeEventListener('open-concierge', handleOpenConcierge as EventListener);
    }, []);

    // Auto Search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 2) {
                performSearch(query);
            } else if (query.length === 0) {
                setResults(null); // Reset
            }
        }, 400); // 400ms debounce
        return () => clearTimeout(timer);
    }, [query]);

    const performSearch = (q: string) => {
        startTransition(async () => {
            try {
                const data = await searchPosts(q);
                setResults(data);
            } catch (e) {
                console.error("Search failed", e);
                setResults([]);
            }
        });
    };

    const hasSearchedAndEmpty = results !== null && results.length === 0;

    // Hide concierge completely on specific routes (e.g., custom web development page)
    if (pathname === '/web/custom') return null;

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {/* Helper "Back to Top" only visible when scrolled */}
                {isScrolled && !isOpen && (
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all hover:-translate-y-1 animate-in fade-in zoom-in duration-300"
                    >
                        <ChevronUp size={20} />
                    </button>
                )}

                {/* FAM Button (Ana) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
            relative flex items-center justify-center gap-2 px-5 py-4 rounded-full
            font-medium text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95
            ${isOpen ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl px-4' : 'bg-black dark:bg-white dark:text-black'}
            border border-slate-800 dark:border-slate-200
          `}
                    style={{
                        boxShadow: isOpen
                            ? '0 10px 40px -10px rgba(0,0,0,0.5)'
                            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {/* Subtle glow effect behind */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-20 blur-md -z-10 animate-pulse" />

                    {isOpen ? (
                        <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-300">
                            <X size={20} />
                            <span className="text-sm">Fechar</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 animate-in slide-in-from-left-2 duration-300">
                            <Sparkles size={18} className="text-blue-400 dark:text-blue-600" />
                            <span>Concierge IA</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Search Overlay & IA Chat */}
            {isOpen && (
                <div
                    className="fixed bottom-24 right-6 z-40 w-[420px] h-[580px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500"
                >
                    {/* Header / Input */}
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl relative z-10 shrink-0">
                        <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
                            <div className="pl-3 text-slate-400">
                                {isPending ? <Loader2 size={18} className="animate-spin text-blue-500" /> : <Search size={18} />}
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Busca Semântica ou Pergunta IA"
                                className="w-full pl-3 pr-4 py-3 bg-transparent border-none text-sm outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                autoFocus
                            />
                            {query && (
                                <button onClick={() => setQuery('')} className="pr-3 text-slate-400 hover:text-slate-700 transition-colors">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto w-full flex flex-col scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">

                        {/* 1. Empty State / Suggestions */}
                        {!results && query.length === 0 && (
                            <div className="p-6">
                                <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Ana (Assistente IA)</h4>
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-6 border border-blue-100 dark:border-blue-900/50">
                                    <p className="text-sm text-blue-900 dark:text-blue-100 mb-2 leading-relaxed">
                                        {initialMessage}
                                    </p>
                                </div>

                                <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Tópicos Recentes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Exaustão Operacional', 'Análise Preditiva SaaS', 'Desorganização Financeira', 'Escalar Vendas'].map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => setQuery(tag)}
                                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-600 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
                                            style={{ animationDelay: `${Math.random() * 150}ms` }}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. Results List */}
                        {results && results.length > 0 && (
                            <div className="p-2 flex flex-col gap-1">
                                <div className="px-4 py-2 text-xs font-medium text-slate-400">Encontramos estes recursos para você:</div>
                                {results.map((item, idx) => (
                                    <a
                                        key={item.id}
                                        href={`/blog/${item.slug}`}
                                        className="group flex flex-col p-4 mx-2 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                                        style={{ animationDelay: `${idx * 50}ms` }}
                                    >
                                        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2">
                                            {item.excerpt}
                                        </p>

                                        {/* Tags for Hybrid Match explanation */}
                                        <div className="flex gap-2 items-center mt-auto">
                                            {(item.semantic_similarity > 0.6) && (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-sm">
                                                    <Sparkles size={10} /> Alta Afinidade Semântica
                                                </span>
                                            )}
                                            <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                Ler Artigo <ArrowRight size={10} />
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* 3. Empty State / Fallback - Lead Magnet */}
                        {hasSearchedAndEmpty && !isPending && (
                            <div
                                className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px] animate-in fade-in zoom-in-95 duration-500"
                            >
                                <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-blue-500">
                                    <MessageCircle size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Desafio Específico?</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                                    Ainda não temos um artigo exato para `{query}`, mas nossa equipe de especialistas e agentes de IA podem mapear e resolver o seu cenário.
                                </p>

                                {/* Magnetic Lead Button */}
                                <button className="relative group overflow-hidden w-full max-w-[280px] bg-black dark:bg-white text-white dark:text-black rounded-full px-6 py-4 font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Acionar Especialista <ArrowRight size={16} />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                                </button>
                                <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest">Resposta em menos de 10 min</p>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </>
    );
}
