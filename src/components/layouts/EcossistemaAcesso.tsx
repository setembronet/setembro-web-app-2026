import { MonitorSmartphone, LayoutDashboard, ShoppingBag } from 'lucide-react';

export function EcossistemaAcesso() {
    return (
        <section className="relative w-full py-24 md:py-32 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="order-2 lg:order-1 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-500">
                                Aplicação Multimeios
                            </h2>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                                Agnóstico. <br className="hidden lg:block" />Versátil. <br className="hidden lg:block" />Implacável.
                            </h3>
                            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-xl">
                                Trabalhamos a Engenharia Visual na sua forma mais pura. Seu layout nasce desvinculado de amarras técnicas: pronto para ser aplicado onde seu negócio exigir.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-950 p-6 border border-neutral-100 dark:border-neutral-800">
                                <MonitorSmartphone className="w-8 h-8 text-neutral-900 dark:text-white flex-shrink-0" strokeWidth={1.5} />
                                <div>
                                    <h4 className="text-lg font-bold">Sites Institucionais (WordPress)</h4>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">Presença digital autoritária, otimizada para SEO e conversão.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-950 p-6 border border-neutral-100 dark:border-neutral-800">
                                <ShoppingBag className="w-8 h-8 text-neutral-900 dark:text-white flex-shrink-0" strokeWidth={1.5} />
                                <div>
                                    <h4 className="text-lg font-bold">Lojas Virtuais (WooCommerce)</h4>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">E-commerces desenhados para reduzir fricção e escalar vendas.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-950 p-6 border border-neutral-100 dark:border-neutral-800">
                                <LayoutDashboard className="w-8 h-8 text-neutral-900 dark:text-white flex-shrink-0" strokeWidth={1.5} />
                                <div>
                                    <h4 className="text-lg font-bold">Dashboards e SaaS</h4>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">Interfaces complexas estruturadas para usabilidade e retenção.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Graphical Visualizer */}
                    <div className="order-1 lg:order-2 relative aspect-square w-full lg:max-w-lg mx-auto overflow-hidden bg-neutral-100 dark:bg-neutral-950 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-8">
                        {/* Abstract Mockup representation */}
                        <div className="relative w-full h-full shadow-2xl bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col">
                            {/* Browser/Window Header */}
                            <div className="h-8 w-full border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center px-4 gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                            </div>
                            {/* Body content visualization */}
                            <div className="flex-1 p-6 flex flex-col gap-6 opacity-30 dark:opacity-50">
                                <div className="w-2/3 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                                <div className="space-y-3">
                                    <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-700 rounded-sm" />
                                    <div className="w-5/6 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-sm" />
                                    <div className="w-4/6 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                    <div className="w-full h-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                                    <div className="w-full h-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                                </div>
                            </div>

                            {/* Overlay graphic demonstrating flexibility */}
                            <div className="absolute inset-0 bg-blue-600/5 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
