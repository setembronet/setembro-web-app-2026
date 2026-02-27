import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../_components/post-form";

export default async function NewPostPage() {
    const supabase = await createClient();
    const { data: categories } = await supabase.from("categories").select("*");

    return (
        <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-8">
            <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
            <PostForm categories={categories || []} />
        </div>
    );
}
