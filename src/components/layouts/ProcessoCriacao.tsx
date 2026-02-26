import { Sparkles, Users } from 'lucide-react';

export function ProcessoCriacao() {
    return (
        <section className="relative w-full py-24 md:py-32 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white border-y border-neutral-100 dark:border-neutral-900">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">

                    {/* Image / Abstract AI Graphic side */}
                    <div className="relative aspect-square max-w-lg mx-auto w-full group">
                        {/* High-end portfolio border box */}
                        <div className="absolute inset-0 border border-neutral-200 dark:border-neutral-800 transition-colors duration-500 group-hover:border-blue-600/30 dark:group-hover:border-blue-500/30 z-0" />

                        <div className="absolute inset-4 bg-neutral-50 dark:bg-neutral-900 overflow-hidden flex items-center justify-center p-8 z-10 shadow-sm">
                            <div className="relative w-full h-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                                {/* Abstract AI / Brain visualization placeholder */}
                                <div className="absolute inset-0 border-t border-l border-blue-600/20 dark:border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                                <div className="absolute inset-8 border-b border-r border-neutral-900/10 dark:border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                <Sparkles className="w-16 h-16 text-blue-600 dark:text-blue-500 animate-pulse" />
                            </div>
                        </div>

                        {/* Floating Glass Label */}
                        <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-6 z-20 shadow-xl max-w-xs">
                            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Aceleração</p>
                            <p className="text-neutral-900 dark:text-white font-medium text-lg leading-tight">Prototipagem de alta fidelidade em tempo recorde.</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-500">
                                Criação Aumentada
                            </h2>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                                IA Implacável,<br />
                                <span className="text-neutral-400 dark:text-neutral-600">Curadoria Humana.</span>
                            </h3>
                            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                                Utilizamos inteligência artificial de ponta não para substituir o design, mas para amplificar a criatividade. O resultado são layouts sofisticados que seriam impossíveis de replicar com métodos tradicionais.
                            </p>
                        </div>

                        <div className="space-y-8 pt-4">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 mt-1">
                                    <Sparkles className="w-8 h-8 text-neutral-900 dark:text-white" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Geração de Ativos Únicos</h4>
                                    <p className="text-neutral-600 dark:text-neutral-400">Texuras, ícones, ilustrações abstratas e mockups gerados exclusivamente para a sua marca. Zero bancos de imagens clichês.</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 mt-1">
                                    <Users className="w-8 h-8 text-neutral-900 dark:text-white" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Sensibilidade Humana</h4>
                                    <p className="text-neutral-600 dark:text-neutral-400">A IA gera o volume e as formas brutas; nossos especialistas refinam a usabilidade (UX), a hierarquia da informação e as micro-interações.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
