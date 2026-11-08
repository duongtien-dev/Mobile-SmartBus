import BaseService from "@/services/BaseService";

class TicketService extends BaseService {
    constructor() {
        super("/tickets");
    }

    createTicket(body: object & { purchaseKey?: string }) {
        const purchaseKey = body.purchaseKey ??
            `purchase-${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
        return this.post("/create", { ...body, purchaseKey });
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

    getTripHistory(body: object) {
        return this.post("/history", body);
    }
}

export const ticketService = new TicketService();
