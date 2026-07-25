import { useTranslation } from "@/i18n";
import type { IStaffScheduleItem } from "@/models/staffSchedule";
import { Bus, ChevronDown, ChevronUp } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Props = {
    item: IStaffScheduleItem;
    expanded: boolean;
    onToggle: () => void;
    onCheckIn: () => void;
    checkInLabel: string;
    checkInDisabled?: boolean;
};

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row items-start justify-between gap-3 py-1.5">
            <Text className="text-sm text-text-muted">{label}</Text>
            <Text className="flex-1 text-right text-sm font-medium text-text-primary">
                {value || "—"}
            </Text>
        </View>
    );
}

export function ExpandableScheduleCard(props: Props) {
    const { t } = useTranslation();
    const {
        item,
        expanded,
        onToggle,
        onCheckIn,
        checkInLabel,
        checkInDisabled,
    } = props;

    const Chevron = expanded ? ChevronUp : ChevronDown;

    return (
        <View className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <Pressable
                accessibilityRole="button"
                onPress={onToggle}
                className="flex-row items-center gap-3 px-4 py-3.5 active:opacity-90"
            >
                <Bus
                    color={item.isToday ? "#00a2e8" : "#64748b"}
                    size={20}
                />
                <View className="flex-1 flex-row flex-wrap items-center gap-x-2">
                    <Text
                        className={`text-sm font-bold ${
                            item.isToday ? "text-accent" : "text-text-primary"
                        }`}
                    >
                        {item.dateLabel}
                    </Text>
                    <Text className="text-sm text-text-secondary">
                        {item.periodLabel} ({item.timeRange})
                    </Text>
                </View>
                <Chevron color="#64748b" size={18} />
            </Pressable>

            {expanded ? (
                <View className="border-t border-border bg-surface px-4 pb-4 pt-3">
                    <DetailRow
                        label={t("staff.schedule.route")}
                        value={item.routeName}
                    />
                    <DetailRow
                        label={t("staff.schedule.plate")}
                        value={item.plateNumber}
                    />
                    <DetailRow
                        label={t("staff.schedule.status")}
                        value={item.statusLabel}
                    />

                    {item.isToday ? (
                        <Pressable
                            accessibilityRole="button"
                            onPress={onCheckIn}
                            disabled={checkInDisabled}
                            className="mt-4 items-center rounded-xl bg-[#22c55e] px-4 py-3.5 active:opacity-90"
                        >
                            <Text className="text-sm font-bold uppercase tracking-wide text-white">
                                {checkInLabel}
                            </Text>
                        </Pressable>
                    ) : null}
                </View>
            ) : null}
        </View>
    );
}
