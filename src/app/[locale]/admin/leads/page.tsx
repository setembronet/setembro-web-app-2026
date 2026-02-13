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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function LeadsPage() {
    const supabase = await createClient();
    const { data: leads } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

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
                                    <TableCell className="max-w-[200px] truncate" title={lead.source_url}>
                                        {lead.source_url ? new URL(lead.source_url).pathname : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={lead.status === 'new' ? 'default' : 'secondary'}>
                                            {lead.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    Nenhum lead encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
