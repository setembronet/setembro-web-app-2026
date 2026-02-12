export interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    service_interest?: string;
    status: 'new' | 'contacted' | 'qualified' | 'lost' | 'converted';
    createdAt: Date;
}
