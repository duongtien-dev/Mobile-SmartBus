import { Button } from "@/components/Button";
import { DatePickerField } from "@/components/DatePickerField";
import TextArea from "@/components/Input/TextArea";
import { StaffHeader } from "@/components/StaffHeader";
import { leaveRequestService } from "@/services/LeaveRequestService";
import { getApiErrorMessage } from "@/utils/apiError";
import { router, type Href } from "expo-router";
import moment from "moment";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

function startOfToday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

export default function StaffLeaveRequestScreen() {
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const minFrom = useMemo(() => startOfToday(), []);

    const isFormValid =
        !!fromDate &&
        !!toDate &&
        moment(toDate).isSameOrAfter(moment(fromDate), "day") &&
        reason.trim().length > 0;

    const handleFromChange = (date: Date) => {
        setFromDate(date);
        if (toDate && moment(toDate).isBefore(moment(date), "day")) {
            setToDate(date);
        }
    };

    const handleSubmit = async () => {
        if (!isFormValid || !fromDate || !toDate || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await leaveRequestService.submit({
                startDate: moment(fromDate).format("DD/MM/YYYY"),
                endDate: moment(toDate).format("DD/MM/YYYY"),
                reason: reason.trim(),
            });

            if (!response.success) {
                throw new Error(response.message || "Gửi đơn thất bại");
            }

            Toast.show({
                type: "success",
                text1: "Đã gửi đơn xin nghỉ",
                text2: "Chờ duyệt trong Lịch sử hoạt động",
            });

            router.replace("/staff/activity-history" as Href);
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Gửi đơn xin nghỉ thất bại",
                text2: getApiErrorMessage(err),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-1 bg-app-shell">
            <StaffHeader title="Xin nghỉ" showBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-4 px-4 py-5 pb-10"
                keyboardShouldPersistTaps="handled"
            >
                <Text className="text-sm text-text-secondary">
                    Chọn khoảng ngày nghỉ và nhập lý do để gửi yêu cầu.
                </Text>

                <View className="gap-3 rounded-2xl bg-card p-4 shadow-sm">
                    <DatePickerField
                        label="Từ ngày"
                        value={fromDate}
                        onChange={handleFromChange}
                        placeholder="Chọn ngày bắt đầu"
                        minimumDate={minFrom}
                        disabled={isSubmitting}
                    />

                    <DatePickerField
                        label="Đến ngày"
                        value={toDate}
                        onChange={setToDate}
                        placeholder="Chọn ngày kết thúc"
                        minimumDate={fromDate ?? minFrom}
                        disabled={isSubmitting}
                    />

                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Lý do
                        </Text>
                        <TextArea
                            value={reason}
                            onChangeText={setReason}
                            placeholder="Nhập lý do xin nghỉ"
                            editable={!isSubmitting}
                        />
                    </View>

                    <Button
                        className="mt-2"
                        disabled={!isFormValid || isSubmitting}
                        onPress={handleSubmit}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            "Gửi yêu cầu"
                        )}
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
