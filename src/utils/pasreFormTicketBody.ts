import type { IUser } from "@/models/user";
import type { CreateTicketBody } from "@/services/TicketService";
import type {
    IBookingSelection,
    IMonthlyTicketForm,
    ISingleTicketForm,
} from "@/store/tripBooking.store";
import type { TicketType } from "@/models/ticket";
import { parseDdMmYyyyToIso, parseMmYyyyToIso } from "@/utils/date";

type ParseFormTicketBodyInput = {
    bookingSelection: IBookingSelection | null;
    ticketType: TicketType | null;
    singleForm: ISingleTicketForm;
    monthlyForm: IMonthlyTicketForm;
    selectedPaymentMethodId: string;
    user: IUser | null;
};

export function parseFormTicketBody(
    input: ParseFormTicketBodyInput,
): { body?: CreateTicketBody; error?: string } {
    const {
        bookingSelection,
        ticketType,
        singleForm,
        monthlyForm,
        selectedPaymentMethodId,
        user,
    } = input;

    if (!ticketType) {
        return { error: "Chưa chọn loại vé" };
    }

    if (!bookingSelection?.routeId) {
        return { error: "Thiếu thông tin tuyến" };
    }

    if (!selectedPaymentMethodId) {
        return { error: "Vui lòng chọn phương thức thanh toán" };
    }

    const customerName =
        singleForm.fullName?.trim() || user?.full_name?.trim() || "";
    const customerPhone =
        singleForm.phoneNumber?.trim() || user?.phone?.trim() || "";

    if (!customerName || !customerPhone) {
        return { error: "Thiếu thông tin hành khách (họ tên / SĐT)" };
    }

    const { startStopName, endStopName, routeId } = bookingSelection;
    if (!startStopName || !endStopName) {
        return { error: "Thiếu điểm lên/xuống" };
    }

    const isSingle = ticketType === "single";
    const departureDate = isSingle
        ? parseDdMmYyyyToIso(singleForm.departureDate)
        : parseMmYyyyToIso(monthlyForm.usageMonth);

    if (!departureDate) {
        return {
            error: isSingle
                ? "Ngày khởi hành không hợp lệ"
                : "Tháng sử dụng không hợp lệ",
        };
    }

    if (isSingle && !singleForm.departureTime) {
        return { error: "Vui lòng chọn giờ khởi hành" };
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
            departureTime: isSingle ? singleForm.departureTime : "00:00",
            seatQuantity,
            customerName,
            customerPhone,
            paymentMethodId: selectedPaymentMethodId,
        },
    };
}
