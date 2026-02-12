
import { Lead } from '../domain/entities/Lead';

export interface ILeadRepository {
    create(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead>;
}
