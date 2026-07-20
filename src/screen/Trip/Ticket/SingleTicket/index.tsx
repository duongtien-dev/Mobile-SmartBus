import { Select } from "@/components/Select";
import { PageHeader } from "@/components/PageHeader";
import { SINGLE_TICKET_PRICE } from "@/constants/ticket";
import { FormField } from "@/screen/Trip/Ticket/shared/FormField";
import { FormFooter } from "@/screen/Trip/Ticket/shared/FormFooter";
import { FormSection } from "@/screen/Trip/Ticket/shared/FormSection";
import { ReadonlyField } from "@/screen/Trip/Ticket/shared/ReadonlyField";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

const TIME_OPTIONS = [
    { value: "06:00", label: "06:00" },
    { value: "07:00", label: "07:00" },
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
];

const SEAT_OPTIONS = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
];

export default function SingleTicketScreen() {
    const params = useLocalSearchParams<{
        originName?: string;
        destinationName?: string;
        pickupStopName?: string;
        routeCode?: string;
    }>();

    const [departureDate, setDepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [seatCount, setSeatCount] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const originName = params.originName ?? "Điểm đi";
    const destinationName = params.destinationName ?? "Điểm đến";
    const pickupStopName =
        params.pickupStopName ?? "34 Ngũ Hành Sơn";

    const canSubmit =
        departureDate.trim().length > 0 &&
        departureTime.length > 0 &&
        seatCount.length > 0 &&
        fullName.trim().length > 0 &&
        phoneNumber.trim().length > 0 &&
        acceptedTerms;

    const handleSubmit = () => {
        Toast.show({
            type: "success",
            text1: "Đặt vé thành công",
            text2: "Chức năng thanh toán sẽ được cập nhật sau",
        });
    };

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Vé lượt" isIconBack={true} />

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
                            label="Trạm đón (Trạm lên xe)"
                            value={pickupStopName}
                        />

                        <FormField
                            label="Ngày đi"
                            value={departureDate}
                            placeholder="Chọn ngày đi"
                            onChangeText={setDepartureDate}
                        />

                        <View className="flex-row gap-3">
                            <View className="flex-1 gap-2">
                                <Text className="text-sm font-medium text-primary">
                                    Giờ đi <Text className="text-alert">*</Text>
                                </Text>
                                <Select
                                    value={departureTime}
                                    onValueChange={setDepartureTime}
                                    placeholder="Chọn giờ"
                                    options={TIME_OPTIONS}
                                    triggerClassName="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                                />
                            </View>

                            <View className="flex-1 gap-2">
                                <Text className="text-sm font-medium text-primary">
                                    Số lượng ghế{" "}
                                    <Text className="text-alert">*</Text>
                                </Text>
                                <Select
                                    value={seatCount}
                                    onValueChange={setSeatCount}
                                    placeholder="Chọn"
                                    options={SEAT_OPTIONS}
                                    triggerClassName="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                                />
                            </View>
                        </View>
                    </FormSection>

                    <FormSection title="Thông tin khách hàng">
                        <FormField
                            label="Họ và tên"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Nhập họ và tên"
                        />
                        <FormField
                            label="Số điện thoại"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Nhập số điện thoại"
                            keyboardType="phone-pad"
                        />
                    </FormSection>

                    <FormSection title="Điều khoản và lưu ý">
                        <Text className="text-sm leading-6 text-text-muted">
                            (*) Quý khách vui lòng có mặt tại điểm đón trước ít
                            nhất 10 phút so với thời gian đón.
                        </Text>
                        <Text className="text-sm leading-6 text-text-muted">
                            (*) Vé đã mua không thể đổi, trả hoặc hoàn tiền.
                        </Text>

                        <Pressable
                            className="mt-2 flex-row items-start gap-3 active:opacity-80"
                            onPress={() => setAcceptedTerms((prev) => !prev)}
                        >
                            <View
                                className={`mt-0.5 h-5 w-5 items-center justify-center rounded border-2 ${
                                    acceptedTerms
                                        ? "border-primary bg-primary"
                                        : "border-border bg-background"
                                }`}
                            >
                                {acceptedTerms ? (
                                    <Text className="text-xs font-bold text-on-primary">
                                        ✓
                                    </Text>
                                ) : null}
                            </View>
                            <Text className="flex-1 text-sm leading-6 text-text-primary">
                                Chấp nhận điều khoản đặt vé & chính sách bảo mật
                                thông tin của DanaBus.
                            </Text>
                        </Pressable>
                    </FormSection>
                </ScrollView>

                <FormFooter
                    price={SINGLE_TICKET_PRICE}
                    disabled={!canSubmit}
                    onPress={handleSubmit}
                />
            </KeyboardAvoidingView>
        </View>
    );
}
