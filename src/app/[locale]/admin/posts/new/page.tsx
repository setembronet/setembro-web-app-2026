"use client";

import { createPost } from "@/actions/create-post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BLOG_CATEGORIES } from "@/lib/blog-data";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create Post"}
        </Button>
    );
}

const initialState = {
    success: false,
    message: '',
};

export default function NewPostPage() {
    const [state, formAction] = useActionState(createPost, initialState);

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/posts">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">New Post</h1>
            </div>

            {state?.message && !state.success && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Error!</span> {state.message}
                </div>
            )}

            <form action={formAction} className="space-y-6 border p-6 rounded-lg bg-card">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required placeholder="Post title" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input id="slug" name="slug" required placeholder="url-friendly-slug" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category_id">Category</Label>
                        <Select name="category_id" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {BLOG_CATEGORIES.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                        {cat.label.pt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image">Cover Image URL</Label>
                    <Input id="image" name="image" placeholder="/images/blog/..." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea id="excerpt" name="excerpt" required placeholder="Short description..." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Content (HTML allowed)</Label>
                    <Textarea id="content" name="content" required className="min-h-[200px]" placeholder="<p>Write your content here...</p>" />
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="is_published" name="is_published" className="h-4 w-4" />
                    <Label htmlFor="is_published">Publish immediately</Label>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/posts">
                        <Button variant="outline" type="button">Cancel</Button>
                    </Link>
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
}
