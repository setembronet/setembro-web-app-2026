import { Hero } from "@/components/layouts/Hero";
import { ProcessoCriacao } from "@/components/layouts/ProcessoCriacao";
import { PilarOriginalidade } from "@/components/layouts/PilarOriginalidade";
import { EcossistemaAcesso } from "@/components/layouts/EcossistemaAcesso";
import { PropriedadeIntelectual } from "@/components/layouts/PropriedadeIntelectual";

export const metadata = {
    title: "Engenharia Visual | Setembro.net",
    description: "Interfaces exclusivas sob medida. Criamos a identidade do seu projeto unindo a sensibilidade do design humano à potência da Inteligência Artificial.",
};

export default function LayoutsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Hero />
            <PilarOriginalidade />
            <ProcessoCriacao />
            <EcossistemaAcesso />
            <PropriedadeIntelectual />
        </main>
    );
}
