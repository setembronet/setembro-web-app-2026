export const metadata = {
    title: "Política de Privacidade | Setembro.net",
    description: "Termos e privacidade da plataforma Setembro.net.",
};

export default function PrivacyPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 text-center">Política de Privacidade</h1>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <p>
                        A sua privacidade é importante para nós. É política do Setembro.net respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar em nosso site.
                    </p>
                    <p>
                        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
                    </p>
                    <p>
                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, os protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso não autorizado.
                    </p>
                </div>
            </div>
        </main>
    );
}
