import type { HomeUtility } from "@/constants/homeSections";
import { Pressable, Text, View } from "react-native";

type UtilityCardProps = {
    utility: HomeUtility;
    onPress: () => void;
};

export function UtilityCard({ utility, onPress }: UtilityCardProps) {
    const Icon = utility.icon;

    return (
        <Pressable
            accessibilityRole="button"
            className="flex-1 active:opacity-80"
            onPress={onPress}
        >
            <View className="items-center rounded-xl border border-border bg-surface-elevated px-3 py-4">
                <View
                    className={`h-11 w-11 items-center justify-center rounded-full ${utility.colorClass}`}
                >
                    <Icon color="#005f8b" size={22} />
                </View>
                <Text className="mt-2 text-center text-xs font-medium text-text-primary">
                    {utility.label}
                </Text>
            </View>
        </Pressable>
    );
}
