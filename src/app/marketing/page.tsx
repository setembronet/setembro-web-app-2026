import { EcosystemClient } from "@/components/marketing/EcosystemClient";

export const metadata = {
    title: "Ecossistema de Marketing | Inteligência de Dados & SEO | Setembro.net",
    description: "Marketing de Precisão: O Ecossistema de Inteligência que Escala seu Negócio. Não operamos canais isolados, construímos ativos digitais com Gestão de Ads com IA, SEO Técnico Avançado e Engenharia de Dados.",
    keywords: ["Ecossistema de Marketing", "Inteligência de Dados", "SEO Técnico Avançado", "Gestão de Ads com IA", "Marketing de Precisão"],
};

export default function MarketingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-background">
            <EcosystemClient />
        </main>
    );
}
