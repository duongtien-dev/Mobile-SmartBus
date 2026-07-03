import BaseService from '@/services/BaseService';

class TicketService extends BaseService {
    constructor() {
        super('/ticket');
    }

    createTicket(body: object) {
        return this.post('/create', body);
    }

    verifyScanQRCode(body: object) {
        return this.post('/verify-scanned-qr', body);
    }

}

export default TicketService;
