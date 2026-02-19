
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function inspectContent() {
    console.log("--- INSPECTING CONTENT ---");

    // 1. Get raw posts
    const { data: posts } = await supabase
        .from('blog_posts')
        .select('id, title, slug, is_published, category_id, author_id');

    console.log(`\nTotal Posts: ${posts?.length}`);
    posts?.forEach(p => {
        console.log(`[${p.is_published ? 'PUB' : 'DFT'}] ${p.title} (${p.slug})`);
        console.log(`   > CatID: ${p.category_id}`);
        console.log(`   > AuthID: ${p.author_id}`);
    });

    // 2. Get categories
    const { data: cats } = await supabase.from('categories').select('id, name, slug');
    console.log(`\nCategories:`, cats);

    // 3. Get authors
    const { data: authors } = await supabase.from('authors').select('id, name');
    console.log(`\nAuthors:`, authors);

    // 4. Try the JOIN that is failing
    console.log("\nTesting JOIN...");
    const { data: joinData, error: joinError } = await supabase
        .from('blog_posts')
        .select('title, category:categories(name)')
        .limit(1);

    if (joinError) console.error("JOIN FAIL:", joinError);
    else console.log("JOIN SUCCESS:", JSON.stringify(joinData, null, 2));
}

inspectContent();
