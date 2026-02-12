import { createClient } from '../../utils/supabase/server';
import { ILeadRepository } from '../../core/repositories/ILeadRepository';
import { Lead } from '../../core/domain/entities/Lead';

interface LeadRow {
    id: string;
    type: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    message: string | null;
    metadata: {
        company?: string;
        service_interest?: string;
    } | null;
    status: string;
    created_at: string;
}

export class SupabaseLeadRepository implements ILeadRepository {
    async create(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('leads')
            .insert({
                type: 'inquiry',
                user_name: lead.name,
                user_email: lead.email,
                user_phone: lead.phone,
                message: lead.message || '',
                metadata: {
                    company: lead.company,
                    service_interest: lead.service_interest
                },
                status: 'new'
            })
            .select() // Return inserted row
            .single<LeadRow>();

        if (error) throw new Error(`Failed to create lead: ${error.message}`);

        return {
            id: data.id,
            name: data.user_name,
            email: data.user_email,
            phone: data.user_phone,
            company: data.metadata?.company,
            service_interest: data.metadata?.service_interest,
            message: data.message || undefined,
            status: data.status as Lead['status'],
            createdAt: new Date(data.created_at)
        };
    }
}
