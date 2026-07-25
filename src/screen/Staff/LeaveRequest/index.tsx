import { Button } from "@/components/Button";
import { DatePickerField } from "@/components/DatePickerField";
import TextArea from "@/components/Input/TextArea";
import { StaffHeader } from "@/components/StaffHeader";
import { useTranslation } from "@/i18n";
import { leaveRequestService } from "@/services/LeaveRequestService";
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
    const { t } = useTranslation();
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
                throw new Error(response.message || t("staff.leave.fail"));
            }

            Toast.show({
                type: "success",
                text1: t("staff.leave.success"),
                text2: t("staff.leave.successDesc"),
            });

            router.replace("/staff/activity-history" as Href);
        } catch {
            Toast.show({
                type: "error",
                text1: t("staff.leave.fail"),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-1 bg-app-shell">
            <StaffHeader title={t("staff.leave.title")} showBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-4 px-4 py-5 pb-10"
                keyboardShouldPersistTaps="handled"
            >
                <Text className="text-sm text-text-secondary">
                    {t("staff.leave.intro")}
                </Text>

                <View className="gap-3 rounded-2xl bg-card p-4 shadow-sm">
                    <DatePickerField
                        label={t("staff.leave.from")}
                        value={fromDate}
                        onChange={handleFromChange}
                        placeholder={t("staff.leave.fromPlaceholder")}
                        minimumDate={minFrom}
                        disabled={isSubmitting}
                    />

                    <DatePickerField
                        label={t("staff.leave.to")}
                        value={toDate}
                        onChange={setToDate}
                        placeholder={t("staff.leave.toPlaceholder")}
                        minimumDate={fromDate ?? minFrom}
                        disabled={isSubmitting}
                    />

                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            {t("staff.leave.reason")}
                        </Text>
                        <TextArea
                            value={reason}
                            onChangeText={setReason}
                            placeholder={t("staff.leave.reasonPlaceholder")}
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
                            t("staff.leave.submit")
                        )}
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
