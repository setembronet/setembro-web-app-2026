import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background py-20 md:py-32">
            {/* Background Elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="container relative mx-auto px-4 text-center">
                <Badge variant="outline" className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 border-accent/20 text-accent">
                    Inovação para 2026
                </Badge>

                <h1 className="mx-auto mb-6 max-w-4xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                    Transforme seu negócio com <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-600">Inteligência Artificial</span> e Tecnologia Avançada
                </h1>

                <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                    Desenvolvimento de software, consultoria em IA e soluções digitais sob medida. Prepare sua empresa para o futuro hoje mesmo.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px]" asChild>
                        <Link href="/contact">
                            Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="min-w-[200px]" asChild>
                        <Link href="#services">
                            Conheça Nossos Serviços
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
