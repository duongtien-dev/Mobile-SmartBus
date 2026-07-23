import type { ITicket, TicketType } from "@/models/ticket";
import type { ApiResponse } from "@/services/type";
import BaseService from "@/services/BaseService";

export type CreateTicketBody = {
    routeId: string;
    startStopName: string;
    endStopName: string;
    ticketType: TicketType;
    departureDate: string;
    departureTime?: string;
    seatQuantity: number;
    customerName: string;
    customerPhone: string;
    paymentMethodId: string;
};

class TicketService extends BaseService {
    constructor() {
        super("/tickets");
    }

    createTicket(body: CreateTicketBody) {
        return this.post<ApiResponse<ITicket>>("/create", body);
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
