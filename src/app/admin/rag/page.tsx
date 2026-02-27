import { getRAGDocuments } from "@/actions/rag-actions";
import { RagTable } from "./_components/rag-table";

export default async function RagPage() {
    const documents = await getRAGDocuments();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Memória IA (RAG)</h1>
                    <p className="text-muted-foreground mt-1">
                        Gerencie a base de conhecimento (Vector Store) da Ana. Nesta tela, você pode forçar a IA a
                        "esquecer" posts desatualizados se tiverem informações errôneas.
                    </p>
                </div>
            </div>

            <div className="rounded-md border bg-card p-4">
                <RagTable documents={documents} />
            </div>
        </div>
    );
}
