"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    value?: number[];
    onValueChange?: (value: number[]) => void;
    max?: number;
    min?: number;
    step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, value, onValueChange, max = 100, min = 0, step = 1, ...props }, ref) => {
        const val = value ? value[0] : min;
        const percentage = ((val - min) / (max - min)) * 100;

        return (
            <div className={cn("relative flex w-full touch-none select-none items-center h-5", className)}>
                <input
                    type="range"
                    ref={ref}
                    min={min}
                    max={max}
                    step={step}
                    value={val}
                    onChange={(e) => onValueChange && onValueChange([parseFloat(e.target.value)])}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                    {...props}
                />
                <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary z-0 pointer-events-none">
                    <div
                        className="absolute h-full bg-primary"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div
                    className="absolute block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background z-10 pointer-events-none"
                    style={{ left: `calc(${percentage}% - 10px)` }}
                />
            </div>
        );
    }
)
Slider.displayName = "Slider"

export { Slider }
