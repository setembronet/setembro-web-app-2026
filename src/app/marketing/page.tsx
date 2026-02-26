import { HeroMarketing } from "@/components/marketing/HeroMarketing";
import { PilaresMarketing } from "@/components/marketing/PilaresMarketing";

export const metadata = {
    title: "Marketing Digital & SEO | Setembro.net",
    description: "Marketing de Precisão: Crescimento Acelerado por IA. Gestão de Ads, SEO para WordPress e Autoridade Social.",
    keywords: ["Marketing IA", "Gestão de Ads", "SEO para WordPress", "Tráfego Pago", "Marketing Digital", "SEO Semântico"],
};

export default function MarketingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <HeroMarketing />
            <PilaresMarketing />
        </main>
    );
}
