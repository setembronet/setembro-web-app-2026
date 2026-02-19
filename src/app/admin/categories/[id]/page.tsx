
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { CategoryForm } from "../_components/CategoryForm";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: category } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

    if (!category) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Editar Categoria</h1>
                <p className="text-muted-foreground">Atualize as informações da categoria.</p>
            </div>
            <div className="border p-6 rounded-md bg-white dark:bg-card">
                <CategoryForm category={category} />
            </div>
        </div>
    );
}
