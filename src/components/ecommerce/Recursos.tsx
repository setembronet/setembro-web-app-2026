import { ShoppingCart, CreditCard, Truck, LayoutTemplate } from "lucide-react";

export function Recursos() {
    const recursos = [
        {
            title: "Flexibilidade Total de Pagamentos",
            description: "Integração nativa com Pix, Cartão de Crédito, Boleto e os principais gateways do mercado (Mercado Pago, Pagar.me, Stripe).",
            icon: <CreditCard className="w-10 h-10 mb-6 text-blue-600" />
        },
        {
            title: "Logística Inteligente",
            description: "Cálculo de frete em tempo real integrado aos Correios, Melhor Envio, Jadlog e transportadoras personalizadas.",
            icon: <Truck className="w-10 h-10 mb-6 text-blue-600" />
        },
        {
            title: "Design Focado em Conversão",
            description: "Navegação fluida, checkout otimizado (redução de abandono de carrinho) e experiência Mobile-First desenhada no Elementor Pro.",
            icon: <LayoutTemplate className="w-10 h-10 mb-6 text-blue-600" />
        },
        {
            title: "Gestão Avançada de Catálogo",
            description: "Controle de estoque, produtos simples e variáveis, controle de cupons, relatórios de vendas e integração com ERPs.",
            icon: <ShoppingCart className="w-10 h-10 mb-6 text-blue-600" />
        }
    ];

    return (
        <section className="w-full py-24 md:py-32 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600 dark:text-blue-500">
                        Poder do WooCommerce
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-neutral-900 dark:text-white">
                        A plataforma mais versátil do mundo.
                    </h3>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 font-medium">
                        Sua loja nasce pronta para vender e escalar, sem limites artificiais de planos ou plataformas alugadas. Cancele as taxas mensais sobre vendas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                    {recursos.map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-neutral-900 p-12 md:p-16 flex flex-col items-start hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors duration-300">
                            {item.icon}
                            <h4 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">{item.title}</h4>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
