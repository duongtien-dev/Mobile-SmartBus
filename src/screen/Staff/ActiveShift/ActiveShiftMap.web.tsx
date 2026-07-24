import { View, Text } from "react-native";

/** Web fallback — maps native-only */
export function ActiveShiftMap() {
    return (
        <View className="flex-1 items-center justify-center bg-surface">
            <Text className="text-sm text-text-muted">
                Bản đồ chỉ khả dụng trên thiết bị
            </Text>
        </View>
    );
}
