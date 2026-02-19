import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../_components/post-form";

export default async function NewPostPage() {
    const supabase = await createClient();
    const { data: categories } = await supabase.from("categories").select("*");

    return (
        <div className="max-w-2xl mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
            <PostForm categories={categories || []} />
        </div>
    );
}
