"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    accept?: string;
    bucket?: string;
    folder?: string;
    maxSizeMB?: number;
    className?: string;
}

export function FileUpload({
    value,
    onChange,
    accept = "image/*",
    bucket = "blog_assets",
    folder = "uploads",
    maxSizeMB = 5,
    className,
}: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(`O arquivo deve ter no máximo ${maxSizeMB}MB`);
            return;
        }

        setIsUploading(true);
        const supabase = createClient();

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            onChange(publicUrl);
            toast.success("Upload realizado com sucesso!");
        } catch (error: any) {
            toast.error(`Falha no upload: ${error.message}`);
            console.error(error);
        } finally {
            setIsUploading(false);
            if (e.target) e.target.value = ''; // reset
        }
    };

    return (
        <div className={cn("w-full", className)}>
            {value ? (
                <div className="relative border rounded-md p-2 bg-muted/50 overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm truncate w-5/6" title={value}>{value.split('/').pop()?.split('?')[0]}</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => onChange("")}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    {/* Preview se for imagem */}
                    {value.match(/\.(jpeg|jpg|gif|png|webp)$/i) && (
                        <div className="mt-2 aspect-video w-full rounded-md overflow-hidden bg-muted relative border">
                            <img
                                src={value}
                                alt="Preview"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                            {isUploading ? (
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
                            ) : (
                                <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                            )}
                            <p className="mb-1 text-sm text-muted-foreground">
                                <span className="font-semibold">Clique para enviar</span> ou arraste
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {accept === "image/*" ? "JPG, PNG, WEBP" : accept.replace(/,/g, ', ')} (Max. {maxSizeMB}MB)
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept={accept}
                            onChange={handleUpload}
                            disabled={isUploading}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
