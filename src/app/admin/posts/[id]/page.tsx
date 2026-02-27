import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PostForm } from "../_components/post-form";

export default async function EditPostPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const supabase = await createClient();
    const { data: post } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", params.id)
        .single();

    const { data: categories } = await supabase.from("categories").select("*");

    if (!post) {
        notFound();
    }

    return (
        <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-8">
            <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
            <PostForm initialData={post} isEditing categories={categories || []} />
        </div>
    );
}
