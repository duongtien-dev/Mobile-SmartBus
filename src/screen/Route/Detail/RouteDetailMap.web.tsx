import type { IStop } from "@/models/stop";
import { Text, View } from "react-native";

type RouteDetailMapProps = {
    stops: IStop[];
};

export function RouteDetailMap({ stops }: RouteDetailMapProps) {
    return (
        <View className="flex-1 items-center justify-center bg-surface px-4">
            <Text className="text-center text-sm text-text-muted">
                Bản đồ chỉ khả dụng trên thiết bị di động
                {stops.length ? ` (${stops.length} trạm)` : ""}
            </Text>
        </View>
    );
}
