"use client";

import { LineChart, Globe, SearchCheck } from "lucide-react";

const pillars = [
    {
        title: "Tráfego Pago (Ads)",
        description: "Gerenciamos campanhas no Google Ads, Meta e LinkedIn Ads usando IA para maximizar o ROI e reduzir o custo por lead.",
        icon: LineChart,
        delay: 0.1,
    },
    {
        title: "Autoridade Social",
        description: "Gestão completa de Redes Sociais e Google Meu Negócio com narrativa consistente e posicionamento premium.",
        icon: Globe,
        delay: 0.2,
    },
    {
        title: "SEO Semântico",
        description: "Posts para blog em WordPress otimizados por IA para garantir a posição #1 nas buscas e construir tráfego perene.",
        icon: SearchCheck,
        delay: 0.3,
    },
];

export function PilaresMarketing() {
    return (
        <section className="w-full py-24 md:py-32 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900">
            <div className="container px-4 md:px-6 mx-auto">

                <div className="flex flex-col md:flex-row gap-12 justify-between items-start mb-16 md:mb-24">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight mb-6">
                            Não fazemos apenas postagens; criamos <span className="text-blue-600 dark:text-blue-500">ativos digitais.</span>
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light">
                            Nossa Inteligência Artificial monitora tendências em tempo real, garantindo que cada investimento em marketing traga retorno mensurável e escale seu negócio de forma invisível para a concorrência.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-neutral-200 dark:border-neutral-800 pt-12">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-4 group animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
                            style={{ animationDelay: `${pillar.delay * 1000}ms` }}
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                                <pillar.icon className="w-6 h-6 text-neutral-700 dark:text-neutral-300 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-4">{pillar.title}</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
