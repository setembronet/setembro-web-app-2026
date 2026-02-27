import { EcosystemAPIClient } from "@/components/systems/api/EcosystemAPIClient";

export const metadata = {
    title: "Engenharia de Conectividade & Integração de APIs | Setembro.net",
    description: "Conectividade de Sistemas com arquitetura escalável e segurança de ponta. Webhooks em Tempo Real, APIs RESTful e abstração de dados protegidos via criptografia e HTTPS.",
    keywords: [
        "Integração de APIs",
        "Conectividade de Sistemas",
        "Webhooks em Tempo Real",
        "APIs RESTful",
        "Automação de Dados",
        "Orquestração de Software",
        "Segurança de API"
    ],
};

export default function APIsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-background">
            <EcosystemAPIClient />
        </main>
    );
}
