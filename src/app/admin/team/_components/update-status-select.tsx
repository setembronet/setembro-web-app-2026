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
import { changeUserStatus } from "@/actions/team-actions";

export function UpdateStatusSelect({ userId, initialStatus }: { userId: string, initialStatus: string }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(initialStatus);

    const handleStatusChange = async (newStatus: string) => {
        setLoading(true);
        const res = await changeUserStatus(userId, newStatus);
        if (res.error) {
            toast.error(res.error);
            setStatus(initialStatus); // revert
        } else {
            setStatus(newStatus);
            toast.success("Status atualizado com sucesso!");
        }
        setLoading(false);
    };



    return (
        <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={loading}
        >
            <SelectTrigger className={`w-[160px] h-8 text-xs font-medium border-0 shadow-none focus:ring-0 ${status === 'invited' ? 'text-yellow-600 dark:text-yellow-500' : status === 'blocked' ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-green-500'}`}>
                <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="invited" className="text-yellow-600 dark:text-yellow-500 font-medium">Convite Pendente</SelectItem>
                <SelectItem value="active" className="text-green-600 dark:text-green-500 font-medium">Ativo</SelectItem>
                <SelectItem value="blocked" className="text-red-600 dark:text-red-500 font-medium">Bloqueado</SelectItem>
            </SelectContent>
        </Select>
    );
}
