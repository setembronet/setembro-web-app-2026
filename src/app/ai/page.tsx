import { EcosystemAiClient } from "@/components/ai/EcosystemAiClient";

export const metadata = {
    title: "Inteligência Artificial para Empresas | IA Generativa B2B | Setembro.net",
    description: "Inteligência que Pensa, Cria e Evolui. Implemente camadas de raciocínio artificial com Agentes Virtuais Inteligentes e Análise Preditiva para escalar seu negócio.",
    keywords: ["Inteligência Artificial para Empresas", "IA Generativa B2B", "Agentes Virtuais Inteligentes", "Análise Preditiva com IA", "Ativos de Inteligência"],
};

export default function AiPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-background">
            <EcosystemAiClient />
        </main>
    );
}
