import { EcosystemNexus360Client } from "@/components/solucoes/nexus-360/EcosystemNexus360Client";

export const metadata = {
    title: "Setembro Nexus360 | Solução 360 de Inteligência B2B | Setembro.net",
    description: "O Nexus360 é o ecossistema definitivo que une presença digital, infraestrutura e Agentes de Inteligência Artificial em um núcleo vivo para o seu negócio.",
    keywords: [
        "Setembro Nexus360",
        "Ecossistema de Inteligência Nexus",
        "Solução 360 para Empresas",
        "Agentes de IA Nexus360",
        "Orquestração de Dados",
        "Estratégia Digital B2B",
        "Transformação Corporativa"
    ],
};

export default function Nexus360Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-background">
            <EcosystemNexus360Client />
        </main>
    );
}
