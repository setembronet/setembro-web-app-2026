"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/actions/submit-lead";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function ContactForm({ category = "General" }: { category?: string }) {
    const t = useTranslations("HomePage");
    const [pending, setPending] = useState(false);
    const [sourceUrl, setSourceUrl] = useState("");

    useEffect(() => {
        setSourceUrl(window.location.href);
    }, []);

    async function handleSubmit(formData: FormData) {
        setPending(true);
        // Append hidden fields if not present (or rely on input)
        // Actually, inputs are easier for FormData
        const result = await submitLead(formData);
        setPending(false);

        if (result && result.success) {
            toast.success("Mensagem enviada com sucesso!");
            const form = document.querySelector("form") as HTMLFormElement;
            if (form) form.reset();
        } else {
            toast.error(result?.message || "Erro ao enviar mensagem.");
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <input type="hidden" name="interest_category" value={category} />
            <input type="hidden" name="source_url" value={sourceUrl} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Input id="name" name="name" placeholder="Seu nome" required className="bg-background/50" />
                </div>
                <div className="space-y-2">
                    <Input id="email" name="email" type="email" placeholder="seu@email.com" required className="bg-background/50" />
                </div>
            </div>
            <div className="space-y-2">
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Como podemos ajudar sua empresa?"
                    required
                    className="bg-background/50 min-h-[120px]"
                />
            </div>
            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white border-0" disabled={pending}>
                {pending ? "Enviando..." : "Falar com Especialista"}
            </Button>
        </form>
    );
}
