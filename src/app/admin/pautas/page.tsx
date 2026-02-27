"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generatePautas } from "@/actions/generate-pautas";
import { createClient } from "@/utils/supabase/client";

export default function PautasPage() {
    const [topicsInput, setTopicsInput] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const supabase = createClient();
            const { data } = await supabase.from("categories").select("*");
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleGenerate = async () => {
        setResult(null);
        if (!topicsInput.trim()) {
            setResult({ success: false, message: "Por favor, insira pelo menos um termo." });
            return;
        }

        if (!categoryId) {
            setResult({ success: false, message: "Selecione a categoria destino." });
            return;
        }

        const topics = topicsInput.split("\n").filter(t => t.trim().length > 0);

        setLoading(true);
        const res = await generatePautas(topics, categoryId);
        setResult(res);
        setLoading(false);

        if (res.success) {
            setTopicsInput("");
        }
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Pautas Autônomas (Agente Julia)</h1>
                <p className="text-muted-foreground">
                    Insira termos de pesquisa ou "briefings de campanha" separados por linha. A Julia pesquisará assincronamente o formato ideal e escreverá artigos com profundidade SEO (E-E-A-T, 1000+ palavras). Os artigos serão salvos como <strong className="text-foreground">Rascunhos</strong>.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Categoria Destino</label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria..." />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((c) => (
                                <SelectItem key={c.id} value={c.id}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Termos ou Tópicos (1 por linha)</label>
                    <Textarea
                        placeholder="Tendências B2B 2026&#10;Implementação de IA no RH&#10;Ouro e Commodities"
                        value={topicsInput}
                        onChange={(e) => setTopicsInput(e.target.value)}
                        className="min-h-[150px]"
                    />
                </div>

                {result && (
                    <div className={`p-4 rounded-md text-sm font-medium ${result.success ? 'bg-green-500/10 text-green-600 dark:text-green-500' : 'bg-red-500/10 text-red-600 dark:text-red-500'}`}>
                        {result.message}
                    </div>
                )}

                <Button
                    onClick={handleGenerate}
                    disabled={loading || !topicsInput.trim() || !categoryId}
                    size="lg"
                    className="w-full"
                >
                    {loading ? "Gerando Artigos (pode demorar)..." : "Iniciar Escrita Autônoma"}
                </Button>
            </div>
        </div>
    );
}
