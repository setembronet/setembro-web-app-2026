'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function submitLead(formData: FormData) {
    const supabase = await createClient();
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "Unknown";
    const referrer = headersList.get("referer") || "Direct";

    const rawData = {
        user_name: formData.get('name') as string,
        user_email: formData.get('email') as string,
        message: formData.get('message') as string,
        source_url: formData.get('source_url') as string,
        interest_category: formData.get('interest_category') as string,
        type: 'contact_form',
        metadata: {
            source: 'landing_page',
            user_agent: userAgent,
            referrer: referrer
        }
    };

    const { error } = await supabase
        .from('leads')
        .insert(rawData);

    if (error) {
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/leads');
    return { success: true, message: 'Message sent successfully!' };
}
