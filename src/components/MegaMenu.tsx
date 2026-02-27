"use client"

import * as React from "react"
import Link from "next/link"
// import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons" // We will use Lucide icons for now
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Code, Server, Workflow, Megaphone, Palette, Bot, Cloud, BookOpen } from "lucide-react"

export function MegaMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>

                {/* Web Development */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Desenvolvimento Web</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <Code className="h-6 w-6" />
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Setembro Dev
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Sites e aplicações de alta performance.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/web/custom" title="Sites Personalizados">
                                Feito sob medida para sua marca.
                            </ListItem>
                            <ListItem href="/web/ecommerce" title="E-commerce">
                                Venda online, receba pagamentos.
                            </ListItem>
                            <ListItem href="/web/layouts" title="Layouts Exclusivos">
                                Designs únicos, sem templates.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Solutions (Nexus360 Hub) */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Soluções</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[1fr_.75fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="relative flex h-full w-full select-none flex-col justify-end rounded-md bg-slate-950 p-6 no-underline outline-none focus:shadow-md overflow-hidden group border border-slate-800"
                                        href="/solucoes/nexus-360"
                                    >
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)] group-hover:bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_50%)] transition-colors duration-500" />
                                        <Workflow className="h-6 w-6 text-blue-500 mb-2 relative z-10" />
                                        <div className="mb-2 mt-2 text-lg font-bold text-white relative z-10 flex items-center gap-2">
                                            Setembro Nexus360
                                        </div>
                                        <p className="text-sm leading-relaxed text-slate-400 relative z-10 font-light">
                                            Ecossistema 360 definitivo. Inteligência, automação e arquitetura digital no centro estratégico do seu negócio.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem title="Desenvolvimento Web" href="/">
                                <Code className="w-4 h-4 mr-2 inline text-slate-400" /> Landing Pages e Layouts
                            </ListItem>
                            <ListItem title="Sistemas Sob Medida" href="/systems/custom">
                                <Server className="w-4 h-4 mr-2 inline text-slate-400" /> ERP, CMMS, CRM e SaaS.
                            </ListItem>
                            <ListItem title="Integração de APIs" href="/systems/api">
                                <Workflow className="w-4 h-4 mr-2 inline text-slate-400" /> Conectividade de sistemas.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Automation */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/automation">
                            Automação
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Marketing */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/marketing">
                            Marketing & SEO
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Design */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/design">
                            Design
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* AI */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/ai">
                            IA
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Hosting */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/hosting">
                            Hospedagem
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Blog (Direct Link) */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/blog">
                            Blog
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, href, ...props }, ref) => {
    // Ensuring href is string as Link expects
    const validHref = (typeof href === "string" ? href : "") as any;

    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref as any}
                    href={validHref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
