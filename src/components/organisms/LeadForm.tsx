'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { cn } from "@/lib/utils";

const leadSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    company: z.string().optional(),
    message: z.string().min(10, "Mensagem muito curta"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function LeadForm({ className }: { className?: string }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
    });

    const onSubmit = async (data: LeadFormValues) => {
        // TODO: Connect to Server Action or API
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Mensagem enviada com sucesso!");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Input placeholder="Seu Nome" {...register("name")} aria-label="Seu Nome" />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <Input placeholder="Sua Empresa (Opcional)" {...register("company")} aria-label="Sua Empresa" />
                </div>
            </div>

            <div className="space-y-2">
                <Input type="email" placeholder="Seu Email Corporativo" {...register("email")} aria-label="Seu Email Corporativo" />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Como podemos ajudar?"
                    {...register("message")}
                    aria-label="Mensagem"
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
            </Button>
        </form>
    );
}
