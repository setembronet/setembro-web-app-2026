import { EcosystemCustomSystemsClient } from "@/components/systems/custom/EcosystemCustomSystemsClient";

export const metadata = {
    title: "Engenharia de Software sob Medida | CMMS, ERP, CRM | Setembro.net",
    description: "Desenvolvimento de Sistemas Customizados de alta performance. Plataformas SaaS, CMMS, ERP, CRM e Dashboards Inteligentes projetados com o Antigravity Kit.",
    keywords: [
        "Desenvolvimento de Sistemas Customizados",
        "Criação de SaaS",
        "Engenharia de Software com IA",
        "Antigravity Development",
        "CMMS",
        "ERP",
        "CRM",
        "Software de Gestão de Ativos",
        "Sistemas de Gestão Empresarial",
        "Dashboards Inteligentes"
    ],
};

export default function CustomSystemsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-background">
            <EcosystemCustomSystemsClient />
        </main>
    );
}
