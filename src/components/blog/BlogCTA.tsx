'use client';

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface BlogCTAProps {
    postTitle: string;
    postSlug: string;
}

export function BlogCTA({ postTitle, postSlug }: BlogCTAProps) {
    const handleOpenConcierge = () => {
        const event = new CustomEvent("open-concierge", {
            detail: {
                initialMessage: `Olá! Percebi que você estava aprofundando a leitura sobre "${postTitle}". Como a 1ª Agente Oficial, posso te tirar qualquer dúvida sobre como aplicar isso no seu negócio. Qual é o seu cenário atual?`,
                leadSource: `blog-reading:${postSlug}`
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <div className="my-12 p-8 bg-primary/10 rounded-2xl border border-primary/20 text-center flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold font-heading text-foreground">
                Quer aplicar este conhecimento no seu negócio?
            </h3>
            <p className="text-muted-foreground text-lg max-w-xl">
                Nossa agente especializada (Ana) está pronta para analisar o seu cenário e sugerir como as soluções apresentadas neste artigo podem acelerar seus resultados.
            </p>
            <Button size="lg" onClick={handleOpenConcierge} className="gap-2 text-md mt-2">
                <MessageSquare className="w-5 h-5" />
                Falar com a Ana sobre este tema
            </Button>
        </div>
    );
}
