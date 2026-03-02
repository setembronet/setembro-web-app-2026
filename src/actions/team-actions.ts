"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function inviteUser(formData: FormData) {
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    if (!email || !role) {
        return { error: "E-mail e Perfil são obrigatórios." };
    }

    const supabase = await createClient();

    // Check if the current user is an admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.user_metadata?.role !== 'admin') {
        return { error: "Apenas administradores podem convidar usuários." };
    }

    try {
        const supabaseAdmin = createAdminClient();

        // The redirectTo URL instructs Supabase where to redirect after clicking the invite link.
        // We append ?next=/auth/update-password so the callback route sends them to set a password.
        const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/auth/update-password`;

        const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
            data: { role },
            redirectTo,
        });

        if (error) {
            console.error("Invite error:", error);
            return { error: error.message };
        }

        return { success: true, data };
    } catch (err: any) {
        console.error("Unexpected error inviting user:", err);
        return { error: err.message || "Ocorreu um erro ao convidar o usuário." };
    }
}

export async function listTeamMembers() {
    const supabase = await createClient();

    // Check if the current user is an admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.user_metadata?.role !== 'admin') {
        return { error: "Apenas administradores podem gerenciar a equipe." };
    }

    try {
        const supabaseAdmin = createAdminClient();

        // Use the listUsers admin API. (It might return up to 50 users natively, can paginate if needed).
        const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

        if (error) {
            console.error("List users error:", error);
            return { error: error.message };
        }

        return { success: true, users };
    } catch (err: any) {
        console.error("Unexpected error listing users:", err);
        return { error: err.message || "Ocorreu um erro ao buscar a equipe." };
    }
}

export async function removeUser(userId: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.user_metadata?.role !== 'admin') {
        return { error: "Acesso negado." };
    }

    // Avoid deleting the current admin user itself
    if (user.id === userId) {
        return { error: "Você não pode excluir sua própria conta." };
    }

    try {
        const supabaseAdmin = createAdminClient();
        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        return { error: err.message || "Erro ao excluir." };
    }
}

export async function changeUserRole(userId: string, newRole: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.user_metadata?.role !== 'admin') {
        return { error: "Acesso negado." };
    }

    if (user.id === userId) {
        return { error: "Você não pode alterar o próprio perfil." };
    }

    try {
        const supabaseAdmin = createAdminClient();
        const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
            user_metadata: { role: newRole }
        });

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        return { error: err.message || "Erro ao alterar função." };
    }
}

export async function changeUserStatus(userId: string, newStatus: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.user_metadata?.role !== 'admin') {
        return { error: "Acesso negado." };
    }

    if (user.id === userId) {
        return { error: "Você não pode alterar o próprio status." };
    }

    try {
        const supabaseAdmin = createAdminClient();
        const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
            user_metadata: { status: newStatus }
        });

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        return { error: err.message || "Erro ao alterar status." };
    }
}
