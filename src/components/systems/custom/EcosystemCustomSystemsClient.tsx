"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Server, Database, Boxes, Cog, Terminal, ShieldCheck, Rocket } from "lucide-react";
import { fingerprintLead } from "@/actions/fingerprint-lead";

export function EcosystemCustomSystemsClient() {
    // Interceptor Ana connection Context
    const handleConciergeOpen = async (sectionContext: string) => {
        try {
            await fingerprintLead(window.location.href, `sistemas-customizados: ${sectionContext}`);
        } catch (error) {
            console.error("Tracking failure:", error);
        }

        const event = new CustomEvent("open-concierge", {
            detail: {
                message: "Olá! Sou a Ana. Vi que você busca um sistema de alta performance. Vamos conversar sobre o seu novo CMMS, ERP ou software sob medida?",
                context: "sistemas-customizados"
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <div className="w-full font-sans text-slate-800 dark:text-slate-200">
            {/* HERO SECTION - High-Tech Industrial */}
            <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 text-slate-50">
                {/* Tech Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

                <div className="container relative mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out flex flex-col items-center text-center">
                    <div className="inline-flex items-center rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 mb-8 uppercase tracking-widest shadow-sm">
                        <Terminal className="h-3 w-3 mr-2" />
                        Engenharia de Software Corporativa
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto">
                        Onde sua Visão se torna <span className="text-emerald-400">Código.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Chega de limitar seus processos a softwares de prateleira engessados. Projetamos a infraestrutura ideal para escalar o núcleo da sua operação.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            size="lg"
                            className="h-14 px-8 text-base shadow-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold transition-all rounded-sm"
                            onClick={() => handleConciergeOpen('hero_cta')}
                        >
                            Projetar Meu Sistema <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* ANTIGRAVITY KIT ACCELERATION */}
            <section className="py-20 bg-card border-b">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 w-full bg-slate-50 dark:bg-slate-900/50 p-8 rounded-sm border border-slate-200 dark:border-slate-800 relative font-mono text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-2">
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                </div>
                                <span>antigravity-kit.sys</span>
                            </div>
                            <p><span className="text-emerald-500 dark:text-emerald-400">~</span> initializing architecture...</p>
                            <p><span className="text-emerald-500 dark:text-emerald-400">~</span> loaded modules: 247 reqs</p>
                            <p><span className="text-emerald-500 dark:text-emerald-400">~</span> compilation time: <span className="text-blue-500">-70%</span></p>
                            <p><span className="text-emerald-500 dark:text-emerald-400">~</span> ready to deploy.</p>
                        </div>

                        <div className="flex-1 space-y-6">
                            <div className="flex items-center space-x-2 text-foreground/80 mb-2">
                                <Rocket className="h-5 w-5" />
                                <span className="font-semibold tracking-wider uppercase text-sm">Turbo-Charged Delivery</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">O Motor Antigravity</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Softwares customizados costumam ser sinônimo de anos de espera. Nós quebramos essa regra com o nosso framework exclusivo proprietário: o **Antigravity Kit**.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Ele nos permite orquestrar bancos de dados, fluxos de segurança (Auth, RLS) e componentes de interface complexos em uma fração do tempo do mercado tradicional, mantendo o mais rigoroso nível de qualidade do código (Clean Code & Solid).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CRITICAL SOLUTIONS DATA GRID */}
            <section className="py-24 bg-background relative">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Soluções Críticas de Infraestrutura</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Transforme sua operação em um ativo digital impenetrável. Sistemas modulares construídos para quem domina seu mercado.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* 1. CMMS */}
                        <div className="group bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 rounded-sm hover:border-emerald-500/50 transition-colors">
                            <Cog className="h-8 w-8 mb-6 text-emerald-500" />
                            <h3 className="text-xl font-bold mb-3 font-mono tracking-tight">CMMS & Gestão de Ativos</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Manutenção inteligente e controle preditivo sobre infraestrutura física, frotas ou parque de máquinas industriais.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Relatórios de MTBF/MTTR</li>
                                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Ordens de Serviço Dinâmicas</li>
                            </ul>
                        </div>

                        {/* 2. ERP/CRM */}
                        <div className="group bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 rounded-sm hover:border-emerald-500/50 transition-colors">
                            <Database className="h-8 w-8 mb-6 text-emerald-500" />
                            <h3 className="text-xl font-bold mb-3 font-mono tracking-tight">ERP & CRM Customizados</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Ferramentas de gestão empresarial e financeira acopladas perfeitamente às peculiaridades e necessidades operacionais do seu negócio.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Dashboards Gerenciais 360º</li>
                                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Funis de Venda Parametrizados</li>
                            </ul>
                        </div>

                        {/* 3. Plataformas SaaS */}
                        <div className="group bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 rounded-sm hover:border-emerald-500/50 transition-colors">
                            <Server className="h-8 w-8 mb-6 text-emerald-500" />
                            <h3 className="text-xl font-bold mb-3 font-mono tracking-tight">Plataformas SaaS</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Tem um método validado? Transformamos sua lógica de negócio em um produto de software escalável, pronto para monetização (B2B ou B2C).
                            </p>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Gateway de Assinaturas (Stripe/Asaas)</li>
                                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Multi-tenancy Isolation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARCHITECTURAL GUARANTEE */}
            <section className="py-20 bg-slate-950 text-slate-50 border-t border-slate-800">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-6">
                        <Boxes className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-emerald-400 font-mono">Software que não envelhece.</h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Desenhamos sistemas estruturados sob arquiteturas modulares. Quando o seu negócio pivotar, adquirir outras empresas ou expandir para novos mercados, nossa base de código estará pronta para acoplar novos módulos, desenhada para a década, não para o trimestre.
                    </p>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-12 px-8 border-emerald-500/50 text-emerald-400 bg-transparent hover:bg-emerald-500 hover:text-slate-950 transition-colors font-mono uppercase tracking-wider text-sm"
                        onClick={() => handleConciergeOpen('bottom_cta')}
                    >
                        [ Iniciar Arquitetura de Software ]
                    </Button>
                </div>
            </section>

        </div>
    );
}
