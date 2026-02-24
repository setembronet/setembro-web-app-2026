import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Zap, BarChart2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LatestPostsSection } from "@/components/LatestPostsSection";
import { RoiCalculator } from "@/components/organisms/RoiCalculator";
import { HeroSearch } from "@/components/HeroSearch";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSearch />

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

            {/* Interactive ROI Calculator Section */}
            <RoiCalculator />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Latest Posts Section */}
            <LatestPostsSection />

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
