import { Check } from "lucide-react";

export function GestaoSimplificada() {
    return (
        <section className="relative w-full py-24 md:py-32 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-SM font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500">
                                Capacitação
                            </h2>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-neutral-900 dark:text-white">
                                Não entregamos apenas a loja.
                                <br />
                                <span className="text-neutral-400 dark:text-neutral-500">Entregamos controle.</span>
                            </h3>
                        </div>

                        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                            Acreditamos que o dono do negócio deve ter autonomia total. Ao final do projeto, sua equipe receberá treinamento prático completo para dominar a operação diária da sua máquina de vendas.
                        </p>

                        <ul className="space-y-4 pt-4">
                            {[
                                "Cadastramento eficiente de produtos e variações.",
                                "Gestão inteligente de estoque e inventário.",
                                "Processamento de pedidos ponta a ponta.",
                                "Autonomia para criar cupons e promoções."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 bg-blue-50 dark:bg-blue-900/20 p-1">
                                        <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative">
                        {/* Brutalist image container - sharp edges, high contrast border */}
                        <div className="aspect-[4/5] md:aspect-square bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-neutral-900/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            {/* Image placeholder - Replace with actual UI screenshot showing a person being trained or managing a dashboard */}
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
                                alt="Treinamento de equipe para gestão de e-commerce"
                                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                            />
                            <div className="absolute bottom-6 left-6 right-6 bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 p-6 z-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
                                <p className="font-bold text-neutral-900 dark:text-white text-lg uppercase tracking-wider">Treinamento Online ou Presencial</p>
                                <p className="text-neutral-600 dark:text-neutral-400 mt-2 font-medium">Garantimos que sua equipe opere a loja com total confiança desde o dia um.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
