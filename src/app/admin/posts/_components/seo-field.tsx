"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface SEOFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    recommendedMin?: number;
    recommendedMax?: number;
    maxLength?: number;
    type?: "text" | "textarea";
    placeholder?: string;
    multiline?: boolean;
}

export function SEOField({
    label,
    value = "",
    onChange,
    recommendedMin = 0,
    recommendedMax = 100,
    maxLength,
    type = "text",
    placeholder,
    multiline = false,
}: SEOFieldProps) {
    const length = value.length;
    let color = "bg-slate-200";

    if (length > 0) {
        if (length < recommendedMin) color = "bg-yellow-500";
        else if (length <= recommendedMax) color = "bg-green-500";
        else color = "bg-red-500";
    }

    const percentage = Math.min(100, (length / recommendedMax) * 100);

    const InputComponent = multiline || type === "textarea" ? Textarea : Input;

    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                </label>
                <div className="flex gap-2 items-center">
                    <span className={cn("text-xs font-mono", length > recommendedMax ? "text-red-500 font-bold" : "text-muted-foreground")}>
                        {length} / {recommendedMax}
                    </span>
                    {maxLength && (
                        <span className="text-[10px] text-muted-foreground/70">
                            (Max: {maxLength})
                        </span>
                    )}
                </div>
            </div>

            <InputComponent
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                className={multiline || type === "textarea" ? "resize-none min-h-[80px]" : ""}
                {...(multiline || type === "textarea" ? { rows: 4 } : {})}
            />

            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-300", color)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
