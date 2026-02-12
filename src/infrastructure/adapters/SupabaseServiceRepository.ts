import { createClient } from '@/utils/supabase/server';
import { IServiceRepository } from '@/core/repositories/IServiceRepository';
import { Service, ServiceCategory } from '@/core/domain/entities/Service';

interface ServiceRow {
    id: string;
    slug: string;
    name: string;
    description: string;
    category: string;
    features: string[];
    price_range: string;
}

export class SupabaseServiceRepository implements IServiceRepository {
    async findAll(): Promise<Service[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('name')
            .returns<ServiceRow[]>();

        if (error) throw new Error(`Failed to fetch services: ${error.message}`);

        return data.map(this.mapToEntity);
    }

    async findBySlug(slug: string): Promise<Service | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('slug', slug)
            .single<ServiceRow>();

        if (error) {
            if (error.code === 'PGRST116') return null; // Not found
            throw new Error(`Failed to fetch service by slug: ${error.message}`);
        }

        return this.mapToEntity(data);
    }

    async findByCategory(category: string): Promise<Service[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('category', category)
            .order('name')
            .returns<ServiceRow[]>();

        if (error) throw new Error(`Failed to fetch services by category: ${error.message}`);

        return data.map(this.mapToEntity);
    }

    private mapToEntity(data: ServiceRow): Service {
        return new Service(
            data.id,
            data.slug,
            data.name,
            data.description,
            data.category as ServiceCategory,
            data.features,
            data.price_range
        );
    }
}
