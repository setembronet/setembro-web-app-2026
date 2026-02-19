"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";

type Agent = {
    id: string;
    name: string;
    role: string;
    is_active: boolean;
    last_active: string;
    notion_sync_status?: "success" | "error" | "syncing";
    last_error?: string;
};

export default function AgentsPage() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [selectedError, setSelectedError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgents = async () => {
            const supabase = createClient();
            const { data } = await supabase.from("ai_agents").select("*").order("name");

            // Mocking Notion Sync Status for now since it's not in DB schema yet
            const mockedData = data?.map(agent => ({
                ...agent,
                notion_sync_status: Math.random() > 0.8 ? "error" : "success",
                last_error: "Tempo de conexão esgotado ao buscar páginas do Notion."
            }));

            if (mockedData) setAgents(mockedData as unknown as Agent[]);
        };
        fetchAgents();
    }, []);

    const toggleAgent = async (id: string, currentState: boolean) => {
        const supabase = createClient();
        const { error } = await supabase
            .from("ai_agents")
            .update({ is_active: !currentState })
            .eq("id", id);

        if (error) {
            toast.error("Falha ao atualizar status");
        } else {
            setAgents(agents.map(a => a.id === id ? { ...a, is_active: !currentState } : a));
            toast.success("Status do agente atualizado");
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Monitor de Agentes IA</h1>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome do Agente</TableHead>
                            <TableHead>Função</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Sincronização Notion</TableHead>
                            <TableHead>Última Atividade</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agents.map((agent) => (
                            <TableRow key={agent.id}>
                                <TableCell className="font-medium">{agent.name}</TableCell>
                                <TableCell>{agent.role}</TableCell>
                                <TableCell>
                                    <Badge variant={agent.is_active ? "default" : "secondary"}>
                                        {agent.is_active ? "Online" : "Pausado"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {agent.notion_sync_status === 'success' && (
                                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                            <CheckCircle2 className="w-3 h-3 mr-1" /> Sincronizado
                                        </Badge>
                                    )}
                                    {agent.notion_sync_status === 'error' && (
                                        <Badge
                                            variant="destructive"
                                            className="cursor-pointer hover:opacity-80"
                                            onClick={() => setSelectedError(`${agent.name}: ${agent.last_error}`)}
                                        >
                                            <AlertCircle className="w-3 h-3 mr-1" /> Erro
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {agent.last_active ? new Date(agent.last_active).toLocaleString() : "-"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Switch
                                        checked={agent.is_active}
                                        onCheckedChange={() => toggleAgent(agent.id, agent.is_active)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!selectedError} onOpenChange={(open) => !open && setSelectedError(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalhes do Erro de Sincronização</DialogTitle>
                        <DialogDescription>
                            Detalhes técnicos específicos da integração deste agente com o Notion.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-2 p-4 bg-muted rounded-md font-mono text-sm text-red-400">
                        {selectedError}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
