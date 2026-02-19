"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useTranslations } from "next-intl"; // Removed
import { ThemeToggle } from "@/components/ThemeToggle";
// import LanguageSwitcher from "@/components/LanguageSwitcher"; // Removed

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const t = useTranslations("AdminLayout"); // Removed
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Visão Geral" },
        { href: "/admin/leads", label: "Leads" },
        { href: "/admin/posts", label: "Artigos" },
        { href: "/admin/categories", label: "Categorias" },
        { href: "/admin/testimonials", label: "Depoimentos" },
        { href: "/admin/agents", label: "Agentes" },
    ];

    return (
        <div className="flex min-h-screen bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-14 items-center justify-center border-b px-4">
                    <Link href="/" className="font-bold text-lg">
                        Setembro.net Admin
                    </Link>
                </div>
                <nav className="grid gap-2 p-4 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname.startsWith(item.href)
                                ? "bg-muted text-primary"
                                : "text-muted-foreground"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <div className="ml-auto flex items-center gap-2">
                        <ThemeToggle />
                        {/* LanguageSwitcher removed */}
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
