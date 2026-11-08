import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/i18n";
import { FormControls } from "@/screen/Trip/Ticket/Element/FormControls";
import { ticketService } from "@/services/TicketService";
import useTripBookingStore from "@/store/tripBooking.store";
import { parseFormTicketBody } from "@/utils/parseFormTicketBody";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import Passenger from "./Passenger";
import PaymentMethods from "./PaymentMethods";
import TicketSummary from "./TicketSummary";

function goToTicketSuccess() {
    if (router.canDismiss()) {
        router.dismissAll();
    }
    setTimeout(() => {
        router.replace("/trips/tickets/success" as never);
    }, 0);
}

export default function TicketPaymentScreen() {
    const { t } = useTranslation();
    const totalPrice = useTripBookingStore((state) => state.totalPrice);
    const selectedMethodId = useTripBookingStore(
        (state) => state.selectedPaymentMethodId,
    );
    const setLastPurchasedTicket = useTripBookingStore(
        (state) => state.setLastPurchasedTicket,
    );
    const [paying, setPaying] = useState(false);
    const submitting = useRef(false);
    const purchaseRequest = useRef<{ fingerprint: string; key: string } | null>(null);

    const handlePay = async () => {
        if (submitting.current) return;
        if (!selectedMethodId) {
            Toast.show({
                type: "error",
                text1: t("ticket.payment.toastSelectMethod"),
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
            Toast.show({
                type: "error",
                text1: error || t("ticket.payment.createFail"),
            });
            return;
        }

        const fingerprint = JSON.stringify(body);
        if (purchaseRequest.current?.fingerprint !== fingerprint) {
            purchaseRequest.current = {
                fingerprint,
                key: `purchase-${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`,
            };
        }
        submitting.current = true;
        setPaying(true);
        try {
            const response = await ticketService.createTicket({ ...body, purchaseKey: purchaseRequest.current.key });
            const ticket = response.data;
            if (!ticket) {
                throw new Error(
                    response.message || t("ticket.payment.noTicketData"),
                );
            }

            setLastPurchasedTicket(ticket);

            Toast.show({
                type: "success",
                text1: t("ticket.payment.toastSuccess"),
                text2: t("ticket.payment.toastSuccessDesc"),
            });
            goToTicketSuccess();
        } catch (err: unknown) {
            const error = err as { message?: string; response?: { data?: { message?: string } } };
            Toast.show({
                type: "error",
                text1: t("ticket.payment.toastFail"),
                text2: error.response?.data?.message || error.message,
            });
        } finally {
            submitting.current = false;
            setPaying(false);
        }
    };

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={t("ticket.payment.title")} isIconBack={true} />

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
                buttonLabel={
                    paying
                        ? t("ticket.payment.processing")
                        : t("ticket.payment.pay")
                }
                disabled={!selectedMethodId || paying}
                onPress={handlePay}
            />
        </View>
    );
}
