import type { MapCoordinate } from "@/hooks/useCurrentLocation";
import { MapPin } from "lucide-react-native";
import { Text, View } from "react-native";

type NearbyMapProps = {
    userLocation: MapCoordinate;
    selectedLocation?: MapCoordinate | null;
    selectedLabel?: string;
};

export function NearbyMap({
    userLocation,
    selectedLocation,
}: NearbyMapProps) {
    return (
        <View className="flex-1 items-center justify-center bg-surface px-6">
            <MapPin color="#e50049" size={32} />
            <Text className="mt-3 text-center text-sm font-medium text-text-primary">
                Bản đồ chỉ khả dụng trên thiết bị di động
            </Text>
            <Text className="mt-1 text-center text-xs text-text-muted">
                {userLocation.latitude.toFixed(5)},{" "}
                {userLocation.longitude.toFixed(5)}
            </Text>
            {selectedLocation ? (
                <Text className="mt-2 text-center text-xs text-accent">
                    Đã chọn: {selectedLocation.latitude.toFixed(5)},{" "}
                    {selectedLocation.longitude.toFixed(5)}
                </Text>
            ) : null}
        </View>
    );
}
