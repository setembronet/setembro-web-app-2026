import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "AI Hub | Setembro.net",
    description: "Converse com nossos agentes especializados em IA para transformar seu negócio.",
    openGraph: {
        title: "AI Hub | Setembro.net",
        description: "Converse com nossos agentes especializados em IA para transformar seu negócio.",
        url: "https://setembro.net/ai-hub",
    }
};

import { setRequestLocale } from 'next-intl/server';

export default async function AIHubLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <>{children}</>;
}
