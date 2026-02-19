"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TestimonialFormProps {
    initialData?: {
        id: string;
        name: string;
        role: string | null;
        content: string;
        image_url: string | null;
        link: string | null;
        order: number;
    };
}

export function TestimonialForm({ initialData }: TestimonialFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        role: initialData?.role || "",
        content: initialData?.content || "",
        image_url: initialData?.image_url || "",
        link: initialData?.link || "",
        order: initialData?.order || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "order" ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSave = {
                ...formData,
                role: formData.role || null, // Convert empty strings to null for optional fields
                image_url: formData.image_url || null,
                link: formData.link || null,
            };

            let error;

            if (initialData) {
                // Update
                const { error: updateError } = await supabase
                    .from("testimonials")
                    .update(dataToSave)
                    .eq("id", initialData.id);
                error = updateError;
            } else {
                // Create
                const { error: insertError } = await supabase
                    .from("testimonials")
                    .insert([dataToSave]);
                error = insertError;
            }

            if (error) {
                toast.error("Erro ao salvar: " + error.message);
            } else {
                toast.success(initialData ? "Depoimento atualizado!" : "Depoimento criado!");
                router.push("/admin/testimonials");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
            toast.error("Erro inesperado ao salvar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/testimonials">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">
                    {initialData ? "Editar Depoimento" : "Novo Depoimento"}
                </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Informações do Depoimento</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome do Cliente *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Ex: Ana Silva"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Cargo / Empresa</Label>
                                <Input
                                    id="role"
                                    name="role"
                                    placeholder="Ex: CEO da TechSolution"
                                    value={formData.role}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Depoimento *</Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="O que o cliente disse..."
                                className="min-h-[100px]"
                                value={formData.content}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="image_url">URL da Foto (Avatar)</Label>
                                <Input
                                    id="image_url"
                                    name="image_url"
                                    placeholder="https://..."
                                    value={formData.image_url}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="link">Link de Destino (Site do Cliente)</Label>
                                <Input
                                    id="link"
                                    name="link"
                                    placeholder="https://..."
                                    value={formData.link}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Ordem de Exibição</Label>
                            <Input
                                id="order"
                                name="order"
                                type="number"
                                value={formData.order}
                                onChange={handleChange}
                                className="w-24"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Salvar Depoimento
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
