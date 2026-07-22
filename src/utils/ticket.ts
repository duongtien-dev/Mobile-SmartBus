import type { ITicket, TicketStatus, TicketType } from "@/models/ticket";

const TICKET_TYPE_LABELS: Record<TicketType, string> = {
    single: "Vé lượt",
    monthlySingleRoute: "Vé đơn tuyến",
    monthlyInterRoute: "Vé liên tuyến",
};

const TICKET_STATUS_CONFIG: Record<
    TicketStatus,
    { label: string; badgeClass: string }
> = {
    pending: {
        label: "Chờ sử dụng",
        badgeClass: "bg-highlight-light text-highlight-dark",
    },
    paid: {
        label: "Khả dụng",
        badgeClass: "bg-accent-light text-accent-dark",
    },
    active: {
        label: "Khả dụng",
        badgeClass: "bg-accent-light text-accent-dark",
    },
    used: {
        label: "Đã sử dụng",
        badgeClass: "bg-text-muted/15 text-text-muted",
    },
    expired: {
        label: "Hết hạn",
        badgeClass: "bg-text-muted/15 text-text-muted",
    },
    cancelled: {
        label: "Đã hủy",
        badgeClass: "bg-alert/15 text-alert",
    },
};

function pad(value: number) {
    return String(value).padStart(2, "0");
}

function formatDate(value?: string | null) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function getTicketTypeLabel(ticketType: TicketType) {
    return TICKET_TYPE_LABELS[ticketType];
}

export function getTicketStatusConfig(status: TicketStatus) {
    return TICKET_STATUS_CONFIG[status];
}

export function getTicketSubtitle(ticket: ITicket) {
    if (ticket.ticketType === "single") {
        return `${ticket.departureTime} | ${formatDate(ticket.departureDate)}`;
    }

    const source = ticket.expiryDate ?? ticket.issueDate ?? ticket.departureDate;
    const date = source ? new Date(source) : null;
    if (!date || Number.isNaN(date.getTime())) {
        return "—";
    }

    return `Tháng ${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function getTicketValidityLabel(ticket: ITicket) {
    if (ticket.ticketType === "single") {
        return `Hiệu lực: ${formatDate(ticket.departureDate)}`;
    }

    const source = ticket.expiryDate ?? ticket.issueDate;
    const date = source ? new Date(source) : null;
    if (!date || Number.isNaN(date.getTime())) {
        return "Hiệu lực: —";
    }

    return `Hiệu lực: Tháng ${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function getTicketRouteTitle(ticket: ITicket) {
    return ticket.routeName.replace(/^Tuyến\s+/i, "");
}
