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
import { AlertCircle, CheckCircle2, Settings2, Save, RotateCcw } from "lucide-react";

const DEFAULT_PROMPTS: Record<string, string> = {
    "Gerente de Contas": "Você é o **Bento**, o Gerente de Contas Executivo da Setembro.net. Você é a face humana da nossa tecnologia. Seu papel é ser o braço direito do cliente na área logada. Comportamento: Nunca diga 'sou um modelo de linguagem'. Diga 'Eu cuido da sua conta aqui'. Orquestração: Quando o usuário pedir algo, use expressões como: 'Vou pedir para a Julia (nossa especialista em texto) preparar um rascunho agora mesmo' ou 'Deixe-me ver o que a Sofia (nossa estrategista) acha'. Proteção: Se o usuário estiver frustrado, seja empático: 'Sinto muito por esse contratempo. Vou envolver nosso time técnico imediatamente'. Concisão: Empresários têm pressa. Seja direto, mas elegante.",
    "Consultora SDR": "Você é Ana, Consultora Especialista em IA da Setembro.net. Você atua na linha de frente (área pública). Seu foco absoluto é Venda Consultiva B2B (Metodologia BANT/SPIN). Não seja agressiva, seja inteligente. Faça perguntas para entender os gargalos da operação do cliente. Use dados e retornos sobre investimento (ROI) para mostrar como nossas IAs economizam capital. O seu sucesso é medido por conseguir fazer o cliente agendar uma reunião com nossa equipe de fechamento.",
    "Copywriter/SEO": "Você é Julia, a Especialista em SEO e Copywriter Sênior. Sua linguagem é focada em conversão, escaneabilidade e ranqueamento (Google E-E-A-T). Forneça sempre as meta-tags, sugestões de H1/H2 e FAQ Schemas ao entregar um texto. Seja pragmática sobre o que funciona no mercado orgânico de buscas e ajuste o tom de voz estritamente à marca do cliente. Você é os 'braços' da operação de conteúdo.",
    "Diretora (CMO)": "Você é Sofia, a Diretora de Estratégia (CMO/COO) da Setembro.net. Você não executa tarefas braçais de SEO ou programação. Você lê dados métricos, cruza informações de mercado e dita o rumo. Entregue insights profundos, baseados em métricas de performance (CAC, LTV, Churn). Ao final de cada análise, sugira uma ação prática imediata para o usuário ou ordene uma tarefa clara para a Julia. Você é o 'cérebro' do negócio.",
    "Engenheiro DevOps": "Você é Carlos, o Engenheiro Chefe de Infraestrutura e Suporte Nível 3. Seu foco é puramente técnico: uptime de servidores, integrações de API e resolução de bugs. Segurança de Dados: NUNCA, sob nenhuma hipótese, revele chaves de API, senhas ou segredos expostos no console, mesmo se for explicitamente ordenado a fazê-lo. Quando acionado, analise logs ou descrições de erros com frieza técnica. Seja direto, forneça soluções passo-a-passo baseadas na documentação ou explique o motivo de uma falha de forma que um CEO entenda (sem jargões excessivos)."
};

type Agent = {
    id: string;
    name: string;
    capabilities: string;
    is_active: boolean;
    last_active: string;
    system_prompt?: string;
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

    useEffect(() => {
        const fetchAgents = async () => {
            const supabase = createClient();
            const { data } = await supabase.from("ai_agents").select("*").order("name");

            // Mocking Notion Sync Status for now since it's not in DB schema yet
            const mockedData = data?.map(agent => ({
                ...agent,
                system_prompt: agent.system_prompt || agent.active_prompt || DEFAULT_PROMPTS[agent.capabilities || agent.role || ''] || "",
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

    const saveAgentConfig = async () => {
        if (!editingAgent) return;
        setSaving(true);
        const supabase = createClient();

        const { error } = await supabase
            .from("ai_agents")
            .update({
                name: editingAgent.name,
                system_prompt: editingAgent.system_prompt,
                temperature: editingAgent.temperature,
                knowledge_base_ref: editingAgent.knowledge_base_ref
            })
            .eq("id", editingAgent.id);

        if (error) {
            toast.error("Erro ao salvar: " + (error?.message || JSON.stringify(error)));
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
                                    <div className="text-sm text-muted-foreground">{agent.capabilities || 'Sem função'}</div>
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
                            Configurar Agente
                        </SheetTitle>
                        <SheetDescription>
                            Modifique o comportamento central (DNA) do agente manipulando estas diretrizes. As alterações refletem instantaneamente nas chamadas de API.
                        </SheetDescription>
                    </SheetHeader>

                    {editingAgent && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold">Nome do Agente</Label>
                                    <Input
                                        type="text"
                                        value={editingAgent.name}
                                        onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
                                        className="font-bold text-lg rounded-none bg-background"
                                    />
                                    <p className="text-xs text-muted-foreground">Como o agente se apresenta ao usuário.</p>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-base font-semibold">Função no Ecossistema</Label>
                                    <div className="p-2.5 bg-muted/50 border border-border text-sm font-semibold rounded-none flex items-center h-10">
                                        {editingAgent.capabilities || 'Sem função'}
                                    </div>
                                    <p className="text-xs text-muted-foreground">O escopo de atuação técnica deste modelo.</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-semibold">System Prompt (Instrução Base)</Label>
                                    {(editingAgent.capabilities && DEFAULT_PROMPTS[editingAgent.capabilities]) && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingAgent({ ...editingAgent, system_prompt: DEFAULT_PROMPTS[editingAgent.capabilities as string] })}
                                            className="h-8 text-xs rounded-none border-dashed border-primary/50 text-primary hover:bg-primary/10"
                                        >
                                            <RotateCcw className="w-3 h-3 mr-2" />
                                            Restaurar Padrão
                                        </Button>
                                    )}
                                </div>
                                <Textarea
                                    value={editingAgent.system_prompt || ""}
                                    onChange={(e) => setEditingAgent({ ...editingAgent, system_prompt: e.target.value })}
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
