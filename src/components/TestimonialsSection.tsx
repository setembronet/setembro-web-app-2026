"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Testimonial {
    id: string;
    name: string;
    role: string | null;
    content: string;
    image_url: string | null;
    link: string | null;
}

export function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const supabase = createClient();

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data } = await supabase
                .from("testimonials")
                .select("*")
                .order("order", { ascending: true });

            if (data) setTestimonials(data);
        };
        fetchTestimonials();
    }, []);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (testimonials.length === 0) return null;

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Depoimentos de Clientes
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Veja o que nossos parceiros dizem sobre trabalhar conosco.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto px-12">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
                        onClick={scrollPrev}
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
                        onClick={scrollNext}
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Button>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="pl-4 min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                                    <div className="h-full">
                                        <Card className="h-full border-none shadow-none bg-transparent">
                                            <CardContent className="flex flex-col items-center text-center p-6 space-y-4 h-full">
                                                <div className="relative">
                                                    {testimonial.image_url ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={testimonial.image_url}
                                                            alt={testimonial.name}
                                                            className="h-20 w-20 rounded-full object-cover border-4 border-background shadow-md"
                                                        />
                                                    ) : (
                                                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-md">
                                                            <span className="text-2xl font-bold text-primary">
                                                                {testimonial.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1.5 shadow-sm border">
                                                        <Quote className="h-4 w-4 text-primary fill-primary/20" />
                                                    </div>
                                                </div>

                                                <blockquote className="text-muted-foreground flex-1 italic">
                                                    "{testimonial.content}"
                                                </blockquote>

                                                <div>
                                                    <div className="font-semibold text-foreground">
                                                        {testimonial.name}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {testimonial.role}
                                                    </div>
                                                    {testimonial.link && (
                                                        <a
                                                            href={testimonial.link.startsWith('http') ? testimonial.link : `https://${testimonial.link}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-primary hover:underline mt-1 block"
                                                        >
                                                            Visitar site
                                                        </a>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
