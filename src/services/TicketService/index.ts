import type { ITicket, TicketType } from "@/models/ticket";
import type {
    VerifyScannedQrBody,
    VerifyScannedQrResult,
} from "@/models/shiftReport";
import type { ApiResponse } from "@/services/type";
import BaseService from "@/services/BaseService";

export type CreateTicketBody = {
    routeId: string;
    startStopName: string;
    endStopName: string;
    ticketType: TicketType;
    /** DD/MM/YYYY | MM/YYYY | ISO — backend parse */
    departureDate: string;
    departureTime?: string;
    seatQuantity: number;
    paymentMethodId: string;
    /** Optional — backend fallback User profile */
    customerName?: string;
    customerPhone?: string;
};

class TicketService extends BaseService {
    constructor() {
        super("/tickets");
    }

    createTicket(body: CreateTicketBody) {
        return this.post<ApiResponse<ITicket>>("/create", body);
    }

    /** Staff: POST /tickets/verify-scanned-qr — body `{ qrCode }` */
    verifyScanQRCode(body: VerifyScannedQrBody) {
        return this.post<ApiResponse<VerifyScannedQrResult>>(
            "/verify-scanned-qr",
            body,
        );
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
