"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MegaMenu } from "@/components/MegaMenu";

export function Navbar() {
    const t = useTranslations("Navbar");
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "/web", label: t("web_dev") },
        { href: "/systems", label: t("systems") },
        { href: "/automation", label: t("automation") },
        { href: "/marketing", label: t("marketing") },
        { href: "/design", label: t("design") },
        { href: "/ai", label: t("ai") },
        { href: "/hosting", label: t("hosting") },
        { href: "/blog", label: t("blog") },
    ];

    return (
        <header className="fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-lg flex items-center space-x-2">
                        <span>Setembro.net</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <MegaMenu />
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                            <div className="flex flex-col gap-4 py-4">
                                <Link
                                    href="/"
                                    className="text-lg font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Setembro.net
                                </Link>
                                <nav className="flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-2 py-1 text-lg"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="flex items-center gap-4 mt-4">
                                    <ThemeToggle />
                                    <LanguageSwitcher />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
