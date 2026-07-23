import type { CreateTicketBody } from "@/services/TicketService";
import type {
    IBookingSelection,
    IMonthlyTicketForm,
    ISingleTicketForm,
} from "@/store/tripBooking.store";
import type { TicketType } from "@/models/ticket";

type ParseFormTicketBodyInput = {
    bookingSelection: IBookingSelection | null;
    ticketType: TicketType | null;
    singleForm: ISingleTicketForm;
    monthlyForm: IMonthlyTicketForm;
    selectedPaymentMethodId: string;
};

/** Map store → API body. Date/customer do backend xử lý. */
export function parseFormTicketBody(
    input: ParseFormTicketBodyInput,
): { body?: CreateTicketBody; error?: string } {
    const {
        bookingSelection,
        ticketType,
        singleForm,
        monthlyForm,
        selectedPaymentMethodId,
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

    const { startStopName, endStopName, routeId } = bookingSelection;
    if (!startStopName || !endStopName) {
        return { error: "Thiếu điểm lên/xuống" };
    }

    const isSingle = ticketType === "single";
    const departureDate = isSingle
        ? singleForm.departureDate.trim()
        : monthlyForm.usageMonth.trim();

    if (!departureDate) {
        return {
            error: isSingle
                ? "Vui lòng chọn ngày khởi hành"
                : "Vui lòng chọn tháng sử dụng",
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
            departureTime: isSingle ? singleForm.departureTime : undefined,
            seatQuantity,
            paymentMethodId: selectedPaymentMethodId,
        },
    };
}
