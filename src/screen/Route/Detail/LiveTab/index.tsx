import { useTranslation } from "@/i18n";
import type { IStop } from "@/models/stop";
import {
    liveService,
    type LiveVehicle,
} from "@/services/LiveService";
import { notifyService } from "@/services/NotifyService";
import useAuthStore from "@/store/auth.store";
import { Bus, Clock3, Users } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

type LiveTabProps = {
    routeId: string;
    stops: IStop[];
};

function crowdingLabel(
    level: LiveVehicle["crowding"]["level"],
    t: (key: string) => string,
) {
    switch (level) {
        case "low":
            return t("live.crowding.low");
        case "medium":
            return t("live.crowding.medium");
        case "high":
            return t("live.crowding.high");
        case "full":
            return t("live.crowding.full");
        default:
            return t("live.crowding.unknown");
    }
}

export function LiveTab({ routeId, stops }: LiveTabProps) {
    const { t } = useTranslation();
    const user = useAuthStore((s) => s.user);
    const [vehicles, setVehicles] = useState<LiveVehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [watchStopId, setWatchStopId] = useState<string | null>(
        stops[0]?._id ?? null,
    );

    const loadVehicles = useCallback(async () => {
        try {
            const response = await liveService.listRouteVehicles({
                routeId,
                stopId: watchStopId || undefined,
            });
            setVehicles(response.data?.items ?? []);
        } catch {
            setVehicles([]);
        } finally {
            setIsLoading(false);
        }
    }, [routeId, watchStopId]);

    useEffect(() => {
        setIsLoading(true);
        loadVehicles();
        const timer = setInterval(loadVehicles, 15000);
        return () => clearInterval(timer);
    }, [loadVehicles]);

    const handleWatchStop = async (stopId: string) => {
        setWatchStopId(stopId);
        if (!user) {
            Toast.show({
                type: "info",
                text1: t("live.watch.loginRequired"),
            });
            return;
        }
        try {
            await notifyService.upsertSubscription({
                routeId,
                stopId,
                notifyBeforeMinutes: 5,
            });
            Toast.show({
                type: "success",
                text1: t("live.watch.success"),
            });
        } catch {
            Toast.show({
                type: "error",
                text1: t("live.watch.fail"),
            });
        }
    };

    if (isLoading) {
        return (
            <View className="items-center py-10">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    return (
        <View className="gap-4 px-5 py-4">
            <Text className="text-sm text-text-muted">{t("live.hint")}</Text>

            {stops.length > 0 ? (
                <View className="gap-2">
                    <Text className="text-sm font-semibold text-text-primary">
                        {t("live.watchStop")}
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                        {stops.slice(0, 8).map((stop) => {
                            const active = watchStopId === stop._id;
                            return (
                                <Pressable
                                    key={stop._id}
                                    className={`rounded-full px-3 py-1.5 ${
                                        active
                                            ? "bg-primary"
                                            : "bg-surface"
                                    }`}
                                    onPress={() => handleWatchStop(stop._id)}
                                >
                                    <Text
                                        className={`text-xs ${
                                            active
                                                ? "text-on-primary"
                                                : "text-text-primary"
                                        }`}
                                        numberOfLines={1}
                                    >
                                        {stop.name}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            ) : null}

            {vehicles.length === 0 ? (
                <View className="items-center rounded-xl border border-dashed border-border py-8">
                    <Bus color="#94a3b8" size={28} />
                    <Text className="mt-2 text-sm text-text-muted">
                        {t("live.empty")}
                    </Text>
                </View>
            ) : (
                vehicles.map((vehicle) => (
                    <View
                        key={vehicle.shiftId}
                        className="rounded-xl border border-border bg-white p-4"
                    >
                        <View className="flex-row items-center justify-between gap-2">
                            <Text className="text-base font-bold text-text-primary">
                                {vehicle.plateNumber ||
                                    vehicle.routeCode ||
                                    t("live.vehicle")}
                            </Text>
                            <View className="flex-row items-center gap-1 rounded-full bg-accent-light px-2 py-0.5">
                                <Users color="#005f8b" size={12} />
                                <Text className="text-xs font-medium text-accent">
                                    {crowdingLabel(vehicle.crowding.level, t)}
                                </Text>
                            </View>
                        </View>

                        <Text className="mt-1 text-sm text-text-muted">
                            {t("live.atStop")}:{" "}
                            {vehicle.currentStop?.name || "—"}
                        </Text>

                        <View className="mt-2 flex-row items-center gap-1">
                            <Clock3 color="#005f8b" size={14} />
                            <Text className="text-sm font-semibold text-primary">
                                {vehicle.etaMinutes != null
                                    ? t("live.etaMinutes", {
                                          n: vehicle.etaMinutes,
                                      })
                                    : t("live.etaUnknown")}
                            </Text>
                        </View>

                        {vehicle.location ? (
                            <Text className="mt-1 text-xs text-text-muted">
                                GPS: {vehicle.location.lat.toFixed(4)},{" "}
                                {vehicle.location.lng.toFixed(4)}
                                {vehicle.location.source === "vehicle"
                                    ? " (xe)"
                                    : vehicle.location.fromStop ||
                                        vehicle.location.source === "stop"
                                      ? ` (${t("live.fromStop")})`
                                      : " (NV)"}
                            </Text>
                        ) : null}
                    </View>
                ))
            )}
        </View>
    );
}
