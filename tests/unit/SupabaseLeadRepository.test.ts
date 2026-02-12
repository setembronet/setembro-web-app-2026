import { expect, test, vi, describe, beforeEach } from 'vitest';
import { SupabaseLeadRepository } from '@/infrastructure/adapters/SupabaseLeadRepository';

const mockSingle = vi.fn();
const mockSelect = vi.fn(() => ({ single: mockSingle }));
const mockInsert = vi.fn(() => ({ select: mockSelect }));
const mockFrom = vi.fn(() => ({
    insert: mockInsert
}));

vi.mock('@/utils/supabase/server', () => ({
    createClient: vi.fn(() => ({
        from: mockFrom
    }))
}));

describe('SupabaseLeadRepository', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockSingle.mockResolvedValue({
            data: {
                id: '123',
                user_name: 'Test User',
                user_email: 'test@example.com',
                user_phone: '1234567890',
                message: 'Hello',
                status: 'new',
                created_at: new Date().toISOString(),
                metadata: {
                    company: 'Test Co',
                    service_interest: 'development'
                }
            },
            error: null
        });
    });

    test('create calls supabase insert with correct data', async () => {
        const repo = new SupabaseLeadRepository();
        const leadData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            company: 'Test Co',
            service_interest: 'development',
            message: 'Hello'
        };

        await repo.create(leadData);

        expect(mockFrom).toHaveBeenCalledWith('leads');
        expect(mockInsert).toHaveBeenCalledWith({
            type: 'inquiry',
            user_name: 'Test User',
            user_email: 'test@example.com',
            user_phone: '1234567890',
            message: 'Hello',
            metadata: {
                company: 'Test Co',
                service_interest: 'development'
            },
            status: 'new'
        });
    });

    test('create throws error on supabase failure', async () => {
        const repo = new SupabaseLeadRepository();
        mockSingle.mockResolvedValue({ data: null, error: { message: 'DB Error' } });

        await expect(repo.create({
            name: 'Test',
            email: 'test@test.com'
        })).rejects.toThrow('Failed to create lead: DB Error');
    });
});
