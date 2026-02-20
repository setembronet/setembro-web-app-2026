import { createClient } from "@/lib/supabase/server";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function PostsPage() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from("blog_posts")
        .select(`
            *,
            category:categories(name)
        `)
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Artigos</h1>
                <Button asChild>
                    <Link href="/admin/posts/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Novo Artigo
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts && posts.length > 0 ? (
                            posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{(post.category as any)?.name || 'Sem Categoria'}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">{post.slug}</TableCell>
                                    <TableCell>
                                        {(() => {
                                            const status = post.status || (post.is_published ? 'published' : 'draft');
                                            const variants: any = {
                                                published: "default",
                                                draft: "secondary",
                                                scheduled: "outline",
                                                pending: "destructive", // or warning color if available
                                                private: "secondary",
                                                trash: "destructive"
                                            };
                                            const statusLabels: any = {
                                                published: "Publicado",
                                                draft: "Rascunho",
                                                scheduled: "Agendado",
                                                pending: "Pendente",
                                                private: "Privado",
                                                trash: "Lixeira"
                                            };
                                            return (
                                                <Badge variant={variants[status] || "secondary"}>
                                                    {statusLabels[status] || status}
                                                </Badge>
                                            )
                                        })()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/posts/${post.id}`}>
                                                <Button size="icon" variant="ghost">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Nenhum artigo encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
