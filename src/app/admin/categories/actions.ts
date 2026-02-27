
'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CategorySchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    slug: z.string().min(1, "Slug é obrigatório").regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
    description: z.string().optional(),
    image: z.string().url({ message: "URL inválida" }).optional().or(z.literal("")),
});

export async function createCategory(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const validatedFields = CategorySchema.safeParse({
        name: formData.get("name"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        image: formData.get("image"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Erro nos campos. Verifique o formulário.",
        };
    }

    const { name, slug, description, image } = validatedFields.data;

    try {
        const { error } = await supabase
            .from("categories")
            .insert({ name, slug, description, image });

        if (error) {
            if (error.code === '23505') { // Unique violation for slug
                return { message: "Este slug já está sendo usado." };
            }
            return { message: "Erro ao criar categoria: " + error.message };
        }
    } catch (error) {
        return { message: "Erro inesperado." };
    }

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
}

export async function updateCategory(id: string, prevState: any, formData: FormData) {
    const supabase = await createClient();

    const validatedFields = CategorySchema.safeParse({
        name: formData.get("name"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        image: formData.get("image"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Erro nos campos. Verifique o formulário.",
        };
    }

    const { name, slug, description, image } = validatedFields.data;

    try {
        const { error } = await supabase
            .from("categories")
            .update({ name, slug, description, image, updated_at: new Date().toISOString() })
            .eq("id", id);

        if (error) {
            if (error.code === '23505') { // Unique violation for slug
                return { message: "Este slug já está sendo usado." };
            }
            return { message: "Erro ao atualizar categoria: " + error.message };
        }
    } catch (error) {
        return { message: "Erro inesperado." };
    }

    revalidatePath("/admin/categories");
    revalidatePath(`/admin/categories/${id}`);
    redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from("categories")
            .delete()
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin/categories");
        return { message: "Categoria removida com sucesso." };
    } catch (error) {
        return { message: "Erro ao remover categoria. Verifique se existem posts vinculados." };
    }
}
