
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
    console.log("Checking Categories...");
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*');

    if (catError) console.error("Category Error:", catError);
    else console.log(`Found ${categories?.length} categories:`, categories?.map(c => c.slug));

    console.log("\nChecking Authors...");
    const { data: authors, error: authError } = await supabase
        .from('authors')
        .select('*');

    if (authError) console.error("Author Error:", authError);
    else console.log(`Found ${authors?.length} authors:`, authors?.map(a => a.name));

    console.log("\nChecking Published Blog Posts...");
    const { data: posts, error: postError } = await supabase
        .from('blog_posts')
        .select(`
            id,
            title,
            slug,
            is_published,
            category:categories(name, slug),
            author:authors(name)
        `)
        .eq('is_published', true);

    if (postError) {
        console.error("Post Fetch Error:", postError);
    } else {
        console.log(`Found ${posts?.length} published posts.`);
        posts?.forEach(p => {
            console.log(`- [${p.is_published ? 'PUB' : 'DRAFT'}] ${p.title} (${p.slug})`);
            console.log(`  Category: ${JSON.stringify(p.category)}`);
            console.log(`  Author: ${JSON.stringify(p.author)}`);
        });
    }

    console.log("\nChecking RAW Blog Posts (All)...");
    const { data: allPosts, error: rawError } = await supabase
        .from('blog_posts')
        .select('id, title, is_published');

    if (rawError) console.error("Raw Post Error:", rawError);
    else console.log(`Total raw posts in DB: ${allPosts?.length}`);

}

checkData();
