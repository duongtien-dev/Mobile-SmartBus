import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react-native";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type ProfileMenuItemProps = {
    label: string;
    description?: string;
    icon: LucideIcon;
    index?: number;
    destructive?: boolean;
    onPress?: () => void;
};

export function ProfileMenuItem({
    label,
    description,
    icon: Icon,
    index = 0,
    destructive = false,
    onPress,
}: ProfileMenuItemProps) {
    const isAlt = index % 2 === 0;
    const iconBg = destructive ? "bg-alert-light" : "bg-primary-light";
    const iconColor = destructive ? "#e50049" : "#005f8b";
    const labelColor = destructive ? "text-alert" : "text-text-primary";

    return (
        <Pressable
            accessibilityRole="button"
            className={cn(
                "flex-row items-center gap-3 px-4 py-3.5 active:opacity-80",
                isAlt ? "bg-surface" : "bg-background",
            )}
            onPress={onPress}
        >
            <View
                className={cn(
                    "h-10 w-10 items-center justify-center rounded-full",
                    iconBg,
                )}
            >
                <Icon color={iconColor} size={20} strokeWidth={2} />
            </View>

            <View className="flex-1 gap-0.5">
                <Text className={cn("text-base font-medium", labelColor)}>
                    {label}
                </Text>
                {description ? (
                    <Text className="text-xs text-text-muted">{description}</Text>
                ) : null}
            </View>

            <ChevronRight color="#94a3b8" size={18} />
        </Pressable>
    );
}
