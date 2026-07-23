import type { TicketType } from '@/models/ticket';

export interface ITicketProduct {
    _id: string;
    code: TicketType;
    title: string;
    validity: string;
    unitPrice: number;
    active: boolean;
    sortOrder: number;
    createdAt?: string;
    updatedAt?: string;
}

