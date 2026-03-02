"use client";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { changeUserRole } from "@/actions/team-actions";

export function UpdateRoleSelect({ userId, initialRole }: { userId: string, initialRole: string }) {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(initialRole);

    const handleRoleChange = async (newRole: string) => {
        setLoading(true);
        const res = await changeUserRole(userId, newRole);
        if (res.error) {
            toast.error(res.error);
            setRole(initialRole); // revert visual state on error
        } else {
            setRole(newRole);
            toast.success("Perfil atualizado com sucesso!");
        }
        setLoading(false);
    };

    return (
        <Select
            value={role}
            onValueChange={handleRoleChange}
            disabled={loading}
        >
            <SelectTrigger className="w-[150px] h-8 text-xs">
                <SelectValue placeholder="Selecione um perfil" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
            </SelectContent>
        </Select>
    );
}
