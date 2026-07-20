import { Select } from "@/components/Select";
import { PageHeader } from "@/components/PageHeader";
import { FormField } from "@/screen/Trip/Ticket/shared/FormField";
import { FormFooter } from "@/screen/Trip/Ticket/shared/FormFooter";
import { FormSection } from "@/screen/Trip/Ticket/shared/FormSection";
import { ReadonlyField } from "@/screen/Trip/Ticket/shared/ReadonlyField";
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

    const originName = searchContext?.originName ?? "Điểm đi";
    const destinationName = searchContext?.destinationName ?? "Điểm đến";
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

    const canSubmit =
        usageMonth.trim().length > 0 && ticketCount.length > 0;

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
                    <FormSection title="Điểm đi / đến">
                        <ReadonlyField label="Điểm đi" value={originName} />
                        <ReadonlyField
                            label="Điểm đến"
                            value={destinationName}
                        />
                    </FormSection>

                    <FormSection title="Thông tin lượt đi">
                        <ReadonlyField
                            label="Trạm đón (Có thể lên tại bất kỳ trạm nào)"
                            value="Không giới hạn"
                        />

                        <FormField
                            label="Tháng sử dụng"
                            value={usageMonth}
                            placeholder="Chọn tháng sử dụng"
                            onChangeText={(value) =>
                                updateMonthlyForm({ usageMonth: value })
                            }
                        />

                        <View className="flex-row gap-3">
                            <View className="flex-1">
                                <ReadonlyField
                                    label="Giờ đi"
                                    value="Không giới hạn"
                                />
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
                    </FormSection>
                </ScrollView>

                <FormFooter
                    price={totalPrice}
                    disabled={!canSubmit}
                    onPress={handleSubmit}
                />
            </KeyboardAvoidingView>
        </View>
    );
}
