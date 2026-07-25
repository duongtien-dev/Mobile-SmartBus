import { translate } from "@/i18n/translations";
import type { TicketType } from "@/models/ticket";
import type {
    IBookingSelection,
    IMonthlyTicketForm,
    ISingleTicketForm,
} from "@/store/tripBooking.store";
import useLocaleStore from "@/store/locale.store";

type ParseFormTicketBodyInput = {
    bookingSelection: IBookingSelection | null;
    ticketType: TicketType | null;
    singleForm: ISingleTicketForm;
    monthlyForm: IMonthlyTicketForm;
    selectedPaymentMethodId: string;
};

interface CreateTicketBody {
    routeId: string;
    startStopName: string;
    endStopName: string;
    ticketType: TicketType;
    departureDate: string;
    departureTime?: string;
    seatQuantity: number;
    paymentMethodId: string;
}
/** Map store → API body. Date/customer do backend xử lý. */
export function parseFormTicketBody(
    input: ParseFormTicketBodyInput,
): { body?: CreateTicketBody; error?: string } {
    const locale = useLocaleStore.getState().locale;
    const t = (key: string) => translate(locale, key);

    const {
        bookingSelection,
        ticketType,
        singleForm,
        monthlyForm,
        selectedPaymentMethodId,
    } = input;

    if (!ticketType) {
        return { error: t("ticket.validation.noProduct") };
    }

    if (!bookingSelection?.routeId) {
        return { error: t("ticket.validation.missingRoute") };
    }

    if (!selectedPaymentMethodId) {
        return { error: t("ticket.payment.toastSelectMethod") };
    }

    const { startStopName, endStopName, routeId } = bookingSelection;
    if (!startStopName || !endStopName) {
        return { error: t("ticket.validation.missingStops") };
    }

    const isSingle = ticketType === "single";
    const departureDate = isSingle
        ? singleForm.departureDate.trim()
        : monthlyForm.usageMonth.trim();

    if (!departureDate) {
        return {
            error: isSingle
                ? t("ticket.validation.needDate")
                : t("ticket.validation.needMonth"),
        };
    }

    if (isSingle && !singleForm.departureTime) {
        return { error: t("ticket.validation.needTime") };
    }

    const seatQuantity = isSingle
        ? Math.max(Number(singleForm.seatCount) || 1, 1)
        : Math.max(Number(monthlyForm.ticketCount) || 1, 1);

    return {
        body: {
            routeId,
            startStopName,
            endStopName,
            ticketType,
            departureDate,
            departureTime: isSingle ? singleForm.departureTime : undefined,
            seatQuantity,
            paymentMethodId: selectedPaymentMethodId,
        },
    };
}
