import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Activity,
    MousePointerClick,
    Timer,
    Smartphone,
    Monitor,
    TrendingUp,
    AlertCircle,
    UserCheck,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PostAnalyticsDashboard({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Server-side fetch
    const supabase = await createClient();

    // Fetch Post info
    const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .select('title, slug')
        .eq('id', id)
        .single();

    if (postError || !post) {
        return notFound();
    }

    // Fetch Analytics using aggregates to build the dashboard
    // We fetch all records for this post to do calculations in memory (standard approach for small-medium datasets)
    const { data: analytics, error: analyticsError } = await supabase
        .from('post_analytics')
        .select('*')
        .eq('post_id', id);

    const stats = analytics || [];

    // --- Metric Calculations ---
    const totalViews = stats.length;
    const desktopViews = stats.filter(s => s.device_type === 'desktop').length;
    const mobileViews = stats.filter(s => s.device_type === 'mobile').length;

    // Engagement
    const avgEngagementTime = totalViews > 0
        ? Math.round(stats.reduce((acc, curr) => acc + (curr.engagement_time_seconds || 0), 0) / totalViews)
        : 0;

    // Scroll depth
    const avgScrollDepth = totalViews > 0
        ? Math.round(stats.reduce((acc, curr) => acc + (curr.max_scroll_depth || 0), 0) / totalViews)
        : 0;

    const deepReaders = stats.filter(s => (s.max_scroll_depth || 0) > 75).length;
    const deepReadersPercentage = totalViews > 0 ? Math.round((deepReaders / totalViews) * 100) : 0;

    // Conversions
    const convertedUsers = stats.filter(s => s.converted).length;
    const conversionRate = totalViews > 0 ? ((convertedUsers / totalViews) * 100).toFixed(1) : "0.0";

    // UTM Sources Aggregation
    const sources = stats.reduce((acc: Record<string, number>, curr) => {
        const source = curr.utm_source || curr.referrer_url || 'Direct';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
    }, {});

    const topSources = Object.entries(sources)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // AI Agents Triggers
    const needsJuliaAttention = avgEngagementTime > 0 && avgEngagementTime < 45;
    const needsBentoAttention = deepReadersPercentage > 30 && convertedUsers === 0;

    // "Health Score" calculation (0-10) based on Web Vitals, Retention, and Scroll
    // Simplified formula focusing on engagement and scroll
    let healthScore = 5;
    if (totalViews > 0) {
        healthScore = Math.min(10, ((avgScrollDepth / 100) * 5) + ((Math.min(avgEngagementTime, 120) / 120) * 5));
        // Bonus for conversions
        if (convertedUsers > 0) healthScore = Math.min(10, healthScore + 1);
    } else {
        healthScore = 0; // No data yet
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/posts"><ArrowLeft className="w-4 h-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        Nexus360 Analytics
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                        Post: <span className="font-medium text-foreground">{post.title}</span>
                    </p>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Visitas Únicas</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalViews}</div>
                        <p className="text-xs text-muted-foreground">Fingerprints distintos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tempo Médio Engajado</CardTitle>
                        <Timer className="h-4 w-4 text-slate-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgEngagementTime}s</div>
                        <p className="text-xs text-muted-foreground">Tempo ativo na aba</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Profundidade de Scroll (Média)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgScrollDepth}%</div>
                        <p className="text-xs text-muted-foreground">{deepReadersPercentage}% passaram dos 75%</p>
                    </CardContent>
                </Card>
                <Card className={healthScore >= 7 ? "bg-blue-50 dark:bg-blue-900/10" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Health Score do Post</CardTitle>
                        <Activity className={`h-4 w-4 ${healthScore >= 7 ? 'text-blue-600' : 'text-slate-400'}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${healthScore >= 7 ? 'text-blue-700 dark:text-blue-400' : ''}`}>
                            {healthScore.toFixed(1)} / 10
                        </div>
                        <p className="text-xs text-muted-foreground">Baseado em retenção temporal e espacial</p>
                    </CardContent>
                </Card>
            </div>

            {/* AI Agents Insight Loop */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className={`border-l-4 ${needsJuliaAttention ? 'border-l-amber-500' : 'border-l-emerald-500'}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            Alerta Julia (SEO & Copy)
                        </CardTitle>
                        <CardDescription>Análise de Retenção Inicial</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {needsJuliaAttention ? (
                            <div className="flex items-start gap-3 text-amber-900 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p><strong>Atenção Requerida:</strong> O tempo médio de engajamento está muito baixo ({avgEngagementTime}s). Os leitores estão abandonando o artigo logo no início. <strong>Ação Recomendada para Julia:</strong> Gerar nova Headline e reescrever a introdução focando na intenção primária de busca.</p>
                            </div>
                        ) : (
                            <div className="flex items-start gap-3 text-emerald-700 dark:text-emerald-400 text-sm">
                                <UserCheck className="w-5 h-5 shrink-0" />
                                <p>Excelente! A introdução atual está conseguindo segurar a atenção dos leitores (Média: {avgEngagementTime}s).</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className={`border-l-4 ${needsBentoAttention ? 'border-l-rose-500' : 'border-l-emerald-500'}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <MessageCircle className="w-5 h-5 text-rose-500" />
                            Alerta Bento (SDR / Conversão)
                        </CardTitle>
                        <CardDescription>Análise de Fundo de Funil</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {needsBentoAttention ? (
                            <div className="flex items-start gap-3 text-rose-900 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-3 rounded-md text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p><strong>Lead Morno Detectado:</strong> Temos {deepReadersPercentage}% da audiência ({deepReaders} usuários) rolando até o final do artigo, mas <strong>nenhuma</strong> conversão com a Ana. <strong>Ação Recomendada para Bento:</strong> Ajustar o Call To Action e o incentivo de chat no final deste post específico.</p>
                            </div>
                        ) : (
                            <div className="flex items-start gap-3 text-emerald-700 dark:text-emerald-400 text-sm">
                                <UserCheck className="w-5 h-5 shrink-0" />
                                <p>Taxa de conversão atual de {conversionRate}%. Funil saudável dadas as métricas de leitura profunda.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Deeper Analytics */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Dispositivos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-slate-500" /> Mobile</div>
                                <div className="font-bold">{mobileViews} ({totalViews ? Math.round((mobileViews / totalViews) * 100) : 0}%)</div>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
                                <div className="bg-slate-500 h-2.5 rounded-full" style={{ width: `${totalViews ? Math.round((mobileViews / totalViews) * 100) : 0}%` }}></div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center gap-2"><Monitor className="w-4 h-4 text-blue-500" /> Desktop</div>
                                <div className="font-bold">{desktopViews} ({totalViews ? Math.round((desktopViews / totalViews) * 100) : 0}%)</div>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${totalViews ? Math.round((desktopViews / totalViews) * 100) : 0}%` }}></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Origem do Tráfego (Top 5+ UTMs)</CardTitle>
                        <CardDescription>Canais que atraíram os leitores</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topSources.length > 0 ? topSources.map(([source, count], idx) => (
                                <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                                    <span className="text-sm font-medium truncate max-w-[200px]" title={source}>{source}</span>
                                    <span className="text-sm font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{count} visitas</span>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground text-center py-4">Nenhum dado de origem registrado.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Emulate Lucide icons that were unimported to prevent compile errors. 
function Sparkles(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg> }
function MessageCircle(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg> }
