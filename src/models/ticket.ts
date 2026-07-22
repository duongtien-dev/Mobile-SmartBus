export type TicketType = "single" | "monthlySingleRoute" | "monthlyInterRoute";

export type TicketStatus =
    | "pending"
    | "paid"
    | "active"
    | "used"
    | "expired"
    | "cancelled";

export interface ITicket {
    _id: string;
    routeId: string;
    routeName: string;
    startStopName: string;
    endStopName: string;
    ticketType: TicketType;
    departureDate: string;
    departureTime: string;
    seatQuantity: number;
    customerName: string;
    customerPhone: string;
    paymentMethodId: string;
    price: number;
    status: TicketStatus;
    purchaseDate?: string | null;
    issueDate?: string | null;
    expiryDate?: string | null;
    usedAt?: string | null;
    qrCode?: string | null;
    qrCodeImage?: string | null;
    createdAt: string;
    updatedAt: string;
}

export type TicketListResponse = {
    items: ITicket[];
    page: number;
    limit: number;
    total: number;
};
