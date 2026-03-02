import { listTeamMembers, removeUser, changeUserRole } from "@/actions/team-actions";
import { InviteMemberButton } from "./_components/invite-member-button";
import { UpdateRoleSelect } from "./_components/update-role-select";
import { UpdateStatusSelect } from "./_components/update-status-select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";

export default async function TeamPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const response = await listTeamMembers();

    // Sort logic to make sure current user and admins are on top
    const users = response.users?.sort((a, b) => {
        const aRole = a.user_metadata?.role || '';
        const bRole = b.user_metadata?.role || '';
        if (aRole === 'admin' && bRole !== 'admin') return -1;
        if (aRole !== 'admin' && bRole === 'admin') return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }) || [];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Equipe</h1>
                    <p className="text-muted-foreground">Gerencie o acesso da sua equipe ao painel administrativo.</p>
                </div>
                <InviteMemberButton />
            </div>

            <div className="rounded-md border bg-card">
                {response.error ? (
                    <div className="p-4 text-red-500">{response.error}</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>E-mail</TableHead>
                                <TableHead>Perfil</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Ingresso em</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((u) => {
                                    const role = u.user_metadata?.role || 'user';
                                    const status = u.user_metadata?.status || (!u.last_sign_in_at ? 'invited' : 'active');
                                    const isMe = user?.id === u.id;
                                    const isPending = status === 'invited';

                                    return (
                                        <TableRow key={u.id}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                {u.email}
                                                {isMe && <Badge variant="outline" className="ml-2">Você</Badge>}
                                            </TableCell>
                                            <TableCell>
                                                {isMe ? (
                                                    <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
                                                        {role === 'admin' ? 'Administrador' : 'Editor'}
                                                    </Badge>
                                                ) : (
                                                    <UpdateRoleSelect userId={u.id} initialRole={role} />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {isMe ? (
                                                    <span className="text-green-600 dark:text-green-500 font-medium px-3 text-xs">Ativo</span>
                                                ) : (
                                                    <UpdateStatusSelect userId={u.id} initialStatus={status} />
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(u.created_at).toLocaleDateString("pt-BR")}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {!isMe && (
                                                        <form action={async () => {
                                                            'use server';
                                                            await removeUser(u.id);
                                                        }}>
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                type="submit"
                                                                title="Remover acesso"
                                                            >
                                                                <Trash className="h-4 w-4" />
                                                            </Button>
                                                        </form>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        Nenhum usuário encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
