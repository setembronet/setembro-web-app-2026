"use client";

import { useState } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { inviteUser } from "@/actions/team-actions";

export function InviteMemberButton() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInvite = async (formData: FormData) => {
        setLoading(true);
        const res = await inviteUser(formData);

        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success("Convite enviado com sucesso!");
            setOpen(false);
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Convidar Membro
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleInvite}>
                    <DialogHeader>
                        <DialogTitle>Convidar Membro</DialogTitle>
                        <DialogDescription>
                            Um e-mail será enviado com as instruções de configuração de senha para acessar o painel administrativo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                E-mail
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="nome@exemplo.com.br"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                Perfil
                            </Label>
                            <div className="col-span-3">
                                <Select name="role" defaultValue="editor" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um perfil" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="editor">Editor (Conteúdo)</SelectItem>
                                        <SelectItem value="admin">Administrador (Total)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Enviar Convite
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
