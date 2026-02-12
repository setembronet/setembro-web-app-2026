import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/atoms/Badge";

interface Author {
    name: string;
    avatarUrl?: string;
}

interface BlogCardProps {
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    publishedAt: Date;
    author: Author;
    category: string;
    className?: string;
}

export function BlogCard({
    slug,
    title,
    excerpt,
    coverImage,
    publishedAt,
    author,
    category,
    className,
}: BlogCardProps) {
    return (
        <article className={cn("group flex flex-col space-y-3", className)}>
            <Link href={`/blog/${slug}`} aria-label={`Ler artigo: ${title}`} className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                {coverImage ? (
                    <Image
                        src={coverImage}
                        alt={`Capa do artigo: ${title}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground" aria-hidden="true">
                        <span className="text-sm">Sem imagem</span>
                    </div>
                )}
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="rounded-sm border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    {category}
                </Badge>
                <span aria-hidden="true">•</span>
                <time dateTime={publishedAt.toISOString()}>
                    {format(publishedAt, "d 'de' MMMM, yyyy", { locale: ptBR })}
                </time>
            </div>
            <Link href={`/blog/${slug}`} className="group" tabIndex={-1}>
                <h3 className="font-heading text-2xl font-bold leading-tight tracking-tighter group-hover:text-accent transition-colors">
                    {title}
                </h3>
            </Link>
            <p className="text-muted-foreground line-clamp-2">{excerpt}</p>
            <div className="flex items-center gap-2 pt-2">
                {author.avatarUrl && (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-muted">
                        <Image src={author.avatarUrl} alt={author.name} fill className="object-cover" />
                    </div>
                )}
                <span className="text-sm font-medium text-foreground">{author.name}</span>
            </div>
        </article>
    );
}
