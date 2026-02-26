import { Zap, Mail, HardDrive, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { InteractiveCTA } from './InteractiveCTA';

export const metadata = {
    title: 'Hospedagem Gerenciada | Setembro.net',
    description: 'Sua infraestrutura de crescimento. Hospedagem gerenciada com Inteligência Artificial para não se preocupar com a parte técnica.',
};

export default function HostingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white dark:from-slate-900 dark:to-slate-950 -z-10" />
                <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        Infraestrutura de Crescimento
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Hospedagem Gerenciada <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            com Inteligência
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Esqueça a complexidade técnica. Na Setembro.net, nós cuidamos do motor para que você foque apenas na direção do seu negócio.
                    </p>
                </div>
            </section>

            {/* 2. Grid de Benefícios & O Que Importa */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                            O que realmente importa para o seu sucesso
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            No mercado comum, vendem-se números (CPU, RAM, Inodes). Aqui, entregamos disponibilidade, velocidade e paz de espírito.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Performance */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Performance que Converte
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                Um site que demora a carregar é um site que perde clientes. Nossa infraestrutura é otimizada para entregar velocidade máxima, garantindo que seu conteúdo apareça instantaneamente. O Google adora, e seu cliente também.
                            </p>
                        </div>

                        {/* Emails */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                            <div className="w-14 h-14 bg-cyan-100 dark:bg-cyan-900/40 rounded-2xl flex items-center justify-center mb-6 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                                <Mail size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Comunicação Profissional
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                Dê credibilidade à sua marca com e-mails personalizados. Crie contas @suaempresa sem se preocupar com limites apertados. Uma comunicação segura, profissional e centralizada, acessível de qualquer lugar.
                            </p>
                        </div>

                        {/* Espaço */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow group">
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                                <HardDrive size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Espaço que Escala
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                Chega de alertas de "disco cheio". Monitoramos o seu crescimento e dimensionamos o seu espaço de forma proativa. Liberdade para expandir seus arquivos sem interrupções.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Segurança Blindada */}
            <section className="py-24 bg-slate-900 dark:bg-slate-950 text-white border-y border-slate-800">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-blue-300 text-sm font-semibold mb-6">
                                <ShieldCheck size={16} /> Segurança de Ponta
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Sua tranquilidade é nossa rotina
                            </h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                Os dados da sua empresa são o seu maior patrimônio. Por isso, não deixamos nada ao acaso.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-900/50 flex flex-shrink-0 items-center justify-center text-blue-400 mt-1">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Backup Diário Automático</h4>
                                        <p className="text-slate-400 text-sm">Executamos cópias completas de segurança todos os dias, de forma invisível para não afetar o desempenho.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-900/50 flex flex-shrink-0 items-center justify-center text-blue-400 mt-1">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Proteção Total</h4>
                                        <p className="text-slate-400 text-sm">Seus dados protegidos contra falhas, erros humanos ou ataques cibernéticos imprevistos.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-900/50 flex flex-shrink-0 items-center justify-center text-blue-400 mt-1">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Recuperação Ágil</h4>
                                        <p className="text-slate-400 text-sm">Em caso de necessidade, restauramos sua operação em tempo recorde com 1 clique.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            {/* Visual representation of servers/security */}
                            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-slate-800 border border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center p-8">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent" />
                                <div className="space-y-4 w-full relative z-10">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-16 w-full rounded-xl bg-slate-900 border border-slate-700 flex items-center px-6 gap-4">
                                            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
                                            <div className="h-2 w-1/3 bg-slate-700 rounded-full" />
                                            <div className="ml-auto flex gap-2">
                                                <div className="h-2 w-8 bg-slate-800 rounded-full" />
                                                <div className="h-2 w-8 bg-slate-800 rounded-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Curadoria */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
                        Por que a Setembro.net é diferente?
                    </h2>
                    <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-justify md:text-center">
                        <p>
                            Nós não acreditamos em planos engessados. Nossa curadoria seleciona a dedo a melhor infraestrutura entre nossos parceiros globais para garantir que o seu projeto tenha exatamente o que precisa — nem mais, nem menos.
                        </p>
                        <p>
                            Como especialistas em infraestrutura, analisamos o DNA do seu projeto e decidimos em qual dos nossos centros de dados de alta performance ele rodará melhor.
                        </p>
                        <p>
                            Nós monitoramos o avanço do seu consumo e ajustamos os recursos nos bastidores. Se o seu tráfego explodir hoje, nossa equipe (e nossos agentes de IA) já estará trabalhando na escalabilidade antes mesmo de você perceber a necessidade.
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. CTA Interativo - Ana */}
            <section className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.03] dark:opacity-[0.02]" />

                <div className="container relative z-10 mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        Deixe a inteligência dimensionar o seu sucesso
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
                        Não sabe qual o tamanho ideal para o seu momento atual? Nossa concierge Ana está pronta para te ajudar. Ela entende o porte da sua empresa e sugere a configuração ideal em segundos.
                    </p>

                    <InteractiveCTA />

                    <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
                            <ShieldCheck size={32} className="text-slate-400 mb-4" />
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">O Selo de Qualidade Setembro.net</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Hospedar com a gente significa ter um suporte diferenciado que entende de tecnologia para que você não precise entender. É tecnologia a serviço da sua estratégia.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
