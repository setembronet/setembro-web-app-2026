"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Wand2, Plus, Calendar, Save, Globe } from "lucide-react";
import { SEOField } from "./seo-field";
import { FAQManager, FAQItem } from "./faq-manager";
import { SEOScore } from "./seo-score";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RichTextEditor } from "@/components/ui/rich-text-editor";


// Schema
const formSchema = z.object({
    title: z.string().min(2, {
        message: "O título deve ter pelo menos 2 caracteres.",
    }),
    slug: z.string().min(2, {
        message: "O slug deve ter pelo menos 2 caracteres.",
    }),
    category_id: z.string().min(1, {
        message: "Por favor, selecione uma categoria.",
    }),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    image: z.string().url({ message: "URL inválida" }).optional().or(z.literal("")),
    featured_image_alt: z.string().optional(),
    is_published: z.boolean(),
    status: z.enum(["draft", "published", "scheduled", "pending", "private", "trash"]),
    published_at: z.string().optional(),
    is_featured: z.boolean(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    canonical_url: z.string().url({ message: "URL inválida" }).optional().or(z.literal("")),
    faq_items: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
});

export interface Category {
    id: string;
    name: string;
}

interface PostFormProps {
    initialData?: any;
    isEditing?: boolean;
    categories?: Category[];
}

export function PostForm({ initialData, isEditing = false, categories = [] }: PostFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);
    const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            category_id: initialData?.category_id || "",
            excerpt: initialData?.excerpt || "",
            content: initialData?.content || "",
            image: initialData?.image || "",
            featured_image_alt: initialData?.featured_image_alt || "",
            is_published: initialData?.is_published || false,
            status: initialData?.status || "draft",
            published_at: initialData?.published_at || new Date().toISOString(),
            is_featured: initialData?.is_featured || false,
            meta_title: initialData?.meta_title || "",
            meta_description: initialData?.meta_description || "",
            canonical_url: initialData?.canonical_url || "",
            faq_items: initialData?.faq_items || [],
        },
    });

    // Auto-slug
    const title = form.watch("title");
    useEffect(() => {
        if (!isEditing && title) {
            const slug = title
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
            form.setValue("slug", slug);
        }
    }, [title, isEditing, form]);

    async function handleGenerateSEO() {
        const content = form.getValues("content");
        if (!content) {
            toast.error("Por favor, adicione algum conteúdo primeiro.");
            return;
        }

        setIsGeneratingSEO(true);
        try {
            const response = await fetch("/api/ai/generate-seo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });
            const data = await response.json();

            if (data.error) throw new Error(data.error);

            form.setValue("meta_title", data.title);
            form.setValue("meta_description", data.description);
            if (!form.getValues("excerpt")) {
                form.setValue("excerpt", data.excerpt);
            }
            if (data.faq_items && Array.isArray(data.faq_items)) {
                form.setValue("faq_items", data.faq_items);
            }
            toast.success("Metadados SEO gerados!");
        } catch (error) {
            toast.error("Falha ao gerar SEO");
        } finally {
            setIsGeneratingSEO(false);
        }
    }

    async function handleGenerateDraft() {
        const topic = window.prompt("Qual o tópico desejado para o artigo da IA?");
        if (!topic) return;

        setIsGeneratingDraft(true);
        toast.info("Iniciando modo criativo (Agente Julia)... isso pode levar um momento.");

        try {
            const response = await fetch("/api/generate-post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });
            const data = await response.json();

            if (data.error) throw new Error(data.error);

            const currentContent = form.getValues("content") || "";
            const newContent = currentContent
                ? `${currentContent}\n\n<hr class="my-8 border-t-2 border-dashed border-primary" />\n\n${data.content}`
                : data.content;

            form.setValue("content", newContent);
            toast.success("Rascunho gerado perfeitamente!");
        } catch (error) {
            toast.error("Falha ao gerar o rascunho com IA.");
        } finally {
            setIsGeneratingDraft(false);
        }
    }

    const insertCTA = () => {
        const currentContent = form.getValues("content") || "";
        const ctaBlock = `\n\n<div className="cta-block bg-primary/10 p-6 rounded-lg my-8 text-center">\n  <h3 className="text-xl font-bold mb-2">Quer saber mais?</h3>\n  <p className="mb-4">Entre em contato hoje para discutir seu projeto.</p>\n  <a href="/contact" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90">Fale Conosco</a>\n</div>\n\n`;
        form.setValue("content", currentContent + ctaBlock);
        toast.info("Bloco CTA adicionado!");
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        const supabase = createClient();

        try {
            const user = (await supabase.auth.getUser()).data.user;

            const formData = new FormData();
            if (isEditing && initialData?.id) {
                formData.append('id', initialData.id);
            }

            Object.entries(values).forEach(([key, value]) => {
                if (key === 'faq_items') {
                    formData.append(key, JSON.stringify(value));
                } else if (typeof value === 'boolean') {
                    if (value) formData.append(key, 'on');
                } else {
                    formData.append(key, value as string || "");
                }
            });

            let result;
            if (isEditing) {
                const { updatePost } = await import("@/actions/update-post");
                result = await updatePost(null, formData);
            } else {
                const { createPost } = await import("@/actions/create-post");
                result = await createPost(null, formData);
            }

            if (result?.success === false) {
                throw new Error(result?.message || "Operação falhou");
            }

        } catch (error: any) {
            if (error.message === "NEXT_REDIRECT") {
                return;
            }
            console.error(error);
            toast.error("Falha ao salvar post: " + error.message);
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* Header Actions */}
                <div className="flex justify-between items-center bg-card p-4 rounded-lg border shadow-sm sticky top-4 z-10">
                    <h2 className="text-xl font-semibold tracking-tight">
                        {isEditing ? "Editar Post" : "Novo Post"}
                    </h2>
                    <div className="flex gap-2">
                        <Button type="button" variant="ghost" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            {isEditing ? "Salvar Alterações" : "Salvar Post"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Title & Slug */}
                        <div className="space-y-4 bg-card p-6 rounded-lg border shadow-sm">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Título do Artigo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o título principal..." className="text-lg py-6" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Slug Field (Simple for now, can be moved to SEO tab but good here for visibility) */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted/50 rounded pointer-events-none opacity-80">
                                <Globe className="h-3 w-3" />
                                <span>/blog/{form.watch('slug')}</span>
                            </div>
                        </div>

                        {/* Tabs for Content / FAQ */}
                        <Tabs defaultValue="content" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="content">Conteúdo Principal</TabsTrigger>
                                <TabsTrigger value="faq">Perguntas Frequentes (FAQ)</TabsTrigger>
                            </TabsList>

                            <TabsContent value="content" className="space-y-6">
                                {/* Excerpt */}
                                <FormField
                                    control={form.control}
                                    name="excerpt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Resumo (Excerpt)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Breve resumo para a listagem do blog..."
                                                    className="resize-none h-24"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Aparece nos cards de listagem e no header do post.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Main Content (Editor placeholder) */}
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center mb-1">
                                                <FormLabel>Corpo do Texto</FormLabel>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleGenerateDraft}
                                                    disabled={isGeneratingDraft}
                                                    className="h-8 bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
                                                >
                                                    {isGeneratingDraft ? (
                                                        <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                                    ) : (
                                                        <Wand2 className="w-3 h-3 mr-2" />
                                                    )}
                                                    Gerar Rascunho com IA
                                                </Button>
                                            </div>
                                            <FormControl>
                                                <RichTextEditor
                                                    placeholder="Escreva seu artigo aqui..."
                                                    value={field.value || ""}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>

                            <TabsContent value="faq">
                                <FormField
                                    control={form.control}
                                    name="faq_items"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FAQManager
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>

                    </div>

                    {/* RIGHT COLUMN - Sidebar */}
                    <div className="space-y-6">

                        {/* SEO Score Card */}
                        <SEOScore
                            title={form.watch("title") || ""}
                            description={form.watch("meta_description") || ""}
                            content={form.watch("content") || ""}
                            featuredImage={form.watch("image") || ""}
                            featuredImageAlt={form.watch("featured_image_alt") || ""}
                        />

                        {/* Publishing Status */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-medium">Publicação</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft (Rascunho)</SelectItem>
                                                    <SelectItem value="pending">Pendente</SelectItem>
                                                    <SelectItem value="published">Publicado</SelectItem>
                                                    <SelectItem value="scheduled">Agendado</SelectItem>
                                                    <SelectItem value="private">Privado</SelectItem>
                                                    <SelectItem value="trash">Lixeira</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="published_at"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Data</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="datetime-local"
                                                    {...field}
                                                    min={new Date().toISOString().slice(0, 16)}
                                                />
                                            </FormControl>
                                            {field.value && new Date(field.value) > new Date() && (
                                                <FormDescription className="text-yellow-600 dark:text-yellow-400 text-xs flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    Será publicado futuramente
                                                </FormDescription>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Category */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-medium">Organização</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="category_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Categoria</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Featured Image */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-medium">Imagem Destacada</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>URL da Imagem</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.watch("image") && (
                                    <div className="aspect-video w-full rounded-md overflow-hidden bg-muted relative border">
                                        <img
                                            src={form.watch("image") || ""}
                                            alt="Preview"
                                            className="object-cover w-full h-full"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                        />
                                    </div>
                                )}

                                <FormField
                                    control={form.control}
                                    name="featured_image_alt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Texto Alternativo (Alt)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Descreva a imagem..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* SEO Metadata */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-base font-medium">Metadados SEO</CardTitle>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleGenerateSEO}
                                        disabled={isGeneratingSEO}
                                        className="h-8 px-2"
                                    >
                                        <Wand2 className="w-3 h-3 mr-1" />
                                        Gerar
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="meta_title"
                                    render={({ field }) => (
                                        <SEOField
                                            label="Meta Title"
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            maxLength={60}
                                            recommendedMin={30}
                                            recommendedMax={60}
                                        />
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="meta_description"
                                    render={({ field }) => (
                                        <SEOField
                                            label="Meta Description"
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            maxLength={160}
                                            recommendedMin={120}
                                            recommendedMax={160}
                                            multiline
                                        />
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="canonical_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>URL Canônica</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </form >
        </Form >
    );
}
