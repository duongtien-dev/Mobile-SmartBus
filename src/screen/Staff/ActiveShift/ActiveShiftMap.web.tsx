import { Text, View } from "react-native";
import type { MapPoint } from "./mapTypes";

type ActiveShiftMapProps = {
    mapCenter: MapPoint;
    nextStopCoordinate: MapPoint;
};

/** Web fallback — maps native-only */
export function ActiveShiftMap(_props: ActiveShiftMapProps) {
    return (
        <View className="flex-1 items-center justify-center bg-surface">
            <Text className="text-sm text-text-muted">
                Bản đồ chỉ khả dụng trên thiết bị
            </Text>
        </View>
    );
}
