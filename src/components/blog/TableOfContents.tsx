'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("article .prose h2, article .prose h3"))
            .map((elem) => {
                if (!elem.id) {
                    elem.id = elem.textContent
                        ?.toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, "") || "heading-" + Math.random().toString(36).substr(2, 9);
                }
                return {
                    id: elem.id,
                    text: elem.textContent || "",
                    level: Number(elem.tagName.replace("H", ""))
                };
            });

        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        elements.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="hidden lg:block sticky top-24 max-w-xs w-full ml-auto">
            <h4 className="font-semibold text-lg mb-4 text-foreground">Sumário</h4>
            <nav className="flex flex-col gap-2 border-l-2 border-muted pl-4">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                            "text-sm transition-colors hover:text-primary",
                            heading.level === 3 ? "pl-4" : "",
                            activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground"
                        )}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
