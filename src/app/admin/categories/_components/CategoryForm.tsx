
'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { createCategory, updateCategory } from "../actions";
import { useEffect } from "react";
import { toast } from "sonner";

type CategoryFormProps = {
    category?: {
        id: string;
        name: string;
        slug: string;
        description?: string;
        image?: string;
    };
};

const initialState = {
    message: "",
    errors: {} as Record<string, string[]>,
};

export function CategoryForm({ category }: CategoryFormProps) {
    const action = category ? updateCategory.bind(null, category.id) : createCategory;
    const [state, formAction] = useActionState(action, initialState);

    useEffect(() => {
        if (state.message && !state.errors) {
            // Success handled by redirect in action, but we can toast
            // Actually redirect prevents this toast usually, unless we use sessions.
            // But error messages we show.
            if (state.message.includes("Erro")) {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-6 max-w-xl">
            <div className="space-y-2">
                <Label htmlFor="name">Nome da Categoria</Label>
                <Input
                    id="name"
                    name="name"
                    defaultValue={category?.name}
                    placeholder="Ex: Desenvolvimento Web"
                    required
                />
                {state.errors?.name && (
                    <p className="text-sm text-red-500">{state.errors.name.join(", ")}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                    id="slug"
                    name="slug"
                    defaultValue={category?.slug}
                    placeholder="Ex: desenvolvimento-web"
                    required
                    pattern="^[a-z0-9-]+$"
                    title="Apenas letras minúsculas, números e hífens"
                />
                {state.errors?.slug && (
                    <p className="text-sm text-red-500">{state.errors.slug.join(", ")}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Descrição (Opcional)</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={category?.description}
                    placeholder="Descrição para SEO e listagens"
                    rows={4}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">URL da Imagem da Categoria</Label>
                <Input
                    id="image"
                    name="image"
                    defaultValue={category?.image}
                    placeholder="https://exemplo.com/imagem.png"
                />
                {state.errors?.image && (
                    <p className="text-sm text-red-500">{state.errors.image.join(", ")}</p>
                )}
                {category?.image && (
                    <div className="mt-2 text-sm text-muted-foreground">
                        <p className="mb-2">Preview atual:</p>
                        <div className="aspect-video w-full max-w-sm rounded-md overflow-hidden bg-muted relative border">
                            <img
                                src={category.image}
                                alt="Preview"
                                className="object-cover w-full h-full"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-4">
                <Button type="submit">
                    {category ? "Salvar Alterações" : "Criar Categoria"}
                </Button>
                <Button variant="outline" type="button" onClick={() => window.history.back()}>
                    Cancelar
                </Button>
            </div>

            {state.message && state.message.includes("Erro") && (
                <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {state.message}
                </div>
            )}
        </form>
    );
}
