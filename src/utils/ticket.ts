import type { ITicket, TicketStatus, TicketType } from "@/models/ticket";
import type { ITicketProduct } from "@/models/ticketProduct";
import { translate } from "@/i18n/translations";
import useLocaleStore from "@/store/locale.store";
import { formatAmount } from "@/utils/formatCurrency";

function t(key: string, params?: Record<string, string | number>) {
    return translate(useLocaleStore.getState().locale, key, params);
}

const TICKET_STATUS_BADGE: Record<TicketStatus, string> = {
    pending: "bg-highlight-light text-highlight-dark",
    paid: "bg-accent-light text-accent-dark",
    active: "bg-accent-light text-accent-dark",
    used: "bg-text-muted/15 text-text-muted",
    expired: "bg-text-muted/15 text-text-muted",
    cancelled: "bg-alert/15 text-alert",
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
    return t(`ticket.type.${ticketType}`);
}

export function getTicketStatusConfig(status: TicketStatus) {
    return {
        label: t(`ticket.status.${status}`),
        badgeClass: TICKET_STATUS_BADGE[status],
    };
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

    return t("ticket.subtitle.month", {
        month: pad(date.getMonth() + 1),
        year: date.getFullYear(),
    });
}

export function getTicketValidityLabel(ticket: ITicket) {
    if (ticket.ticketType === "single") {
        return t("ticket.validity.single", {
            date: formatDate(ticket.departureDate),
        });
    }

    const source = ticket.expiryDate ?? ticket.issueDate;
    const date = source ? new Date(source) : null;
    if (!date || Number.isNaN(date.getTime())) {
        return t("ticket.validity.single", { date: "—" });
    }

    return t("ticket.validity.month", {
        month: pad(date.getMonth() + 1),
        year: date.getFullYear(),
    });
}

export function getTicketRouteTitle(ticket: ITicket) {
    return ticket.routeName.replace(/^Tuyến\s+/i, "").replace(/^Route\s+/i, "");
}

export function getTripHistoryDateLabel(ticket: ITicket) {
    const source = ticket.usedAt ?? ticket.departureDate ?? ticket.createdAt;
    return formatDate(source);
}

export function getTripHistoryTimeLabel(ticket: ITicket) {
    if (ticket.usedAt) {
        const date = new Date(ticket.usedAt);
        if (!Number.isNaN(date.getTime())) {
            return `${pad(date.getHours())}:${pad(date.getMinutes())} | ${formatDate(ticket.usedAt)}`;
        }
    }

    return getTicketSubtitle(ticket);
}

export function getTripHistoryStatusLabel(ticket: ITicket) {
    if (ticket.status === "used" || ticket.usedAt) {
        return t("ticket.status.used");
    }

    if (ticket.status === "expired") {
        return t("ticket.expired");
    }

    return t("ticket.completed");
}

export function formatTicketPrice(product: ITicketProduct) {
    const formatted = formatAmount(product.unitPrice);
    if (product.code === "single") {
        return t("ticket.pricePerRide", { amount: formatted });
    }
    return t("common.currencyVnd", { amount: formatted });
}

export function getTicketDisplayCode(ticket: Pick<ITicket, "_id" | "qrCode">) {
    const fromId = ticket._id.replace(/[^0-9a-f]/gi, "").slice(-8);
    if (fromId.length === 8) {
        return fromId
            .split("")
            .map((ch) => {
                const n = parseInt(ch, 16);
                return Number.isNaN(n) ? "0" : String(n % 10);
            })
            .join("");
    }
    return (ticket.qrCode || ticket._id).slice(-8).toUpperCase();
}
