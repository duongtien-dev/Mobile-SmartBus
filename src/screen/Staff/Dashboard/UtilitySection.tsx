import { router, type Href } from "expo-router";
import {
    CalendarDays,
    ChevronRight,
    ClipboardList,
    type LucideIcon,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type UtilityRowProps = {
    title: string;
    subtitle: string;
    iconColor: string;
    iconBgClass: string;
    Icon: LucideIcon;
    onPress: () => void;
    isLast?: boolean;
};

function UtilityRow({
    title,
    subtitle,
    iconColor,
    iconBgClass,
    Icon,
    onPress,
    isLast = false,
}: UtilityRowProps) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            className={`flex-row items-center gap-3 px-4 py-3.5 active:bg-surface ${
                isLast ? "" : "border-b border-border"
            }`}
        >
            <View
                className={`h-11 w-11 items-center justify-center rounded-full ${iconBgClass}`}
            >
                <Icon color={iconColor} size={22} />
            </View>
            <View className="min-w-0 flex-1">
                <Text className="text-[15px] font-semibold text-text-primary">
                    {title}
                </Text>
                <Text
                    className="mt-0.5 text-xs text-text-muted"
                    numberOfLines={1}
                >
                    {subtitle}
                </Text>
            </View>
            <ChevronRight color="#94a3b8" size={18} />
        </Pressable>
    );
}

export function UtilitySection() {
    return (
        <View className="gap-3">
            <View>
                <Text className="text-base font-bold text-text-primary">
                    Tiện ích
                </Text>
                <Text className="mt-0.5 text-xs text-text-muted">
                    Các chức năng phụ — mở từ trang chủ này
                </Text>
            </View>
            <View className="overflow-hidden rounded-2xl bg-card shadow-sm">
                <UtilityRow
                    title="Xin nghỉ"
                    subtitle="Gửi yêu cầu nghỉ phép"
                    Icon={CalendarDays}
                    iconColor="#cca010"
                    iconBgClass="bg-highlight-light"
                    onPress={() =>
                        router.push("/staff/leave-request" as Href)
                    }
                />
                <UtilityRow
                    title="Lịch sử hoạt động"
                    subtitle="Báo cáo ca và đơn xin nghỉ"
                    Icon={ClipboardList}
                    iconColor="#005f8b"
                    iconBgClass="bg-primary-light"
                    isLast
                    onPress={() =>
                        router.push("/staff/activity-history" as Href)
                    }
                />
            </View>
        </View>
    );
}
