
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GripVertical } from "lucide-react";

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQManagerProps {
    value?: FAQItem[];
    onChange: (items: FAQItem[]) => void;
}

export function FAQManager({ value = [], onChange }: FAQManagerProps) {
    const [items, setItems] = useState<FAQItem[]>(value);

    // Sync with external value if it changes independently (e.g. initial load)
    useEffect(() => {
        if (JSON.stringify(items) !== JSON.stringify(value)) {
            setItems(value || []);
        }
    }, [value]);

    const addItem = () => {
        const newItems = [...items, { question: "", answer: "" }];
        setItems(newItems);
        onChange(newItems);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        onChange(newItems);
    };

    const updateItem = (index: number, field: keyof FAQItem, text: string) => {
        const newItems = items.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: text };
            }
            return item;
        });
        setItems(newItems);
        onChange(newItems);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Perguntas Frequentes (FAQ Schema)</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                    <Plus className="w-4 h-4 mr-2" /> Adicionar Pergunta
                </Button>
            </div>

            {items.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground bg-muted/20">
                    <p>Nenhuma pergunta adicionada. Adicione FAQs para melhorar o SEO.</p>
                </div>
            )}

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg bg-card shadow-sm group">
                        <div className="mt-2 text-muted-foreground cursor-move">
                            <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <Label>Pergunta</Label>
                                <Input
                                    value={item.question}
                                    onChange={(e) => updateItem(index, "question", e.target.value)}
                                    placeholder="Ex: Quanto custa o serviço?"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Resposta</Label>
                                <Textarea
                                    value={item.answer}
                                    onChange={(e) => updateItem(index, "answer", e.target.value)}
                                    placeholder="Ex: O serviço custa a partir de..."
                                    rows={2}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
                                onClick={() => removeItem(index)}
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
