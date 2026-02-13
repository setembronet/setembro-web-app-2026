import { createClient } from "@/lib/supabase/server";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bot, CheckCircle, AlertCircle, Clock } from "lucide-react";

export default async function AgentsPage() {
    const supabase = await createClient();
    const { data: agents } = await supabase
        .from("ai_agents")
        .select("*")
        .order("name", { ascending: true });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "active": return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "error": return <AlertCircle className="h-4 w-4 text-red-500" />;
            default: return <Clock className="h-4 w-4 text-yellow-500" />;
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">AI Agents Status</h1>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Agent Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead>Capabilities</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agents && agents.length > 0 ? (
                            agents.map((agent) => (
                                <TableRow key={agent.id}>
                                    <TableCell>
                                        <Bot className="h-5 w-5 text-primary" />
                                    </TableCell>
                                    <TableCell className="font-medium">{agent.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(agent.status)}
                                            <span className="capitalize">{agent.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {agent.last_active ? new Date(agent.last_active).toLocaleString() : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {/* Capabilities placeholder */}
                                        <Badge variant="outline">Core</Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No agents found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
