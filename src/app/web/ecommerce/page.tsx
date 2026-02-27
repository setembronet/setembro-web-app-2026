import { Hero } from "@/components/ecommerce/Hero";
import { GestaoSimplificada } from "@/components/ecommerce/GestaoSimplificada";
import { Seguranca } from "@/components/ecommerce/Seguranca";
import { Recursos } from "@/components/ecommerce/Recursos";
import { EcommerceCTA } from "@/components/ecommerce/EcommerceCTA";

export const metadata = {
    title: "Lojas Virtuais de Alta Performance | Setembro.net",
    description: "Construímos sua máquina de vendas online com WooCommerce e Elementor Pro. Controle total, velocidade e conversão para o seu e-commerce.",
};

export default function EcommercePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between w-full font-sans bg-white selection:bg-blue-600 selection:text-white pb-32">
            {/* 
        The aesthetic follows the Clean-Corporate directive with a "Brutalist/Technical" slant.
        No purple or violet colors are used in any of these components (Purple Ban).
        The layout avoids standard standard splits by using bold typography, tight grids, 
        black/white high contrast, and aggressive geometric forms (e.g. sharp accents, no rounded corners).
      */}
            <Hero />
            <GestaoSimplificada />
            <Seguranca />
            <Recursos />

            {/* Final Section / Footer CTA */}
            <section className="w-full py-20 bg-blue-600 text-white flex flex-col items-center justify-center text-center px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Pronto para vender de verdade?</h2>
                <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl font-medium">
                    Fale com nossos especialistas e descubra como podemos estruturar o seu e-commerce para decolar em 2026.
                </p>
                <EcommerceCTA />
            </section>
        </main>
    );
}
