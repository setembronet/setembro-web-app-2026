import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SEOScoreProps {
    title: string;
    description: string;
    content: string;
    featuredImage: string;
    featuredImageAlt: string;
}

export function SEOScore({ title, description, content, featuredImage, featuredImageAlt }: SEOScoreProps) {
    // 1. Alt Text Check
    const hasFeaturedImage = !!featuredImage;
    const hasAltText = hasFeaturedImage ? !!featuredImageAlt : true; // Pass if no image, or if image has alt
    // But requirement says "Presence of Alt Text in featured image". If no image, maybe warning? 
    // Let's assume neutral if no image, but strictly check if image exists.
    // Actually, improved logic: If image exists, MUST have alt.

    // 2. Meta Description Length (140-160)
    const descLen = description?.length || 0;
    const isDescValid = descLen >= 140 && descLen <= 160;

    // 3. Subtitles (H2/H3)
    // Simple regex for HTML content
    const hasSubtitles = /<h[23]/.test(content || "");

    // 4. Reading Time
    // Avg reading speed: 200 words/min
    const words = content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
    const readingTime = Math.ceil(words / 200);

    // Calculate Score
    const checks = [
        { label: "Imagem de Destaque com Alt Text", valid: hasFeaturedImage && !!featuredImageAlt, weight: 20 },
        { label: "Meta Description (140-160 chars)", valid: isDescValid, weight: 30 },
        { label: "Pelo menos um subtítulo (H2/H3)", valid: hasSubtitles, weight: 30 },
        { label: "Conteúdo substancial (> 300 palavras)", valid: words >= 300, weight: 20 },
    ];

    const score = checks.reduce((acc, check) => acc + (check.valid ? check.weight : 0), 0);
    const isReady = score >= 80;

    return (
        <Card className="border-l-4 border-l-primary/20">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        SEO Score
                        <Badge variant={isReady ? "default" : "secondary"} className={cn("ml-2", isReady ? "bg-green-600 hover:bg-green-700" : "")}>
                            {score}%
                        </Badge>
                    </CardTitle>
                </div>
                <Progress value={score} className="h-2 mt-2" />
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="space-y-3">
                    {checks.map((check, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                            {check.valid ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                            ) : (
                                <Circle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                            )}
                            <span className={cn(check.valid ? "text-foreground" : "text-muted-foreground", "flex-1")}>
                                {check.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t flex justify-between items-center text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Tempo de Leitura
                    </span>
                    <span className="font-medium text-foreground">
                        {readingTime} min
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
