import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";

interface ServiceCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    href: string;
    category: string;
    className?: string;
}

export function ServiceCard({
    title,
    description,
    icon,
    href,
    category,
    className,
}: ServiceCardProps) {
    return (
        <div
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-accent/50",
                className
            )}
        >
            <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    {icon}
                </div>
                <Badge variant="secondary" className="group-hover:bg-accent/10 group-hover:text-accent font-medium">
                    {category}
                </Badge>
            </div>

            <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold tracking-tight text-primary">
                    {title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">
                    {description}
                </p>
            </div>

            <div className="mt-6">
                <Button variant="ghost" className="w-full justify-between group-hover:text-accent p-0 hover:bg-transparent" asChild>
                    <Link href={href}>
                        Ver detalhes
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
