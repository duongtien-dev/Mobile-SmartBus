import { Select } from "@/components/Select";
import { PageHeader } from "@/components/PageHeader";
import useTripBookingStore, {
    computeMonthlyTicketPrice,
} from "@/store/tripBooking.store";
import { router } from "expo-router";
import { useMemo } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { LocationInfo } from "../Element/LocationInfo";
import { FormControls } from "../Element/FormControls";
import { TicketInfo } from "./TicketInfo";
import { InputOption } from "./InputOption";

const TICKET_COUNT_OPTIONS = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
];

export default function MonthlyTicketScreen() {
    const searchContext = useTripBookingStore((state) => state.searchContext);
    const ticketType = useTripBookingStore((state) => state.ticketType);
    const formData = useTripBookingStore((state) => state.monthlyForm);
    const handleChangForm = useTripBookingStore(
        (state) => state.updateMonthlyForm,
    );
    const setTotalPrice = useTripBookingStore((state) => state.setTotalPrice);

    const originName = searchContext?.originName;
    const destinationName = searchContext?.destinationName;
    const isMultiRoute = ticketType === "monthly-multi";

    const pageTitle = useMemo(
        () =>
            isMultiRoute ? "Vé tháng liên tuyến" : "Vé tháng đơn tuyến",
        [isMultiRoute],
    );

    const { usageMonth, ticketCount } = formData;

    const totalPrice = useMemo(
        () => computeMonthlyTicketPrice(ticketCount),
        [ticketCount],
    );

    const handleSubmit = () => {
        setTotalPrice(totalPrice);
        router.push("/trips/tickets/payment" as never);
    };

    return (
        <View className="flex-1 bg-background">
            <PageHeader title={pageTitle} isIconBack={true} />

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="gap-6 px-5 pb-6 pt-2"
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <LocationInfo
                        originName={originName}
                        destinationName={destinationName}
                    />
                    <View className="gap-4">
                        <TicketInfo usageMonth={usageMonth} />
                        <InputOption
                            value={ticketCount}
                            onChange={(value) => handleChangForm({ ticketCount: value })}
                            options={TICKET_COUNT_OPTIONS}
                        />
                    </View>
                </ScrollView>

                <FormControls
                    price={totalPrice}
                    onPress={handleSubmit}
                />
            </KeyboardAvoidingView>
        </View>
    );
}
