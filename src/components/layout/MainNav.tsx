import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
    const pathname = usePathname();

    const routes = [
        {
            href: "/",
            label: "Início",
        },
        {
            href: "/web/ecommerce",
            label: "E-commerce",
        },
        {
            href: "/web/layouts",
            label: "Engenharia Visual",
        },
    ];

    return (
        <nav className="flex items-center space-x-6 lg:space-x-8">
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === route.href
                            ? "text-neutral-900 dark:text-white"
                            : "text-neutral-500 dark:text-neutral-400"
                        }`}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
