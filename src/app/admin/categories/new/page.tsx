
import { CategoryForm } from "../_components/CategoryForm";

export default function NewCategoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Nova Categoria</h1>
                <p className="text-muted-foreground">Adicione uma nova categoria ao blog.</p>
            </div>
            <div className="border p-6 rounded-md bg-white dark:bg-card">
                <CategoryForm />
            </div>
        </div>
    );
}
