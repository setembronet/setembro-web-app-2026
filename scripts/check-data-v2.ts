
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase env vars");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log("--- DEBUG START ---");
    console.log("URL:", supabaseUrl);

    // 1. Try to list ONLY blog_posts (no joins)
    console.log("\n1. Testing blog_posts table access...");
    const { data: posts, error: postError } = await supabase
        .from('blog_posts')
        .select('id, title, is_published')
        .limit(3);

    if (postError) {
        console.error("FAIL: blog_posts access failed:", postError.message);
    } else {
        console.log(`SUCCESS: Found ${posts.length} posts.`);
    }

    // 2. Try to list ONLY categories
    console.log("\n2. Testing categories table access...");
    const { data: cats, error: catError } = await supabase
        .from('categories')
        .select('id, name')
        .limit(3);

    if (catError) {
        console.error("FAIL: categories access failed:", catError.message);
    } else {
        console.log(`SUCCESS: Found ${cats.length} categories.`);
    }

    // 3. Try to list ONLY authors
    console.log("\n3. Testing authors table access...");
    const { data: authors, error: authError } = await supabase
        .from('authors')
        .select('id, name')
        .limit(3);

    if (authError) {
        console.error("FAIL: authors access failed:", authError.message);
    } else {
        console.log(`SUCCESS: Found ${authors.length} authors.`);
    }

    console.log("\n--- DEBUG END ---");
}

checkData();
