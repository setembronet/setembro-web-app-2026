import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white">
            {/* Background grain texture for depth without generic gradients */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Geometric accent - sharp and aggressive, not soft/rounded */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-600/10 skew-x-[-15deg] translate-x-1/2 blur-3xl pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-8">

                <div className="space-y-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-400 dark:from-white dark:via-white dark:to-neutral-500">
                        Lojas Virtuais de
                        <br />
                        <span className="text-blue-600 dark:text-blue-500">Alta Performance</span>
                    </h1>

                    <p className="max-w-[700px] mx-auto text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-medium tracking-tight">
                        Transforme visitantes em compradores. Construímos sua máquina de vendas online com WooCommerce e Elementor Pro.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
                    <Link
                        href="https://wa.me/5581999999999" // TODO: Update with real WhatsApp number
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center overflow-hidden bg-blue-600 px-8 py-4 text-white font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Quero Começar Minha Loja
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
