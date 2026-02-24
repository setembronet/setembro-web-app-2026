"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchFieldProps {
    placeholder?: string;
}

export function SearchField({ placeholder = "Buscar..." }: SearchFieldProps) {
    return (
        <Suspense fallback={<div className="h-10 w-full max-w-sm animate-pulse bg-muted rounded-md" />}>
            <SearchFieldInner placeholder={placeholder} />
        </Suspense>
    );
}

function SearchFieldInner({ placeholder = "Buscar..." }: SearchFieldProps) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        replace(`?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex w-full max-w-sm items-center space-x-2">
            <Input
                type="search"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("q")?.toString()}
                className="pr-10"
                aria-label="Buscar"
            />
            <Button type="button" className="absolute right-0 rounded-l-none h-10 w-10 p-0" variant="ghost">
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
            </Button>
        </div>
    );
}
