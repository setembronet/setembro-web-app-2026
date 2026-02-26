import { Palette, Maximize, Layers } from 'lucide-react';

export function PilarOriginalidade() {
    return (
        <section className="relative w-full py-24 md:py-32 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-500">
                        Design Original (Zero Templates)
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                        Sua marca não cabe em<br />um formato pronto.
                    </h3>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                        Esqueça a adaptação forçada do seu negócio a um tema genérico. Criamos do zero a arquitetura visual que sua empresa exige, garantindo exclusividade total no mercado.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Item 1 */}
                    <div className="group bg-white dark:bg-neutral-900 p-10 border border-neutral-100 dark:border-neutral-800 hover:shadow-2xl hover:shadow-neutral-200/50 dark:hover:shadow-none hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Palette className="w-8 h-8 text-blue-600 dark:text-blue-500" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Identidade Exclusiva</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                            Cores, tipografia e espaçamentos definidos meticulosamente para traduzir o posicionamento da sua marca, sem depender de bibliotecas saturadas.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="group bg-white dark:bg-neutral-900 p-10 border border-neutral-100 dark:border-neutral-800 hover:shadow-2xl hover:shadow-neutral-200/50 dark:hover:shadow-none hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Maximize className="w-8 h-8 text-blue-600 dark:text-blue-500" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Arquitetura Escalável</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                            Desenvolvemos sistemas projetados para crescer. Novos recursos ou páginas secundárias herdam automaticamente as diretrizes de design estabelecidas.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div className="group bg-white dark:bg-neutral-900 p-10 border border-neutral-100 dark:border-neutral-800 hover:shadow-2xl hover:shadow-neutral-200/50 dark:hover:shadow-none hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Layers className="w-8 h-8 text-blue-600 dark:text-blue-500" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Alta Fidelidade</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                            Do wireframe ao protótipo navegável, você visualiza e aprova cada detalhe de interface (UI) e experiência (UX) antes de qualquer linha de código.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
