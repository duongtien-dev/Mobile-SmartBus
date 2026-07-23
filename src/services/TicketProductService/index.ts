import BaseService from '@/services/BaseService';
import type { ApiResponse } from '@/services/type';
import type { ITicketProduct } from '@/models/ticketProduct';

class TicketProductService extends BaseService {
    constructor() {
        super('/ticket-products');
    }

    list() {
        return this.post<ApiResponse<ITicketProduct[]>>('/list', {});
    }
}

export const ticketProductService = new TicketProductService();
