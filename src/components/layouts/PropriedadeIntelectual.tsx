import { KeyRound, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function PropriedadeIntelectual() {
    return (
        <section className="relative w-full py-24 md:py-32 bg-neutral-900 dark:bg-black text-white selection:bg-blue-600 selection:text-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-blue-500">
                                Propriedade e Escala
                            </h2>
                            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-none">
                                O design é 100%<br />seu.
                            </h3>
                            <p className="text-xl text-neutral-400 font-light max-w-xl leading-relaxed">
                                Não alugamos layouts. Ao final do projeto, toda a propriedade intelectual, arquivos-fonte e guias de estilo são transferidos para a sua empresa.
                            </p>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-white/10 p-2 rounded-sm">
                                    <KeyRound className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1">Independência Total</h4>
                                    <p className="text-neutral-400 text-sm">Acesso irrestrito a todas as decisões de design e arquivos editáveis (Figma, tokens).</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-white/10 p-2 rounded-sm">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1">Style Guides (Diferencial Tecnológico)</h4>
                                    <p className="text-neutral-400 text-sm">Entregamos diretrizes documentadas que permitem que o design evolua junto com o projeto, garantindo consistência visual em todos os pontos de contato da sua empresa.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 w-full">
                            <Link
                                href="https://wa.me/5581999999999" // TODO: Update WhatsApp number
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 text-sm font-bold tracking-widest uppercase text-neutral-900 bg-white overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                            >
                                <span className="absolute inset-0 w-full h-full bg-blue-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                                    Quero um Projeto Personalizado
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="relative aspect-[4/3] w-full bg-neutral-800 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-800 p-8 flex flex-col justify-between overflow-hidden group">
                        {/* Background subtle noise/texture */}
                        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

                        {/* Style Guide Visualization Abstract */}
                        <div className="relative z-10 space-y-8">
                            <div>
                                <h5 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">Typography System</h5>
                                <div className="space-y-2 font-serif text-neutral-300">
                                    <p className="text-4xl">Aa <span className="text-sm font-sans text-neutral-500 ml-4">Heading / Playfair</span></p>
                                    <p className="text-2xl font-sans">Aa <span className="text-sm text-neutral-500 ml-4">Body / Inter</span></p>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">Color Palette</h5>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full border border-neutral-700 shadow-lg" />
                                    <div className="w-12 h-12 bg-neutral-900 rounded-full border border-neutral-700 shadow-lg" />
                                    <div className="w-12 h-12 bg-blue-600 rounded-full border border-neutral-700 shadow-lg" />
                                    <div className="w-12 h-12 bg-neutral-200 rounded-full border border-neutral-700 shadow-lg" />
                                </div>
                            </div>

                            <div>
                                <h5 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">Components</h5>
                                <div className="flex gap-4">
                                    <div className="h-10 w-32 bg-white/10 border border-white/20 rounded-md backdrop-blur-sm" />
                                    <div className="h-10 w-10 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                                </div>
                            </div>
                        </div>

                        {/* Decorative watermark */}
                        <div className="absolute -bottom-8 -right-8 text-[120px] font-black text-white/[0.03] pointer-events-none select-none">
                            GUIDE
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
