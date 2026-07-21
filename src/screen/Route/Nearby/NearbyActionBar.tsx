import { Bus, Navigation } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type NearbyActionBarProps = {
    bottomInset: number;
    onLookupPress: () => void;
    onDirectionsPress: () => void;
};

export function NearbyActionBar({
    bottomInset,
    onLookupPress,
    onDirectionsPress,
}: NearbyActionBarProps) {
    return (
        <View
            className="absolute inset-x-0 z-20 border-t border-border bg-white"
            style={{ bottom: 0, paddingBottom: bottomInset }}
        >
            <View className="flex-row">
                <Pressable
                    accessibilityRole="button"
                    className="flex-1 items-center py-3 active:bg-surface"
                    onPress={onLookupPress}
                >
                    <Bus color="#005f8b" size={28} />
                    <Text className="mt-1 text-sm font-medium text-text-primary">
                        Tra cứu
                    </Text>
                </Pressable>

                <View className="w-px bg-border" />

                <Pressable
                    accessibilityRole="button"
                    className="flex-1 items-center py-3 active:bg-surface"
                    onPress={onDirectionsPress}
                >
                    <Navigation color="#005f8b" size={28} />
                    <Text className="mt-1 text-sm font-medium text-text-primary">
                        Tìm đường
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
