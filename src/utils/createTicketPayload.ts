import type { ITicket, TicketType } from "@/models/ticket";
import type { IUser } from "@/models/user";
import type { ITicketProduct } from "@/models/ticketProduct";
import type { ITrip } from "@/models/trip";
import type { CreateTicketBody } from "@/services/TicketService";
import type {
    IMonthlyTicketForm,
    ISearchContext,
    ISingleTicketForm,
} from "@/store/tripBooking.store";

type BookingSnapshot = {
    searchContext: ISearchContext | null;
    selectedTrip: ITrip | null;
    pickupStopName: string;
    routeCode: string;
    ticketType: TicketType | null;
    selectedTicketProduct: ITicketProduct | null;
    singleForm: ISingleTicketForm;
    monthlyForm: IMonthlyTicketForm;
    selectedPaymentMethodId: string;
};

function parseDdMmYyyyToIso(value: string): string | null {
    const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return null;
    const [, dd, mm, yyyy] = match;
    const iso = `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
    if (Number.isNaN(new Date(iso).getTime())) return null;
    return iso;
}

function parseMmYyyyToIso(value: string): string | null {
    const match = value.trim().match(/^(\d{2})\/(\d{4})$/);
    if (!match) return null;
    const [, mm, yyyy] = match;
    const iso = `${yyyy}-${mm}-01T00:00:00.000Z`;
    if (Number.isNaN(new Date(iso).getTime())) return null;
    return iso;
}

function resolveRouteId(state: BookingSnapshot): string | null {
    return (
        state.selectedTrip?.meta?.routeId ||
        state.selectedTrip?.segments.find((s) => s.type === "bus")?.routeId ||
        null
    );
}

function resolveRouteName(state: BookingSnapshot): string {
    return (
        state.selectedTrip?.meta?.routeName ||
        state.selectedTrip?.segments.find((s) => s.type === "bus")?.routeName ||
        state.selectedTrip?.summary?.title ||
        (state.routeCode ? `Tuyến ${state.routeCode}` : "Tuyến xe buýt")
    );
}

export function buildCreateTicketBody(
    state: BookingSnapshot,
    user: IUser | null,
): { body?: CreateTicketBody; error?: string } {
    const ticketType = state.ticketType;
    if (!ticketType) {
        return { error: "Chưa chọn loại vé" };
    }

    const routeId = resolveRouteId(state);
    if (!routeId) {
        return { error: "Thiếu thông tin tuyến" };
    }

    if (!state.selectedPaymentMethodId) {
        return { error: "Vui lòng chọn phương thức thanh toán" };
    }

    const customerName =
        state.singleForm.fullName?.trim() || user?.full_name?.trim() || "";
    const customerPhone =
        state.singleForm.phoneNumber?.trim() || user?.phone?.trim() || "";

    if (!customerName || !customerPhone) {
        return { error: "Thiếu thông tin hành khách (họ tên / SĐT)" };
    }

    const startStopName =
        state.pickupStopName ||
        state.selectedTrip?.segments.find((s) => s.type === "bus")?.pickupStopName ||
        state.searchContext?.originName ||
        "";
    const endStopName =
        state.selectedTrip?.segments.find((s) => s.type === "bus")?.dropoffStopName ||
        state.searchContext?.destinationName ||
        "";

    if (!startStopName || !endStopName) {
        return { error: "Thiếu điểm lên/xuống" };
    }

    const isSingle = ticketType === "single";
    const departureDate = isSingle
        ? parseDdMmYyyyToIso(state.singleForm.departureDate)
        : parseMmYyyyToIso(state.monthlyForm.usageMonth);

    if (!departureDate) {
        return {
            error: isSingle
                ? "Ngày khởi hành không hợp lệ"
                : "Tháng sử dụng không hợp lệ",
        };
    }

    if (isSingle && !state.singleForm.departureTime) {
        return { error: "Vui lòng chọn giờ khởi hành" };
    }

    const seatQuantity = isSingle
        ? Math.max(Number(state.singleForm.seatCount) || 1, 1)
        : Math.max(Number(state.monthlyForm.ticketCount) || 1, 1);

    return {
        body: {
            routeId,
            routeName: resolveRouteName(state),
            startStopName,
            endStopName,
            ticketType,
            departureDate,
            departureTime: isSingle ? state.singleForm.departureTime : "00:00",
            seatQuantity,
            customerName,
            customerPhone,
            paymentMethodId: state.selectedPaymentMethodId,
        },
    };
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
