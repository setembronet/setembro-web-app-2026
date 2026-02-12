import { ServiceCard } from "@/components/molecules/ServiceCard";
import { Icons } from "@/components/atoms/Icons";

// Mock data for initial display
const services = [
    {
        title: "Desenvolvimento Web Personalizado",
        description: "Sites e aplicações web robustas, rápidas e escaláveis utilizando as mais recentes tecnologias como Next.js e React.",
        category: "Development",
        icon: <Icons.layout className="h-6 w-6" />,
        href: "/services/web-development"
    },
    {
        title: "Integração de Inteligência Artificial",
        description: "Automatize processos e obtenha insights valiosos integrando modelos de IA avançados ao seu fluxo de trabalho.",
        category: "AI Solutions",
        icon: <Icons.logo className="h-6 w-6" />,
        href: "/services/ai-integration"
    },
    {
        title: "Otimização SEO Técnica",
        description: "Melhore seu ranking no Google com análises técnicas profundas, otimização de performance e estrutura de dados.",
        category: "SEO",
        icon: <Icons.search className="h-6 w-6" />,
        href: "/services/seo"
    },
    {
        title: "Consultoria em Nuvem",
        description: "Migração, gerenciamento e otimização de infraestrutura em nuvem (AWS, Azure, GCP) para máxima eficiência.",
        category: "Infra",
        icon: <Icons.check className="h-6 w-6" />,
        href: "/services/cloud"
    },
    {
        title: "Marketing Digital & Growth",
        description: "Estratégias de crescimento baseadas em dados para escalar seu negócio e aquisição de clientes.",
        category: "Marketing",
        icon: <Icons.mail className="h-6 w-6" />,
        href: "/services/marketing"
    },
    {
        title: "Automação de Processos",
        description: "Reduza custos e erros manuais automatizando tarefas repetitivas com scripts e ferramentas inteligentes.",
        category: "Automation",
        icon: <Icons.message className="h-6 w-6" />,
        href: "/services/automation"
    }
];

export function ServiceGrid() {
    return (
        <section id="services" className="container mx-auto px-4 py-20">
            <div className="mb-12 text-center">
                <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
                    Nossas Soluções
                </h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                    Oferecemos um leque completo de serviços para impulsionar sua presença digital e eficiência operacional.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        {...service}
                    />
                ))}
            </div>
        </section>
    );
}
