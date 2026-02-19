"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Bot, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Types
type AgentStatus = "active" | "inactive" | "error" | "syncing";
type Agent = {
    id: string;
    name: string;
    status: AgentStatus;
    last_active: string;
};

// Mock data for the chart (since we might not have enough real data yet)
// In a real scenario, we'd fetch this from via an aggregation query
const chartData = [
    { name: "Mon", leads: 4 },
    { name: "Tue", leads: 3 },
    { name: "Wed", leads: 2 },
    { name: "Thu", leads: 6 },
    { name: "Fri", leads: 8 },
    { name: "Sat", leads: 9 },
    { name: "Sun", leads: 5 },
];

export default function DashboardPage() {
    const [leadsCount, setLeadsCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [categoryGrowth, setCategoryGrowth] = useState({ name: "Automação", growth: "+12%" }); // Mocked for now

    useEffect(() => {
        const fetchStats = async () => {
            const supabase = createClient();

            // Fetch counts
            const { count: lCount } = await supabase.from("leads").select("*", { count: "exact", head: true });
            const { count: pCount } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
            const { data: aData } = await supabase.from("ai_agents").select("*");

            setLeadsCount(lCount || 0);
            setPostsCount(pCount || 0);
            if (aData) setAgents(aData as unknown as Agent[]);
        };

        fetchStats();
    }, []);

    const stats = [
        {
            title: "Total de Leads",
            value: leadsCount,
            change: "+20.1% vs mês anterior",
            icon: Users,
        },
        {
            title: "Posts Ativos",
            value: postsCount,
            change: "+2 desde semana passada",
            icon: FileText,
        },
        {
            title: "Agentes Ativos",
            value: agents.filter(a => a.status === 'active').length,
            change: `${agents.length} Sistemas Totais`,
            icon: Bot,
        },
        {
            title: "Crescimento Categoria",
            value: categoryGrowth.name,
            change: categoryGrowth.growth,
            icon: Activity,
        },
    ];

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Sales Thermometer Chart */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Termômetro de Vendas (Leads/Semana)</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <Area type="monotone" dataKey="leads" stroke="#8884d8" fillOpacity={1} fill="url(#colorLeads)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Agent Status Monitor */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Monitor de Agentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {agents.length > 0 ? (
                                agents.map(agent => (
                                    <div key={agent.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-2.5 w-2.5 rounded-full ${agent.status === 'active' ? 'bg-green-500' :
                                                agent.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                                                }`} />
                                            <div>
                                                <p className="text-sm font-medium leading-none">{agent.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {agent.last_active ? new Date(agent.last_active).toLocaleTimeString() : 'Offline'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-xs font-medium">
                                            {agent.status === 'error' ? (
                                                <span className="text-red-500 cursor-pointer hover:underline">Ver Erro</span>
                                            ) : (
                                                <span className="text-green-600">Sincronizado</span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center">Carregando agentes...</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
