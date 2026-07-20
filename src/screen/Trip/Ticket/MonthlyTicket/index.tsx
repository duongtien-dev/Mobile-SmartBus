import { Select } from "@/components/Select";
import { PageHeader } from "@/components/PageHeader";
import { MONTHLY_TICKET_PRICE } from "@/constants/ticket";
import { FormField } from "@/screen/Trip/Ticket/shared/FormField";
import { FormFooter } from "@/screen/Trip/Ticket/shared/FormFooter";
import { FormSection } from "@/screen/Trip/Ticket/shared/FormSection";
import { ReadonlyField } from "@/screen/Trip/Ticket/shared/ReadonlyField";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
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
    const params = useLocalSearchParams<{
        originName?: string;
        destinationName?: string;
        ticketType?: string;
    }>();

    const [usageMonth, setUsageMonth] = useState("");
    const [ticketCount, setTicketCount] = useState("");

    const originName = params.originName ?? "Điểm đi";
    const destinationName = params.destinationName ?? "Điểm đến";
    const isMultiRoute = params.ticketType === "monthly-multi";

    const pageTitle = useMemo(
        () =>
            isMultiRoute ? "Vé tháng liên tuyến" : "Vé tháng đơn tuyến",
        [isMultiRoute],
    );

    const totalPrice = useMemo(() => {
        const count = Number(ticketCount) || 1;
        return MONTHLY_TICKET_PRICE * count;
    }, [ticketCount]);

    const canSubmit =
        usageMonth.trim().length > 0 && ticketCount.length > 0;

    const handleSubmit = () => {
        router.push({
            pathname: "/trips/tickets/payment",
            params: {
                ticketLabel: pageTitle,
                price: String(totalPrice),
            },
        });
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
                            onChangeText={setUsageMonth}
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
                                    onValueChange={setTicketCount}
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
