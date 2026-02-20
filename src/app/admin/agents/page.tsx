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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Settings2, Save } from "lucide-react";

type Agent = {
    id: string;
    name: string;
    role: string;
    is_active: boolean;
    last_active: string;
    active_prompt?: string;
    temperature?: number;
    knowledge_base_ref?: string;
    notion_sync_status?: "success" | "error" | "syncing";
    last_error?: string;
};

export default function AgentsPage() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [selectedError, setSelectedError] = useState<string | null>(null);
    const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
    const [saving, setSaving] = useState(false);

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

    useEffect(() => {
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

    const saveAgentConfig = async () => {
        if (!editingAgent) return;
        setSaving(true);
        const supabase = createClient();

        const { error } = await supabase
            .from("ai_agents")
            .update({
                active_prompt: editingAgent.active_prompt,
                temperature: editingAgent.temperature,
                knowledge_base_ref: editingAgent.knowledge_base_ref
            })
            .eq("id", editingAgent.id);

        if (error) {
            toast.error("Erro ao salvar configurações do agente.");
        } else {
            toast.success("Configuração do Agente atualizada com sucesso!");
            setAgents(agents.map(a => a.id === editingAgent.id ? editingAgent : a));
            setEditingAgent(null);
        }
        setSaving(false);
    };

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Monitor & DNA de Agentes IA</h1>
            <p className="text-muted-foreground mb-6">Controle as diretrizes, prompts de sistema e base de conhecimento dos agentes ativos.</p>

            <div className="rounded-none border-2 bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Nome e Função</TableHead>
                            <TableHead>Temperatura</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agents.map((agent) => (
                            <TableRow key={agent.id}>
                                <TableCell>
                                    <div className="font-bold text-base">{agent.name}</div>
                                    <div className="text-sm text-muted-foreground">{agent.role}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-mono">
                                        {agent.temperature ?? 0.7}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            checked={agent.is_active}
                                            onCheckedChange={() => toggleAgent(agent.id, agent.is_active)}
                                        />
                                        <Badge variant={agent.is_active ? "default" : "secondary"} className="rounded-none">
                                            {agent.is_active ? "Online" : "Pausado"}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        className="rounded-none"
                                        size="sm"
                                        onClick={() => setEditingAgent({ ...agent })}
                                    >
                                        <Settings2 className="w-4 h-4 mr-2" />
                                        DNA Config
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!selectedError} onOpenChange={(open) => !open && setSelectedError(null)}>
                <DialogContent className="rounded-none">
                    <DialogHeader>
                        <DialogTitle>Detalhes do Erro</DialogTitle>
                        <DialogDescription>
                            Detalhes técnicos específicos da integração deste agente.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-2 p-4 bg-muted font-mono text-sm text-red-400">
                        {selectedError}
                    </div>
                </DialogContent>
            </Dialog>

            <Sheet open={!!editingAgent} onOpenChange={(open) => !open && setEditingAgent(null)}>
                <SheetContent className="sm:max-w-2xl overflow-y-auto rounded-l-2xl border-l-2">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-2xl flex items-center gap-2">
                            <Settings2 className="w-6 h-6 text-primary" />
                            Configurar Agente: {editingAgent?.name}
                        </SheetTitle>
                        <SheetDescription>
                            Modifique o comportamento central (DNA) do agente manipulando estas diretrizes. As alterações refletem instantaneamente nas chamadas de API.
                        </SheetDescription>
                    </SheetHeader>

                    {editingAgent && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-base font-semibold">System Prompt (Instrução Base)</Label>
                                <Textarea
                                    value={editingAgent.active_prompt || ""}
                                    onChange={(e) => setEditingAgent({ ...editingAgent, active_prompt: e.target.value })}
                                    className="min-h-[250px] font-mono text-sm bg-muted/30 focus-visible:ring-primary rounded-none"
                                    placeholder="Ex: Você é um especialista em vendas. Responda de forma concisa e persuasiva..."
                                />
                                <p className="text-xs text-muted-foreground">Define o papel, tom de voz e restrições do modelo.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold">Temperatura</Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={editingAgent.temperature ?? 0.7}
                                        onChange={(e) => setEditingAgent({ ...editingAgent, temperature: parseFloat(e.target.value) })}
                                        className="font-mono rounded-none"
                                    />
                                    <p className="text-xs text-muted-foreground">0 = Analítico/Focado, 1+ = Criativo/Dinâmico.</p>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-base font-semibold">Knowledge Base (URL / ID)</Label>
                                    <Input
                                        type="text"
                                        value={editingAgent.knowledge_base_ref || ""}
                                        onChange={(e) => setEditingAgent({ ...editingAgent, knowledge_base_ref: e.target.value })}
                                        placeholder="ex: bucket://docs-tecnicos"
                                        className="font-mono rounded-none"
                                    />
                                    <p className="text-xs text-muted-foreground">Referência para RAG (Retrieval-Augmented Generation).</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t flex justify-end gap-3 mt-8">
                                <Button variant="outline" className="rounded-none" onClick={() => setEditingAgent(null)}>Cancelar</Button>
                                <Button className="rounded-none bg-primary hover:bg-primary/90" onClick={saveAgentConfig} disabled={saving}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {saving ? "Salvando..." : "Salvar DNA"}
                                </Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
