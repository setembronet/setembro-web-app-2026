'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Icons } from '@/components/atoms/Icons';

const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Serviços', href: '/#services' },
    { title: 'Blog', href: '/blog' },
    { title: 'AI Hub', href: '/ai-hub' },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4">
                <div className="mr-8 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2 font-heading font-bold text-xl">
                        <span className="text-primary">Setembro</span>
                        <span className="text-accent">.net</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="inline-flex items-center justify-center rounded-md p-2 text-foreground/50 hover:bg-accent hover:text-accent-foreground focus:outline-none md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }
                    }}
                >
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? <Icons.close className="h-6 w-6" /> : <Icons.layout className="h-6 w-6" />}
                </button>

                <div className="ml-auto hidden md:flex items-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Fale Conosco
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="absolute top-16 left-0 w-full border-b bg-background p-4 md:hidden shadow-lg animate-in slide-in-from-top-5">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setIsOpen(false);
                                        }
                                    }}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-accent",
                                        pathname === item.href ? "text-foreground" : "text-foreground/60"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                            <div className="pt-4 flex flex-col gap-2">
                                <Button variant="ghost" className="w-full justify-start" asChild>
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                    Fale Conosco
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
