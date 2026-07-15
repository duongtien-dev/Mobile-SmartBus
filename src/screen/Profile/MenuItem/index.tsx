import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react-native";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type ProfileMenuItemProps = {
    label: string;
    description?: string;
    icon: LucideIcon;
    index?: number;
    onPress?: () => void;
};

export function ProfileMenuItem({
    label,
    description,
    icon: Icon,
    index = 0,
    onPress,
}: ProfileMenuItemProps) {
    const isAlt = index % 2 === 0;

    return (
        <Pressable
            accessibilityRole="button"
            className={cn(
                "flex-row items-center gap-3 px-4 py-3.5 active:opacity-80",
                isAlt ? "bg-surface" : "bg-background",
            )}
            onPress={onPress}
        >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                <Icon color="#005f8b" size={20} strokeWidth={2} />
            </View>

            <View className="flex-1 gap-0.5">
                <Text className="text-base font-medium text-text-primary">
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
