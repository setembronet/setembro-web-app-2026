import { createClient } from '@supabase/supabase-js';

// Server-side only admin client. NEVER expose the service role key to the client.
export function createAdminClient() {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY');
    }

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}
