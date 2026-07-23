import { PageHeader } from "@/components/PageHeader";
import { FormControls } from "@/screen/Trip/Ticket/Element/FormControls";
import { ticketService } from "@/services/TicketService";
import useAuthStore from "@/store/auth.store";
import useTripBookingStore from "@/store/tripBooking.store";
import { buildCreateTicketBody } from "@/utils/createTicketPayload";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import Passenger from "./Passenger";
import PaymentMethods from "./PaymentMethods";
import TicketSummary from "./TicketSummary";

export default function TicketPaymentScreen() {
    const totalPrice = useTripBookingStore((state) => state.totalPrice);
    const selectedMethodId = useTripBookingStore(
        (state) => state.selectedPaymentMethodId,
    );
    const setLastPurchasedTicket = useTripBookingStore(
        (state) => state.setLastPurchasedTicket,
    );
    const user = useAuthStore((state) => state.user);
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
        const { body, error } = buildCreateTicketBody(state, user);
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
            // Không resetBooking() ở đây — TripSearch còn trên stack sẽ search lại với origin undefined.
            // Success screen sẽ dọn booking (giữ lastPurchasedTicket).
            router.replace("/trips/tickets/success" as never);
        } catch (err: unknown) {
            let message = "Vui lòng thử lại";
            if (
                err &&
                typeof err === "object" &&
                "response" in err &&
                err.response &&
                typeof err.response === "object" &&
                "data" in err.response &&
                err.response.data &&
                typeof err.response.data === "object" &&
                "message" in err.response.data &&
                typeof err.response.data.message === "string"
            ) {
                message = err.response.data.message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            Toast.show({
                type: "error",
                text1: "Thanh toán thất bại",
                text2: message,
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
