
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
import { deleteCategory } from "./actions";

export default async function CategoriesPage() {
    const supabase = await createClient();
    const { data: categories } = await supabase
        .from("categories")
        .select("*")
        .order("name");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
                    <p className="text-muted-foreground">Gerencie as categorias do blog.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/categories/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nova Categoria
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell className="max-w-md truncate">{category.description || '-'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/categories/${category.id}`}>
                                                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                                                    <Edit className="h-4 w-4" />
                                                </div>
                                            </Link>
                                            <form action={async () => {
                                                'use server';
                                                await deleteCategory(category.id);
                                            }}>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    type="submit"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    Nenhuma categoria encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
