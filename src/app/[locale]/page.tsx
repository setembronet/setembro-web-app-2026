"use client";

import { ContactForm } from "@/components/ContactForm";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Zap, BarChart2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
    const t = useTranslations("HomePage");

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background z-0" />
                <div className="container relative z-10 mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-8">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                            Novidade: Dashboard Completo de Agentes IA
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl">
                            {t("title")}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            {t("description")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="#contact">
                                <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white border-0">
                                    Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="#contact">
                                <Button size="lg" variant="outline">
                                    Fale com Especialista
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-12 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Bot className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">Agentes Inteligentes</h3>
                            <p className="text-muted-foreground">
                                Equipe digital completa: Ana, Carlos, Julia e Sofia trabalhando 24/7 para você.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Zap className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">Automação Total</h3>
                            <p className="text-muted-foreground">
                                Elimine tarefas repetitivas e foque no estratégico com nossos fluxos automatizados.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <BarChart2 className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">Growth & Analytics</h3>
                            <p className="text-muted-foreground">
                                Decisões baseadas em dados com dashboards em tempo real e insights de IA.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof / ROI Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Resultados Comprovados
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Nossos clientes experimentam um aumento médio de 40% na produtividade no primeiro mês.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Redução de 60% no tempo de resposta",
                                    "Aumento de 35% na conversão de leads",
                                    "Economia de 20h semanais por colaborador",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button variant="secondary">Ver Casos de Sucesso</Button>
                        </div>
                        <div className="relative h-[400px] rounded-xl overflow-hidden bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center border shadow-2xl">
                            <div className="text-center space-y-2 p-8">
                                <div className="text-5xl font-bold text-white mb-2">350+</div>
                                <div className="text-slate-300">Empresas Transformadas</div>
                                <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-4 mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Fale com um Especialista
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Descubra como nossa IA pode transformar seu negócio hoje.
                        </p>
                    </div>
                    <div className="max-w-xl mx-auto bg-card p-8 rounded-xl border shadow-lg">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
