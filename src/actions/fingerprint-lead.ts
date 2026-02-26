'use server'

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export async function fingerprintLead(sourceUrl: string, interestCategory: string) {
    const supabase = await createClient();
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "Unknown";
    const referrer = headersList.get("referer") || "Direct";

    // Register an anonymous or early-stage lead signal
    const rawData = {
        source_url: sourceUrl,
        interest_category: interestCategory,
        type: 'concierge_interaction',
        metadata: {
            source: 'floating_concierge',
            user_agent: userAgent,
            referrer: referrer
        }
    };

    const { error } = await supabase
        .from('leads')
        .insert(rawData);

    if (error) {
        console.error("Failed to fingerprint lead:", error.message);
        return { success: false, message: error.message };
    }

    return { success: true, message: 'Fingerprint logged successfully.' };
}
