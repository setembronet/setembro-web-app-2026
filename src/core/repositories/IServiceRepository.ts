import { Service } from '../domain/entities/Service';

export interface IServiceRepository {
    findAll(): Promise<Service[]>;
    findBySlug(slug: string): Promise<Service | null>;
    findByCategory(category: string): Promise<Service[]>;
}
