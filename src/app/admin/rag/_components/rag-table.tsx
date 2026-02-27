"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { useState } from "react";
import { deleteRAGDocument } from "@/actions/rag-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface RagDoc {
    id: string;
    title: string;
    slug: string;
    source: string;
    post_id: string;
    chunkCount: number;
    last_updated: string;
}

export function RagTable({ documents }: { documents: RagDoc[] }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    async function handleDelete(doc: RagDoc) {
        if (!confirm(`Tem certeza que deseja apagar "${doc.title}" da memória da Ana? Isso não deleta o artigo original, apenas a base de busca da IA.`)) {
            return;
        }

        setIsDeleting(doc.id);
        const identifier = doc.post_id || doc.slug || doc.id;
        const type = doc.post_id ? 'post_id' : 'slug';

        try {
            const res = await deleteRAGDocument(identifier, type);
            if (res.success) {
                toast.success("Documento esquecido com sucesso!");
                router.refresh();
            } else {
                toast.error(res.message || "Erro ao apagar");
            }
        } catch (error) {
            toast.error("Erro interno ao deletar.");
        } finally {
            setIsDeleting(null);
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Título / Recurso</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Chunks de Memória</TableHead>
                    <TableHead>Última Sincronização</TableHead>
                    <TableHead className="text-right">Ações de Controle</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {documents && documents.length > 0 ? (
                    documents.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell className="font-medium max-w-[300px] truncate">{doc.title}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="capitalize">
                                    {doc.source}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                    <Database className="h-3 w-3" /> {doc.chunkCount} blocos lógicos
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {new Date(doc.last_updated).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDelete(doc)}
                                    disabled={isDeleting === doc.id}
                                >
                                    {isDeleting === doc.id ? "Esquecendo..." : "Esquecer"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                            Nenhum conhecimento extra foi injetado na memória da Ana ainda.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
