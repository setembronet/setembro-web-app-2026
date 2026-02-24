"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, TrendingUp, Users, Clock } from "lucide-react";
import Link from "next/link";

export function RoiCalculator() {
    const [teamSize, setTeamSize] = useState([5]);
    const [hoursPerWeek, setHoursPerWeek] = useState([20]);
    const [monthlySalary, setMonthlySalary] = useState([5000]); // Salário Bruto Mensal Médio

    // Cálculo de ROI B2B com Encargos Trabalhistas
    const ENCARGOS_MULTIPLIER = 1.8;
    const WORK_HOURS_PER_MONTH = 176;

    const realMonthlyCostPerPerson = monthlySalary[0] * ENCARGOS_MULTIPLIER;
    const hourlyCost = realMonthlyCostPerPerson / WORK_HOURS_PER_MONTH;

    const weeklyCost = teamSize[0] * hoursPerWeek[0] * hourlyCost;
    const annualCost = weeklyCost * 52;
    const monthlyWastedCost = annualCost / 12;
    const daysLostPerYear = (teamSize[0] * hoursPerWeek[0] * 52) / 8;

    const aiSavings = annualCost * 0.6; // 60% de tempo salvo

    const showHighROI = aiSavings >= 50000; // Gatilho LPO para Agente Ana

    return (
        <section className="py-20 bg-background relative overflow-hidden" id="roi-calculator">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
                        <Calculator className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Calculadora de ROI da Inteligência Artificial
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Descubra quanto tempo e dinheiro sua empresa está perdendo em tarefas repetitivas e veja o impacto da IA no seu fluxo de caixa.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Controles */}
                    <Card className="border-2 shadow-sm">
                        <CardHeader>
                            <CardTitle>Dados Atuais</CardTitle>
                            <CardDescription>Ajuste os valores para o cenário da sua equipe</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Users className="w-4 h-4 text-primary" /> Tamanho da Equipe
                                    </label>
                                    <span className="font-bold">{teamSize[0]} pessoas</span>
                                </div>
                                <Slider
                                    min={1} max={50} step={1}
                                    value={teamSize}
                                    onValueChange={setTeamSize}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary" /> Horas/semana em tarefas repetitivas (por pessoa)
                                    </label>
                                    <span className="font-bold">{hoursPerWeek[0]} horas</span>
                                </div>
                                <Slider
                                    min={5} max={40} step={1}
                                    value={hoursPerWeek}
                                    onValueChange={setHoursPerWeek}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-primary" /> Salário Bruto Mensal Médio (R$)
                                    </label>
                                    <span className="font-bold">R$ {monthlySalary[0].toLocaleString('pt-BR')}</span>
                                </div>
                                <Slider
                                    min={3000} max={20000} step={500}
                                    value={monthlySalary}
                                    onValueChange={setMonthlySalary}
                                />
                                <p className="text-xs text-muted-foreground italic">
                                    *Já calculamos ~80% de encargos e provisões sobre o salário bruto.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resultado */}
                    <Card className="bg-primary text-primary-foreground shadow-lg border-0 relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                        <CardHeader>
                            <CardTitle className="text-primary-foreground/90">Efeito Setembro.net</CardTitle>
                            <CardDescription className="text-primary-foreground/70">
                                Previsão de economia anual com 60% de automação.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 relative z-10">
                            <div>
                                <p className="text-sm text-primary-foreground/80 mb-1">Custo Anual Atual (Desperdiçado)</p>
                                <p className="text-2xl font-light">R$ {annualCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
                                <div className="mt-3 text-primary-foreground/90 text-sm bg-black/10 p-3 rounded-md border border-white/10">
                                    <p>Sua empresa está perdendo <strong>R$ {monthlyWastedCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} por mês</strong> agora.</p>
                                    <p className="mt-1">Isso equivale a <strong>{Math.round(daysLostPerYear).toLocaleString('pt-BR')} dias de trabalho</strong> jogados fora por ano.</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-primary-foreground/20">
                                <p className="text-sm font-medium text-primary-foreground mb-1">Economia Projetada c/ IA (Ano)</p>
                                <p className="text-5xl font-extrabold tracking-tighter text-white">
                                    R$ {aiSavings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                                </p>
                            </div>

                            {/* Gatilho LPO Dinâmico */}
                            {showHighROI && (
                                <div className="mt-6 p-4 bg-white text-primary rounded-lg font-medium shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-500">
                                    <p className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">👩‍💼</span> Alto potencial financeiro detectado!
                                    </p>
                                    <p className="text-sm font-normal text-muted-foreground mb-4">
                                        Sua empresa pode recuperar dezenas de milhares de reais contratando a <strong>Agente Ana (RH/Operações)</strong> imediatamente. Ela custará menos de 5% deste valor!
                                    </p>
                                    <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white" asChild>
                                        <Link href="?interest=Ana#contact">
                                            Recuperar meus R$ {aiSavings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} agora <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            )}

                            {!showHighROI && (
                                <div className="mt-6">
                                    <Button variant="secondary" className="w-full" asChild>
                                        <Link href="?interest=Consultoria#contact">
                                            Faça uma Consultoria Grátis
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
