import { EcosystemAutomationClient } from "@/components/automation/EcosystemAutomationClient";

export const metadata = {
    title: "Automação de Processos B2B | Workflows Inteligentes | Setembro.net",
    description: "Sua Empresa em Fluxo: Automação que Conecta e Executa. Elimine o trabalho manual, conecte suas ferramentas via Integração de APIs e transforme processos em workflows de alta performance e Eficiência Operacional.",
    keywords: ["Automação de Processos B2B", "Integração de APIs", "Eficiência Operacional", "Workflows Inteligentes", "Orquestração de Dados"],
};

export default function AutomationPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-background">
            <EcosystemAutomationClient />
        </main>
    );
}
