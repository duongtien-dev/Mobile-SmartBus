import { PageHeader } from "@/components/PageHeader";
import { FormControls } from "@/screen/Trip/Ticket/Element/FormControls";
import useTripBookingStore from "@/store/tripBooking.store";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import PaymentMethods from "./PaymentMethods";
import TicketSummary from "./TicketSummary";
import Passenger from "./Passenger";

export default function TicketPaymentScreen() {
    const getTicketLabel = useTripBookingStore((state) => state.getTicketLabel);
    const totalPrice = useTripBookingStore((state) => state.totalPrice);
    const selectedMethodId = useTripBookingStore((state) => state.selectedPaymentMethodId);
    const ticketLabel = getTicketLabel();

    const handlePay = () => {
        if (!selectedMethodId) {
            Toast.show({ type: "error", text1: "Vui lòng chọn phương thức thanh toán" });
            return;
        }
        Toast.show({
            type: "success",
            text1: "Thanh toán (demo)",
            text2: `${ticketLabel} • ${totalPrice.toLocaleString("vi-VN")} đồng`,
        });
    };

    return (
        <View className="flex-1 bg-background">
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
                buttonLabel="Thanh toán"
                disabled={!selectedMethodId}
                onPress={handlePay}
            />
        </View>
    );
}
