import BaseService from '@/services/BaseService';

class TicketProductService extends BaseService {
    constructor() {
        super('/ticket-products');
    }

    list() {
        return this.post('/list', {});
    }
}

export const ticketProductService = new TicketProductService();
