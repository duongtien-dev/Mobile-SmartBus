import { PageHeader } from "@/components/PageHeader";
import { FormControls } from "@/screen/Trip/Ticket/Element/FormControls";
import { ticketService } from "@/services/TicketService";
import useTripBookingStore from "@/store/tripBooking.store";
import { parseFormTicketBody } from "@/utils/parseFormTicketBody";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import Passenger from "./Passenger";
import PaymentMethods from "./PaymentMethods";
import TicketSummary from "./TicketSummary";

function goToTicketSuccess() {
    // dismissAll rồi replace — tránh race (dismiss bị nuốt nếu navigate ngay)
    // Stack mua vé bị xóa; success đứng một mình → back không về form
    if (router.canDismiss()) {
        router.dismissAll();
    }
    setTimeout(() => {
        router.replace("/trips/tickets/success" as never);
    }, 0);
}

export default function TicketPaymentScreen() {
    const totalPrice = useTripBookingStore((state) => state.totalPrice);
    const selectedMethodId = useTripBookingStore(
        (state) => state.selectedPaymentMethodId,
    );
    const setLastPurchasedTicket = useTripBookingStore(
        (state) => state.setLastPurchasedTicket,
    );
    const [paying, setPaying] = useState(false);

    const handlePay = async () => {
        if (!selectedMethodId) {
            Toast.show({
                type: "error",
                text1: "Vui lòng chọn phương thức thanh toán",
            });
            return;
        }

        const state = useTripBookingStore.getState();
        const { body, error } = parseFormTicketBody({
            bookingSelection: state.bookingSelection,
            ticketType: state.ticketType,
            singleForm: state.singleForm,
            monthlyForm: state.monthlyForm,
            selectedPaymentMethodId: state.selectedPaymentMethodId,
        });
        if (error || !body) {
            Toast.show({ type: "error", text1: error || "Không thể tạo vé" });
            return;
        }

        setPaying(true);
        try {
            const response = await ticketService.createTicket(body);
            const ticket = response.data;
            if (!ticket) {
                throw new Error(response.message || "Không nhận được dữ liệu vé");
            }

            setLastPurchasedTicket(ticket);

            Toast.show({
                type: "success",
                text1: "Thanh toán thành công",
                text2: "Vé của bạn đã sẵn sàng",
            });
            goToTicketSuccess();
        } catch (err: unknown) {
            Toast.show({
                type: "error",
                text1: "Thanh toán thất bại",
                text2: (err as Error).message,
            });
        } finally {
            setPaying(false);
        }
    };

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title="Thanh toán" isIconBack={true} />

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-5 pb-8 pt-5"
                showsVerticalScrollIndicator={false}
            >
                <TicketSummary />
                <Passenger />
                <PaymentMethods />
            </ScrollView>

            <FormControls
                price={totalPrice}
                buttonLabel={paying ? "Đang xử lý..." : "Thanh toán"}
                disabled={!selectedMethodId || paying}
                onPress={handlePay}
            />
        </View>
    );
}
