"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"

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
    const t = useTranslations("MegaMenu")

    return (
        <NavigationMenu>
            <NavigationMenuList>

                {/* Web Development */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">{t('web_dev')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <Code className="h-6 w-6" />
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Setembro Dev
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            {t('web_dev_desc')}
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/web/custom" title={t('custom_sites')}>
                                {t('custom_sites_desc')}
                            </ListItem>
                            <ListItem href="/web/ecommerce" title={t('ecommerce')}>
                                {t('ecommerce_desc')}
                            </ListItem>
                            <ListItem href="/web/layouts" title={t('exclusive_layouts')}>
                                {t('exclusive_layouts_desc')}
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Systems */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">{t('systems')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            <ListItem title={t('custom_dev')} href="/systems/custom">
                                <Server className="w-4 h-4 mr-2 inline" />{t('custom_dev_desc')}
                            </ListItem>
                            <ListItem title={t('api_integration')} href="/systems/api">
                                <Server className="w-4 h-4 mr-2 inline" />{t('api_integration_desc')}
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Automation */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/automation">
                            {t('automation')}
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Marketing */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/marketing">
                            {t('marketing')}
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Design */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/design">
                            {t('design')}
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* AI */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/ai">
                            {t('ai')}
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Hosting */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/hosting">
                            {t('hosting')}
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Blog (Direct Link) */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/blog">
                            {t('blog')}
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
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
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
