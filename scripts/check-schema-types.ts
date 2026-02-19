
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTypes() {
    console.log("Checking data samples...");

    const { data: categories, error: catsError } = await supabase.from("categories").select("*").limit(1);
    if (catsError) console.error("Error fetching categories:", catsError);
    else console.log("Sample Category:", categories?.[0]);

    const { data: posts, error: postsError } = await supabase.from("blog_posts").select("*").limit(1);
    if (postsError) console.error("Error fetching posts:", postsError);
    else {
        console.log("Sample Post:", posts?.[0]);
        if (posts?.[0]) {
            console.log("Post category_id type:", typeof posts[0].category_id);
            console.log("Post author_id type:", typeof posts[0].author_id);
        }
    }
}

checkTypes();
