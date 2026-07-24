import { StaffHeader } from "@/components/StaffHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import {
    STAFF_SHIFT_HISTORY_MOCK,
    STAFF_SHIFT_STATUS_LABEL,
    type StaffShiftReportStatus,
} from "@/constants/staff";
import { FlatList, Text, View } from "react-native";

function statusVariant(
    status: StaffShiftReportStatus,
): "warning" | "success" | "danger" {
    if (status === "approved") return "success";
    if (status === "rejected") return "danger";
    return "warning";
}

function ShiftHistoryCard({
    date,
    status,
    routeName,
    passengerCount,
}: {
    date: string;
    status: StaffShiftReportStatus;
    routeName: string;
    passengerCount: number;
}) {
    return (
        <View className="border-b border-border px-5 py-4">
            <View className="mb-3 flex-row items-center justify-between gap-3">
                <Text className="text-base font-bold text-text-primary">
                    {date}
                </Text>
                <StatusPill
                    label={STAFF_SHIFT_STATUS_LABEL[status]}
                    variant={statusVariant(status)}
                    className="rounded-md"
                />
            </View>

            <View className="mb-3 h-px bg-border" />

            <View className="flex-row">
                <View className="flex-1 gap-1">
                    <Text className="text-xs text-text-muted">Tuyến chạy</Text>
                    <Text className="text-sm font-semibold text-primary">
                        {routeName}
                    </Text>
                </View>
                <View className="flex-1 items-end gap-1">
                    <Text className="text-xs text-text-muted">Đã phục vụ</Text>
                    <Text className="text-sm font-semibold text-primary">
                        {passengerCount} hành khách
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default function StaffShiftHistoryScreen() {
    return (
        <View className="flex-1 bg-card">
            <StaffHeader title="Lịch sử ca làm" showBack />

            <FlatList
                data={STAFF_SHIFT_HISTORY_MOCK}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ShiftHistoryCard
                        date={item.date}
                        status={item.status}
                        routeName={item.routeName}
                        passengerCount={item.passengerCount}
                    />
                )}
                ListEmptyComponent={
                    <Text className="px-5 py-10 text-center text-sm text-text-muted">
                        Chưa có lịch sử ca làm
                    </Text>
                }
            />
        </View>
    );
}
