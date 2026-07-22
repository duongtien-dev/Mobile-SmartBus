import BaseService from "@/services/BaseService";

class TicketService extends BaseService {
    constructor() {
        super("/tickets");
    }

    createTicket(body: object) {
        return this.post("/create", body);
    }

    verifyScanQRCode(body: object) {
        return this.post("/verify-scanned-qr", body);
    }

    getMyTickets(body: object) {
        return this.post("/my", body);
    }

    getTicketDetail(body: object) {
        return this.post("/detail", body);
    }
}

export const ticketService = new TicketService();
