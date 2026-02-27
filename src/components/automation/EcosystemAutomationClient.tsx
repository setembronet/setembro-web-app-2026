"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Network, Clock, Cpu, ArrowUpRight, Database } from "lucide-react";
import { fingerprintLead } from "@/actions/fingerprint-lead";
import Link from "next/link";

export function EcosystemAutomationClient() {
    // Handler interceptor specifically designed for ANA
    const handleConciergeOpen = async (sectionContext: string) => {
        // Trigger lead tracking/fingerprinting
        try {
            await fingerprintLead(window.location.href, `automacao-processos: ${sectionContext}`);
        } catch (error) {
            console.error("Tracking failure:", error);
        }

        // Intercept intent and wake up ANA
        const event = new CustomEvent("open-concierge", {
            detail: {
                message: "Olá! Sou a Ana. Vi que você quer eliminar tarefas manuais e orquestrar seus processos. Qual o fluxo que mais toma seu tempo hoje?",
                context: "automacao-processos"
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b bg-card">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="container relative mx-auto px-4 md:px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6">
                        <Settings className="h-4 w-4 mr-2 animate-spin-slow" />
                        Engenharia de Fluxos Progressivos
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto text-foreground">
                        Sua Empresa em Fluxo: Automação que <span className="text-primary">Conecta e Executa.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        Elimine o trabalho manual, conecte suas ferramentas favoritas e transforme processos lentos em workflows de alta performance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="h-12 px-8 text-base shadow-lg" onClick={() => handleConciergeOpen('hero_cta')}>
                            Automatizar meu Negócio <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* DORES & SOLUÇÕES (Table Pattern converted to Cards for better UX) */}
            <section className="py-24 bg-muted/30 border-b">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">O Fim dos Gargalos Operacionais</h2>
                        <p className="text-muted-foreground text-lg">Onde a sua operação sangra, nossa engenharia estanca.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Dor 1 */}
                        <div className="bg-background p-8 rounded-2xl border shadow-sm">
                            <div className="flex flex-col h-full">
                                <div className="mb-6">
                                    <span className="text-red-500/80 font-semibold text-sm uppercase tracking-wider mb-2 block">A Dor</span>
                                    <h3 className="text-xl font-bold mb-2">Leads perdidos por demora</h3>
                                    <p className="text-muted-foreground">O cliente esfria enquanto a equipe comercial demora horas para responder uma cotação.</p>
                                </div>
                                <div className="mt-auto pt-6 border-t border-primary/10">
                                    <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider mb-2 block">A Solução Setembro</span>
                                    <h4 className="font-bold mb-1 flex items-center text-primary"><Network className="h-4 w-4 mr-2" /> Resposta Instantânea</h4>
                                    <p className="text-sm text-foreground/80">Fluxos que capturam, qualificam e distribuem leads aos vendedores em milissegundos.</p>
                                </div>
                            </div>
                        </div>

                        {/* Dor 2 */}
                        <div className="bg-background p-8 rounded-2xl border shadow-sm">
                            <div className="flex flex-col h-full">
                                <div className="mb-6">
                                    <span className="text-red-500/80 font-semibold text-sm uppercase tracking-wider mb-2 block">A Dor</span>
                                    <h3 className="text-xl font-bold mb-2">Dados Fragmentados</h3>
                                    <p className="text-muted-foreground">O CRM não fala com a Planilha, que não fala com o ERP. Decisões baseadas em achismos.</p>
                                </div>
                                <div className="mt-auto pt-6 border-t border-primary/10">
                                    <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider mb-2 block">A Solução Setembro</span>
                                    <h4 className="font-bold mb-1 flex items-center text-primary"><Database className="h-4 w-4 mr-2" /> Sincronização Omnichannel</h4>
                                    <p className="text-sm text-foreground/80">Orquestração técnica que mantém seus dados íntegros e universais em todas as plataformas.</p>
                                </div>
                            </div>
                        </div>

                        {/* Dor 3 */}
                        <div className="bg-background p-8 rounded-2xl border shadow-sm">
                            <div className="flex flex-col h-full">
                                <div className="mb-6">
                                    <span className="text-red-500/80 font-semibold text-sm uppercase tracking-wider mb-2 block">A Dor</span>
                                    <h3 className="text-xl font-bold mb-2">Tarefas Repetitivas</h3>
                                    <p className="text-muted-foreground">Sua equipe gasta 30% do tempo baixando anexos, movendo arquivos e copiando dados à mão.</p>
                                </div>
                                <div className="mt-auto pt-6 border-t border-primary/10">
                                    <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider mb-2 block">A Solução Setembro</span>
                                    <h4 className="font-bold mb-1 flex items-center text-primary"><Cpu className="h-4 w-4 mr-2" /> Mão de Obra Digital</h4>
                                    <p className="text-sm text-foreground/80">Rópos de backend invisíveis que executam tarefas burocráticas 24/7 com zero margem de erro.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* A TECNOLOGIA */}
            <section className="py-24 bg-card border-b">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
                    <h2 className="text-3xl font-bold mb-12">Conectividade e Estrutura</h2>

                    <div className="grid gap-8 sm:grid-cols-3 text-left">
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-foreground mb-6 shadow-sm border">
                                <Network className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Integração via APIs</h3>
                            <p className="text-muted-foreground">Conectamos qualquer software que possua uma porta de entrada (Webhooks/REST), criando um ecossistema coeso e seguro.</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6">
                            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-foreground mb-6 shadow-sm border">
                                <Settings className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Orquestração Lógica</h3>
                            <p className="text-muted-foreground">Criamos caminhos de decisão complexos condicionados às regras do seu negócio (Ex: Se X acontecer, faça Y e avise Z).</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6">
                            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-foreground mb-6 shadow-sm border">
                                <Clock className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Monitoramento Tempo Real</h3>
                            <p className="text-muted-foreground">Sua empresa reage a eventos instantaneamente, seja uma venda fechada, um pagamento recusado ou um novo lead gerado.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* A PONTE PARA A IA (Upsell) */}
            <section className="py-16 bg-muted/40 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 blur-3xl -z-10 rounded-full translate-x-1/2"></div>
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="bg-background p-8 md:p-12 rounded-3xl border border-primary/20 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                O Próximo Nível
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 pr-24 text-foreground">Quando a Automação Encontra a IA</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                            A automação é o esqueleto que sustenta o seu negócio. Quando unimos essa estrutura à nossa <strong className="text-foreground font-semibold">Inteligência Artificial</strong>, o seu fluxo de trabalho não apenas executa tarefas fixas, mas passa a <em>tomar decisões cognitivas autônomas</em> lendo contextos, e-mails e planilhas.
                        </p>
                        <Link href="/ai" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                            Conhecer o Cérebro da Operação <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-20 border-t bg-card text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Liberte seu Capital Humano</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Seus especialistas deviriam estar pensando no negócio, não copiando e colando planilhas.
                    </p>
                    <Button size="lg" className="h-14 px-10 text-lg shadow-xl" onClick={() => handleConciergeOpen('bottom_cta')}>
                        Desenhar Meu Primeiro Fluxo <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
