
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
    console.log("Checking blog_posts columns...");

    // Try to insert a dummy row with these columns to see if it errors, 
    // or select if strict types allow. 
    // Better: select * limit 1 and print keys.

    const { data, error } = await supabase.from("blog_posts").select("*").limit(1);

    if (error) {
        console.error("Error fetching:", error);
    } else if (data && data.length > 0) {
        console.log("Existing Columns:", Object.keys(data[0]));
    } else {
        console.log("Table is empty, cannot verify columns by select *");
        // Attempt RPC or alternative inspection if needed.
    }
}

checkColumns();
