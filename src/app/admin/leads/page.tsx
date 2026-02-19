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
import { Button } from "@/components/ui/button"; // Shadcn button
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"; // We need to install this: npx shadcn@latest add dialog
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MessageSquare, Eye } from "lucide-react";

type Lead = {
    id: string;
    created_at: string;
    user_name: string;
    user_email: string;
    interest_category: string;
    source_url: string;
    status: string;
    message: string;
    metadata: {
        source?: string;
        user_agent?: string;
        referrer?: string;
    };
};

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchLeads = async () => {
            const supabase = createClient();
            const { data } = await supabase
                .from("leads")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) setLeads(data as unknown as Lead[]);
        };
        fetchLeads();
    }, []);

    const handleViewDetails = (lead: Lead) => {
        setSelectedLead(lead);
        setIsDialogOpen(true);
    };

    const handleWhatsApp = (lead: Lead) => {
        // Construct message based on category
        const greeting = `Olá ${lead.user_name}, vi que tem interesse em ${lead.interest_category}. Sou da Setembro.net, como posso ajudar?`;
        // Assuming we had a phone number, but for now we don't. 
        // If we don't have a phone, we can't open a direct chat with specific number.
        // But the requirement says "Copy to WhatsApp". 
        // If we don't have phone, maybe we just copy the text?
        // Or assumes there is a phone field? (ContactForm doesn't have phone).
        // Let's assume user manually inputs phone or we just copy text.
        // "Adicione um botão 'Copiar para WhatsApp' que já abre o chat" implies opening `wa.me`.
        // Since we don't have the lead's phone, we can open a generic share link OR alert user.
        // Let's copy the text to clipboard for now as a fallback if no phone.
        navigator.clipboard.writeText(greeting);
        alert("Mensagem copiada! (Telefone não capturado no formulário atual)");
    };

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Interesse</TableHead>
                            <TableHead>Origem</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads && leads.length > 0 ? (
                            leads.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell className="font-medium">
                                        {format(new Date(lead.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                                    </TableCell>
                                    <TableCell>{lead.user_name}</TableCell>
                                    <TableCell>{lead.user_email}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{lead.interest_category || "Geral"}</Badge>
                                    </TableCell>
                                    <TableCell className="max-w-[150px] truncate" title={lead.source_url}>
                                        {lead.source_url ? new URL(lead.source_url).pathname : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={lead.status === 'new' ? 'default' : 'secondary'}>
                                            {lead.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="ghost" onClick={() => handleViewDetails(lead)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleWhatsApp(lead)}>
                                                <MessageSquare className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    Nenhum lead encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Lead Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Detalhes do Lead</DialogTitle>
                        <DialogDescription>
                            Informações completas e metadados de rastreamento (Ray-X).
                        </DialogDescription>
                    </DialogHeader>
                    {selectedLead && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Nome</label>
                                    <p>{selectedLead.user_name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <p>{selectedLead.user_email}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Mensagem</label>
                                <div className="mt-1 rounded-md bg-muted p-3 text-sm">
                                    {selectedLead.message}
                                </div>
                            </div>

                            {/* Ray-X Section */}
                            <div className="rounded-lg border p-4 bg-muted/50 space-y-3">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                    🔍 Raio-X do Cliente
                                </h4>
                                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                                    <div>
                                        <span className="text-muted-foreground block">User Agent</span>
                                        <span className="break-words">
                                            {selectedLead.metadata?.user_agent || "N/A"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block">Referrer</span>
                                        <span className="break-words">
                                            {selectedLead.metadata?.referrer || "Direto"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block">URL de Origem</span>
                                        <span className="break-words">{selectedLead.source_url}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block">ID</span>
                                        <span className="break-words">{selectedLead.id.slice(0, 8)}...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
