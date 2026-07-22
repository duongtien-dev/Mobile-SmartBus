import { Select } from "@/components/Select";
import { PageHeader } from "@/components/PageHeader";
import { FormControls } from "@/screen/Trip/Ticket/shared/FormControls";
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

const TICKET_COUNT_OPTIONS = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
];

export default function MonthlyTicketScreen() {
    const searchContext = useTripBookingStore((state) => state.searchContext);
    const ticketType = useTripBookingStore((state) => state.ticketType);
    const monthlyForm = useTripBookingStore((state) => state.monthlyForm);
    const updateMonthlyForm = useTripBookingStore(
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

    const { usageMonth, ticketCount } = monthlyForm;

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
                    <View className="gap-4">
                        <Text className="text-base font-bold text-primary">Điểm đi / đến</Text>
                        <FormField labelText="Điểm đi">
                            <InputText
                                value={originName}
                                editable={false}
                                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                            />
                        </FormField>
                        <FormField labelText="Điểm đến">
                            <InputText
                                value={destinationName}
                                editable={false}
                                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                            />
                        </FormField>
                    </View>

                    <View className="gap-4">
                        <Text className="text-base font-bold text-primary">Thông tin lượt đi</Text>
                        <FormField labelText="Trạm đón (Có thể lên tại bất kỳ trạm nào)">
                            <InputText
                                value="Không giới hạn"
                                editable={false}
                                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                            />
                        </FormField>

                        <FormField labelText="Tháng sử dụng">
                            <InputText
                                value={usageMonth}
                                editable={false}
                                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                            />
                        </FormField>

                        <View className="flex-row gap-3">
                            <View className="flex-1">
                                <FormField labelText="Giờ đi">
                                    <InputText
                                        value="Không giới hạn"
                                        editable={false}
                                        className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                                    />
                                </FormField>
                            </View>

                            <View className="flex-1 gap-2">
                                <Text className="text-sm font-medium text-primary">
                                    Số lượng vé{" "}
                                    <Text className="text-alert">*</Text>
                                </Text>
                                <Select
                                    value={ticketCount}
                                    onValueChange={(value) =>
                                        updateMonthlyForm({ ticketCount: value })
                                    }
                                    placeholder="Chọn"
                                    options={TICKET_COUNT_OPTIONS}
                                    triggerClassName="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                                />
                            </View>
                        </View>
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
