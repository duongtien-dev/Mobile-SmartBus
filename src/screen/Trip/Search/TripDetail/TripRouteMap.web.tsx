import type { ITripDetail } from "@/models/trip";
import { MapPin } from "lucide-react-native";
import { Text, View } from "react-native";

type TripRouteMapProps = {
    detail: ITripDetail;
};

export function TripRouteMap({ detail }: TripRouteMapProps) {
    return (
        <View className="flex-1 items-center justify-center bg-surface">
            <MapPin color="#005f8b" size={28} />
            <Text className="mt-2 px-4 text-center text-sm text-text-muted">
                Bản đồ lộ trình {detail.route.code}
            </Text>
        </View>
    );
}
