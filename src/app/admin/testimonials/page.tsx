"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
    id: string;
    name: string;
    role: string | null;
    content: string;
    image_url: string | null;
    link: string | null;
    order: number;
    created_at: string;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchTestimonials = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("testimonials")
            .select("*")
            .order("order", { ascending: true })
            .order("created_at", { ascending: false });

        if (error) {
            toast.error("Erro ao carregar depoimentos: " + error.message);
        } else {
            setTestimonials(data || []);
        }
        setLoading(false);
    }, [supabase]);

    useEffect(() => {
        fetchTestimonials();
    }, [fetchTestimonials]);

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este depoimento?")) return;

        const { error } = await supabase.from("testimonials").delete().eq("id", id);

        if (error) {
            toast.error("Erro ao excluir: " + error.message);
        } else {
            toast.success("Depoimento excluído com sucesso!");
            fetchTestimonials(); // Refresh list
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Depoimentos</h1>
                    <p className="text-muted-foreground">
                        Gerencie os depoimentos exibidos na página inicial.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/testimonials/new">
                        <Plus className="mr-2 h-4 w-4" /> Novo Depoimento
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Cargo/Empresa</TableHead>
                            <TableHead className="hidden md:table-cell">Conteúdo</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10">
                                    Carregando...
                                </TableCell>
                            </TableRow>
                        ) : testimonials.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                    Nenhum depoimento encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            testimonials.map((testimonial) => (
                                <TableRow key={testimonial.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            {testimonial.image_url && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={testimonial.image_url}
                                                    alt={testimonial.name}
                                                    className="h-8 w-8 rounded-full object-cover"
                                                />
                                            )}
                                            {testimonial.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{testimonial.role || "-"}</TableCell>
                                    <TableCell className="hidden md:table-cell max-w-md truncate">
                                        {testimonial.content}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {testimonial.link && (
                                                <Link href={testimonial.link} target="_blank">
                                                    <Button variant="ghost" size="icon" title="Ver Link">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                            <Link href={`/admin/testimonials/${testimonial.id}`}>
                                                <Button variant="ghost" size="icon" title="Editar">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                title="Excluir"
                                                onClick={() => handleDelete(testimonial.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
