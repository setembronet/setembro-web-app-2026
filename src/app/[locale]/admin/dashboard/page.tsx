import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Bot, Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient();

    const [
        { count: leadsCount },
        { count: postsCount },
        { count: agentsCount }
    ] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("ai_agents").select("*", { count: "exact", head: true }).eq("is_active", true)
    ]);

    const stats = [
        {
            title: "Total Leads",
            value: leadsCount || 0,
            change: "All time",
            icon: Users,
        },
        {
            title: "Active Posts",
            value: postsCount || 0,
            change: "Published content",
            icon: FileText,
        },
        {
            title: "Active Agents",
            value: agentsCount || 0,
            change: "Systems online",
            icon: Bot,
        },
        {
            title: "System Status",
            value: "100%",
            change: "Operational",
            icon: Activity,
        },
    ];

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
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
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] w-full flex items-center justify-center text-muted-foreground">
                            Activity Chart Placeholder
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <p className="text-sm text-muted-foreground text-center py-4">
                                Real-time activity feed coming soon.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
