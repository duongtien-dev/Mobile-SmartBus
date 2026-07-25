import { useTranslation } from "@/i18n";
import type { IStop } from "@/models/stop";
import { Text, View } from "react-native";

type RouteDetailMapProps = {
    stops: IStop[];
};

export function RouteDetailMap({ stops }: RouteDetailMapProps) {
    const { t } = useTranslation();

    return (
        <View className="flex-1 items-center justify-center bg-surface px-4">
            <Text className="text-center text-sm text-text-muted">
                {t("route.nearby.mapMobileOnly")}
                {stops.length
                    ? ` ${t("route.detail.mapStopsCount", { n: stops.length })}`
                    : ""}
            </Text>
        </View>
    );
}
