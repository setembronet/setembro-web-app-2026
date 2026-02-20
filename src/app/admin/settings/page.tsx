"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, Loader2, Sparkles, BrainCircuit } from "lucide-react";

export default function SettingsPage() {
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [provider, setProvider] = useState("gemini");
    const [geminiKey, setGeminiKey] = useState("");
    const [openaiKey, setOpenaiKey] = useState("");

    // Busca configurações atuais no carregamento
    useEffect(() => {
        const fetchSettings = async () => {
            const { data, error } = await supabase
                .from("system_settings")
                .select("*");

            if (data && !error) {
                const prov = data.find((d) => d.key === "ai_provider")?.value;
                const gemini = data.find((d) => d.key === "gemini_api_key")?.value;
                const openai = data.find((d) => d.key === "openai_api_key")?.value;

                if (prov) setProvider(prov);
                if (gemini) setGeminiKey(gemini);
                if (openai) setOpenaiKey(openai);
            }
            setLoading(false);
        };
        fetchSettings();
    }, [supabase]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const updates = [
            { key: "ai_provider", value: provider, description: "Provedor padrão de IA: gemini ou openai" },
            { key: "gemini_api_key", value: geminiKey, description: "Chave da API do Google Gemini" },
            { key: "openai_api_key", value: openaiKey, description: "Chave da API da OpenAI" },
        ];

        for (const update of updates) {
            await supabase
                .from("system_settings")
                .upsert(update, { onConflict: "key" });
        }

        setSaving(false);
        alert("Configurações de IA salvas com sucesso!");
    };

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Carregando configurações...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Configurações de Inteligência Artificial</h1>
                <p className="text-muted-foreground">
                    Gerencie os provedores e as chaves de API secretas que alimentam os Agentes da Setembro.net.
                </p>
            </div>

            <form onSubmit={handleSave} className="grid gap-6 max-w-3xl">

                {/* Seleção do Motor */}
                <Card>
                    <CardHeader>
                        <CardTitle>Motor de IA Princípal</CardTitle>
                        <CardDescription>Escolha qual inteligência artificial comandará a plataforma.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="radio"
                                    name="provider"
                                    value="gemini"
                                    id="gemini"
                                    checked={provider === "gemini"}
                                    onChange={(e) => setProvider(e.target.value)}
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor="gemini"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary cursor-pointer"
                                >
                                    <Sparkles className="mb-3 h-6 w-6 text-blue-500" />
                                    Google Gemini
                                </Label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="provider"
                                    value="openai"
                                    id="openai"
                                    checked={provider === "openai"}
                                    onChange={(e) => setProvider(e.target.value)}
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor="openai"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary cursor-pointer"
                                >
                                    <BrainCircuit className="mb-3 h-6 w-6 text-emerald-500" />
                                    OpenAI (GPT)
                                </Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Chaves Secretas */}
                <Card>
                    <CardHeader>
                        <CardTitle>Credenciais (API Keys)</CardTitle>
                        <CardDescription>
                            As chaves sãos armazendas de forma criptografada no banco e usadas exclusivamente pelo Back-end para emissão de relatórios e artigos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="gemini_key">Google Gemini API Key</Label>
                            <Input
                                id="gemini_key"
                                type="password"
                                placeholder="AIzaSy..."
                                value={geminiKey}
                                onChange={(e) => setGeminiKey(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Obtenha sua chave gratuita (v2.5 Pro) no Google AI Studio.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="openai_key">OpenAI API Key</Label>
                            <Input
                                id="openai_key"
                                type="password"
                                placeholder="sk-..."
                                value={openaiKey}
                                onChange={(e) => setOpenaiKey(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Obtenha sua chave (GPT-4o) na plataforma de desenvolvedores da OpenAI.</p>
                        </div>

                    </CardContent>
                    <CardFooter className="bg-muted/50 pt-6">
                        <Button type="submit" disabled={saving}>
                            {saving ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</>
                            ) : (
                                <><Save className="mr-2 h-4 w-4" /> Salvar Configurações</>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
