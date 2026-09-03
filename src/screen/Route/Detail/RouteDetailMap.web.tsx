import { useTranslation } from "@/i18n";
import type { IStop } from "@/models/stop";
import type { LiveVehicle } from "@/services/LiveService";
import { Text, View } from "react-native";

type RouteDetailMapProps = {
    stops: IStop[];
    vehicles?: LiveVehicle[];
};

export function RouteDetailMap({
    stops,
    vehicles = [],
}: RouteDetailMapProps) {
    const { t } = useTranslation();

    return (
        <View className="flex-1 items-center justify-center bg-surface px-4">
            <Text className="text-center text-sm text-text-muted">
                {t("route.nearby.mapMobileOnly")}
                {stops.length
                    ? ` ${t("route.detail.mapStopsCount", { n: stops.length })}`
                    : ""}
                {vehicles.length
                    ? ` · ${t("route.detail.mapVehiclesCount", {
                          n: vehicles.length,
                      })}`
                    : ""}
            </Text>
        </View>
    );
}
