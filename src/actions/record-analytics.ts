'use server'

import { createClient } from "@/lib/supabase/server";

export type AnalyticsPayload = {
    post_id: string;
    visitor_id: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    referrer_url?: string;
    device_type: string;
    engagement_time_seconds: number;
    max_scroll_depth: number;
    lcp_score?: number;
    converted?: boolean;
};

export async function recordAnalytics(payload: AnalyticsPayload) {
    if (!payload.post_id || !payload.visitor_id) return { success: false, error: 'Missing required fields' };

    try {
        const supabase = await createClient();

        // Increment or upsert using the RPC we created
        const { error } = await supabase.rpc('increment_analytics', {
            p_post_id: payload.post_id,
            p_visitor_id: payload.visitor_id,
            p_utm_source: payload.utm_source || null,
            p_utm_medium: payload.utm_medium || null,
            p_utm_campaign: payload.utm_campaign || null,
            p_referrer: payload.referrer_url || null,
            p_device_type: payload.device_type || 'unknown',
            p_engagement_increment: payload.engagement_time_seconds || 0,
            p_scroll_depth: payload.max_scroll_depth || 0,
            p_lcp_score: payload.lcp_score || null,
            p_converted: payload.converted || false
        });

        if (error) {
            console.error("Error recording analytics:", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (e: any) {
        console.error("Exception recording analytics:", e);
        return { success: false, error: e.message };
    }
}
