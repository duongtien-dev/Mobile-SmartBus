import type { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { TabRouteName } from "@/constants/tabs";
import { TAB_CONFIG } from "@/constants/tabs";

type TabPlaceholderScreenProps = {
    route: TabRouteName;
    description: string;
    iconSize?: number;
    iconWrapperClassName?: string;
};

export function TabPlaceholderScreen({
    route,
    description,
    iconSize = 28,
    iconWrapperClassName,
}: TabPlaceholderScreenProps) {
    const insets = useSafeAreaInsets();
    const config = TAB_CONFIG[route];
    const Icon: LucideIcon = config.icon;

    return (
        <View
            className="flex-1 items-center justify-center bg-background px-6"
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
            <View
                className={`mb-4 items-center justify-center rounded-full ${iconWrapperClassName ?? `${config.screenIconBgClass} h-16 w-16`}`}
            >
                <Icon color={config.screenIconColor} size={iconSize} />
            </View>
            <Text className="text-lg font-bold text-text-primary">
                {config.label}
            </Text>
            <Text className="mt-2 text-center text-sm text-text-secondary">
                {description}
            </Text>
        </View>
    );
}
