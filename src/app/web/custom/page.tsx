import { CheckCircle2, MonitorSmartphone, Shield, Zap } from 'lucide-react';
import { WhatsAppCTA } from './WhatsAppCTA';

export const metadata = {
    title: 'Desenvolvimento Web Personalizado | Setembro.net',
    description: 'Sites institucionais exclusivos, construídos com o poder do WordPress e a flexibilidade do Elementor Pro. Sua presença digital em alto nível.',
};

export default function CustomWebDevPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. Hero Section - "Presença Digital em Alto Nível" */}
            <section className="relative py-24 lg:py-32 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 -z-10" />
                <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
                    <span className="inline-block py-1 px-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500 uppercase tracking-wider">
                        Soluções B2B
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Desenvolvimento Web <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-300 dark:to-white">
                            Sua Presença Digital em Alto Nível
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Sites institucionais exclusivos, construídos com o poder do WordPress e a flexibilidade do Elementor Pro. Desenvolvidos por especialistas para projetar autoridade.
                    </p>
                </div>
            </section>

            {/* 2. Pilares */}
            <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Design & Performance */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-colors group">
                            <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-slate-700 dark:text-slate-300">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Design de Elite & Performance
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                Utilizamos WordPress com Elementor Pro e os melhores plugins premium do mercado para criar interfaces que não apenas impressionam visualmente, mas que carregam instantaneamente e convertem visitantes.
                            </p>
                        </div>

                        {/* Autonomia com Segurança */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-colors group">
                            <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-slate-700 dark:text-slate-300">
                                <MonitorSmartphone size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Autonomia com Segurança
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                Liberdade total para você gerenciar seus textos e imagens. Deixamos a interface pronta e intuitiva para que sua equipe edite o que precisar, sem o risco de quebrar a estrutura visual do site.
                            </p>
                        </div>

                        {/* Gestão Exclusiva */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 transition-colors group">
                            <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-slate-700 dark:text-slate-300">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Gestão Exclusiva
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                Nós cuidamos do que é crítico para que você não precise se preocupar. Atualizações de segurança, manutenção de plugins premium e integridade do sistema são feitas exclusivamente pela nossa equipe técnica.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Deep Dive - A Tecnologia por Trás */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900 z-10 relative">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                Ferramentas consolidadas. Arquitetura impecável.
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Seu site corporativo não pode ser um experimento. Trabalhamos exclusivamente com o que há de mais seguro e testado no mercado global de desenvolvimento corporativo.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center text-slate-700 dark:text-slate-300 mt-1">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Poder do WordPress</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">A plataforma responsável por mais de 43% da internet, oferecendo base sólida para SEO, estabilidade e expansão corporativa.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center text-slate-700 dark:text-slate-300 mt-1">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Flexibilidade Elementor Pro</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">Engenharia visual avançada para garantir um design único, pixels perfeitos e total responsividade (Mobile First).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex flex-shrink-0 items-center justify-center text-slate-700 dark:text-slate-300 mt-1">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Manutenção Profissional</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">Backup contínuo e atualizações de core feitas por engenheiros experientes, blindando seu patrimônio digital.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            {/* Visual representation of a clean code / design structure (no colors) */}
                            <div className="relative w-full max-w-md aspect-video md:aspect-square rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
                                <div className="h-10 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                                </div>
                                <div className="flex-1 p-6 flex flex-col gap-4">
                                    <div className="h-12 w-full bg-slate-100 dark:bg-slate-900 rounded-lg animate-pulse" />
                                    <div className="flex gap-4 flex-1">
                                        <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-lg animate-pulse" style={{ animationDelay: '150ms' }} />
                                        <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-lg animate-pulse" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Conversão (CTA WhatsApp) */}
            <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
                <div className="container relative z-20 mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Pronto para elevar o nível da sua marca?
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
                        Fale diretamente com nossos especialistas. Entenderemos seu negócio e proporemos um escopo corporativo perfeitamente dimensionado para o seu sucesso.
                    </p>

                    <WhatsAppCTA />
                </div>
            </section>
        </div>
    );
}
