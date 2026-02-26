export const metadata = {
    title: "Sobre Nós | Setembro.net",
    description: "Conheça a Setembro.net, a agência líder em IA e soluções web premium corporativas.",
};

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Sobre Nós</h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Somos uma agência focada na criação de ativos digitais premium para o mercado corporativo.
                    Aliamos design com Inteligência Artificial para alavancar seu crescimento.
                </p>
            </div>
        </main>
    );
}
