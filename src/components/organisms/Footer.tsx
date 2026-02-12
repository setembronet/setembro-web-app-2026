import Link from "next/link";
import { Icons } from "@/components/atoms/Icons";

export function Footer() {
    return (
        <footer className="border-t bg-secondary/50">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2 font-heading font-bold text-xl">
                            <span className="text-primary">Setembro</span>
                            <span className="text-accent">.net</span>
                        </Link>
                        <p className="text-sm text-muted-foreground w-full max-w-xs">
                            Soluções em tecnologia avançada, inteligência artificial e desenvolvimento de software sob medida para o seu negócio.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Serviços</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/#development" className="hover:text-accent">Desenvolvimento Web</Link></li>
                            <li><Link href="/#ai" className="hover:text-accent">Consultoria em IA</Link></li>
                            <li><Link href="/#hosting" className="hover:text-accent">Hospedagem & Nuvem</Link></li>
                            <li><Link href="/#seo" className="hover:text-accent">SEO Técnico</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Empresa</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-accent">Sobre Nós</Link></li>
                            <li><Link href="/blog" className="hover:text-accent">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-accent">Contato</Link></li>
                            <li><Link href="/privacy" className="hover:text-accent">Privacidade</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Receba Novidades</h4>
                        <p className="text-sm text-muted-foreground">Assine nossa newsletter para dicas de tecnologia e IA.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                aria-label="Endereço de email para newsletter"
                            />
                            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                                OK
                            </button>
                        </div>
                        <div className="flex space-x-4 text-muted-foreground">
                            <Icons.mail className="h-5 w-5 hover:text-accent cursor-pointer" />
                            <Icons.logo className="h-5 w-5 hover:text-accent cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Setembro.net. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}
