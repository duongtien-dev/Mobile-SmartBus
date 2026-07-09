import type { QuickAction } from "@/constants/home";
import {
    Heart,
    MapPin,
    MessageCircle,
    Search,
    type LucideIcon,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const ICONS: Record<QuickAction["icon"], LucideIcon> = {
    search: Search,
    "map-pin": MapPin,
    heart: Heart,
    "message-circle": MessageCircle,
};

type QuickActionButtonProps = {
    action: QuickAction;
    onPress?: () => void;
};

export function QuickActionButton({ action, onPress }: QuickActionButtonProps) {
    const Icon = ICONS[action.icon];
    const iconColor =
        action.colorClass === "bg-highlight" ? "#005f8b" : "#ffffff";

    return (
        <Pressable
            accessibilityRole="button"
            className="flex-1 items-center active:opacity-80"
            onPress={onPress}
        >
            <View
                className={`mb-2 h-14 w-14 items-center justify-center rounded-full ${action.colorClass}`}
            >
                <Icon color={iconColor} size={24} />
            </View>
            <Text className="text-center text-xs font-medium text-text-primary">
                {action.label}
            </Text>
        </Pressable>
    );
}
