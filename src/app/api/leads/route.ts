import { NextRequest, NextResponse } from 'next/server';
import { SupabaseLeadRepository } from '@/infrastructure/adapters/SupabaseLeadRepository';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, company, message, service_interest } = body;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and Email are required.' },
                { status: 400 }
            );
        }

        const leadRepository = new SupabaseLeadRepository();
        const lead = await leadRepository.create({
            name,
            email,
            phone,
            company,
            message,
            service_interest,
        });

        return NextResponse.json({ success: true, lead }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating lead:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
