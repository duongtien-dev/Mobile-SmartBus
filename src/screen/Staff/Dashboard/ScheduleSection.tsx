import { useTranslation } from "@/i18n";
import { ActivityIndicator, Text, View } from "react-native";
import { ExpandableScheduleCard } from "./ExpandableScheduleCard";
import { useStaffWeekSchedule } from "./hooks/useStaffWeekSchedule";

export function ScheduleSection() {
    const { t } = useTranslation();
    const {
        items,
        loading,
        expandedId,
        checkInLabel,
        isCheckingIn,
        toggleExpanded,
        handleCheckIn,
    } = useStaffWeekSchedule();

    return (
        <View className="gap-3">
            <View>
                <Text className="text-base font-bold text-text-primary">
                    {t("staff.schedule.title")}
                </Text>
                <Text className="mt-0.5 text-xs text-text-muted">
                    {t("staff.schedule.subtitle")}
                </Text>
            </View>

            {loading ? (
                <View className="items-center rounded-2xl bg-card py-6 shadow-sm">
                    <ActivityIndicator color="#005f8b" />
                </View>
            ) : items.length === 0 ? (
                <View className="rounded-2xl bg-card px-4 py-5 shadow-sm">
                    <Text className="text-sm text-text-muted">
                        {t("staff.schedule.empty")}
                    </Text>
                </View>
            ) : (
                <View className="gap-2.5">
                    {items.map((item) => (
                        <ExpandableScheduleCard
                            key={item._id}
                            item={item}
                            expanded={expandedId === item._id}
                            onToggle={() => toggleExpanded(item._id)}
                            onCheckIn={() => handleCheckIn(item)}
                            checkInLabel={checkInLabel}
                            checkInDisabled={isCheckingIn}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}
