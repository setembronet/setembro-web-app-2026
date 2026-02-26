export const metadata = {
    title: "Contato | Setembro.net",
    description: "Fale conosco e impulsione seu negócio.",
};

import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Fale Conosco</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                    Nossa equipe de especialistas está pronta para ajudar você a integrar IA, construir soluções e transformar sua operação digital.
                </p>
                <div className="bg-card p-8 rounded-xl shadow-sm border border-border text-left">
                    <ContactForm />
                </div>
            </div>
        </main>
    );
}
