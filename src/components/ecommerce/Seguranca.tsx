import { ShieldCheck, Server, Lock, RefreshCw } from "lucide-react";

export function Seguranca() {
    const features = [
        {
            icon: <Server className="w-8 h-8 text-neutral-900 dark:text-white" />,
            title: "Hospedagem Dedicada",
            description: "Sua loja roda em servidores otimizados exclusivamente para WooCommerce, garantindo velocidade e estabilidade em picos de tráfego."
        },
        {
            icon: <Lock className="w-8 h-8 text-neutral-900 dark:text-white" />,
            title: "Segurança de Dados",
            description: "Certificados SSL, proteção contra DDoS e firewalls avançados para manter as informações dos seus clientes blindadas."
        },
        {
            icon: <RefreshCw className="w-8 h-8 text-neutral-900 dark:text-white" />,
            title: "Manutenção Técnica",
            description: "Nós cuidamos das atualizações de plugins, temas e do core do WordPress. Você foca apenas em vender."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-neutral-900 dark:text-white" />,
            title: "Backups Diários",
            description: "Sua loja é salva automaticamente todos os dias. Em caso de imprevistos, restauramos tudo em minutos."
        }
    ];

    return (
        <section className="w-full py-24 md:py-32 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white selection:bg-blue-600 selection:text-white">
            <div className="container px-4 md:px-6 mx-auto">

                <div className="max-w-3xl mb-16 md:mb-24">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500 mb-4">
                        Segurança & Estabilidade
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-6">
                        O peso da tecnologia<br />
                        <span className="text-neutral-500 dark:text-neutral-500">fica com a gente.</span>
                    </h3>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed">
                        Uma máquina de vendas não pode parar. Assumimos 100% da responsabilidade pela infraestrutura técnica, atualizações e segurança da sua loja virtual.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white p-8 border-t-4 border-blue-600 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden flex flex-col items-start shadow-sm hover:shadow-md dark:shadow-none"
                        >
                            {/* Background accent on hover */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-50 dark:bg-neutral-900 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150 z-0" />

                            <div className="mb-6 relative z-10 p-3 bg-neutral-100 dark:bg-neutral-800 inline-block">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-3 relative z-10">{feature.title}</h4>
                            <p className="text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed relative z-10">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
