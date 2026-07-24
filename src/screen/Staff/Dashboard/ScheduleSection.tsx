import type { IStaffScheduleItem } from "@/models/staffSchedule";
import { ActivityIndicator, Text, View } from "react-native";
import { ExpandableScheduleCard } from "./ExpandableScheduleCard";

type ScheduleSectionProps = {
    items: IStaffScheduleItem[];
    loading: boolean;
    expandedId: string;
    checkInLabel: string;
    isCheckingIn: boolean;
    onToggle: (id: string) => void;
    onCheckIn: (item: IStaffScheduleItem) => void;
};

export function ScheduleSection({
    items,
    loading,
    expandedId,
    checkInLabel,
    isCheckingIn,
    onToggle,
    onCheckIn,
}: ScheduleSectionProps) {
    return (
        <View className="gap-3">
            <View>
                <Text className="text-base font-bold text-text-primary">
                    Lịch ca tuần này
                </Text>
                <Text className="mt-0.5 text-xs text-text-muted">
                    Lịch được giao từ hệ thống — nhận / tiếp tục ca bằng nút
                    phía trên hoặc trong ca hôm nay.
                </Text>
            </View>

            {loading ? (
                <View className="items-center rounded-2xl bg-card py-6 shadow-sm">
                    <ActivityIndicator color="#005f8b" />
                </View>
            ) : items.length === 0 ? (
                <View className="rounded-2xl bg-card px-4 py-5 shadow-sm">
                    <Text className="text-sm text-text-muted">
                        Chưa có lịch ca tuần này. Liên hệ admin để được xếp
                        lịch.
                    </Text>
                </View>
            ) : (
                <View className="gap-2.5">
                    {items.map((item) => (
                        <ExpandableScheduleCard
                            key={item._id}
                            item={item}
                            expanded={expandedId === item._id}
                            onToggle={() => onToggle(item._id)}
                            onCheckIn={() => onCheckIn(item)}
                            checkInLabel={checkInLabel}
                            checkInDisabled={isCheckingIn}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}
