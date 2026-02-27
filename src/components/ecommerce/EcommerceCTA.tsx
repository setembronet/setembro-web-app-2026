"use client";

import { fingerprintLead } from "@/actions/fingerprint-lead";

export function EcommerceCTA() {
    const handleConciergeOpen = async () => {
        try {
            await fingerprintLead(window.location.href, "ecommerce-woocommerce: btn_footer_cta");
        } catch (error) {
            console.error("Tracking failure:", error);
        }
        const event = new CustomEvent("open-concierge", {
            detail: {
                message: "Olá! Uma máquina de vendas online com WooCommerce e foco em performance muda todo o patamar do seu faturamento. Sou a Ana, a primeira agente da Setembro.net. Quantos produtos você gerencia no seu catálogo?",
                context: "ecommerce-woocommerce"
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <button
            onClick={handleConciergeOpen}
            className="bg-neutral-900 text-white font-bold text-lg px-10 py-5 uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-2xl"
        >
            Iniciar Projeto
        </button>
    );
}
