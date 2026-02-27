import { EcosystemDesignClient } from "@/components/design/EcosystemDesignClient";

export const metadata = {
    title: "Engenharia Estética & Branding | Design Profissional | Setembro.net",
    description: "Design que Define Autoridade. Construímos a face da sua empresa com a precisão do design humano e a potência da Inteligência Artificial Generativa. Identidade Visual, Papelaria e Ativos Digitais.",
    keywords: ["Design Gráfico Profissional", "Criação de Logos com IA", "Identidade Visual Corporativa", "Design para Outdoors e Banners", "Branding Híbrido"],
};

export default function DesignPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-background">
            <EcosystemDesignClient />
        </main>
    );
}
