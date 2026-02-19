import { createClient } from "@/lib/supabase/server";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: testimonial } = await supabase
        .from("testimonials")
        .select("*")
        .eq("id", id)
        .single();

    if (!testimonial) {
        notFound();
    }

    return <TestimonialForm initialData={testimonial} />;
}
