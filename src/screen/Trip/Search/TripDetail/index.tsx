import { useTranslation } from "@/i18n";
import type { ITrip, ITripDetail } from "@/models/trip";
import { Bus, Footprints, Hand } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TripRouteMap } from "./TripRouteMap";

type TripDetailPanelProps = {
    trip: ITrip;
    detail: ITripDetail;
    originName: string;
    destinationName: string;
};

function formatTimeLabel(time?: string | null) {
    if (!time) {
        return "";
    }

    const [hours, minutes] = time.split(":");
    if (!hours || !minutes) {
        return time;
    }

    const hourNumber = Number(hours);
    const suffix = hourNumber >= 12 ? "PM" : "AM";
    const hour12 = hourNumber % 12 || 12;

    return `${String(hour12).padStart(2, "0")}:${minutes} ${suffix}`;
}

function TimelineRow({
    time,
    icon,
    title,
    subtitle,
}: {
    time?: string;
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
}) {
    return (
        <View className="flex-row gap-3">
            <View className="w-16 pt-1">
                {time ? (
                    <Text className="text-xs font-medium text-text-primary">
                        {time}
                    </Text>
                ) : null}
            </View>

            <View className="items-center">
                <View className="h-3 w-3 rounded-full bg-primary" />
                <View className="my-1 w-0.5 flex-1 bg-primary" />
            </View>

            <View className="flex-1 flex-row gap-2 pb-6">
                <View className="pt-0.5">{icon}</View>
                <View className="flex-1 gap-1">
                    <Text className="text-sm font-medium text-text-primary">
                        {title}
                    </Text>
                    {subtitle ? (
                        <Text className="text-xs text-text-muted">
                            {subtitle}
                        </Text>
                    ) : null}
                </View>
            </View>
        </View>
    );
}

export function TripDetailPanel({
    trip,
    detail,
    originName,
    destinationName,
}: TripDetailPanelProps) {
    const { t } = useTranslation();
    const [showStops, setShowStops] = useState(false);
    const busSegment = trip.segments.find((segment) => segment.type === "bus");

    const routeLabel = t("trip.search.routeCode", {
        code: detail.route.code,
    });
    const busSubtitle = busSegment?.durationMinutes
        ? t("trip.detail.routeDuration", {
              route: routeLabel,
              duration: t("trip.duration.minutes", {
                  n: busSegment.durationMinutes,
              }),
          })
        : routeLabel;

    return (
        <View className="mt-4 gap-4">
            <View className="h-44 overflow-hidden rounded-lg">
                <TripRouteMap detail={detail} />
            </View>

            <View>
                <TimelineRow
                    icon={<Footprints color="#005f8b" size={18} />}
                    title={t("trip.detail.walkToStop")}
                />

                <TimelineRow
                    time={formatTimeLabel(detail.startTime)}
                    icon={<Bus color="#005f8b" size={18} />}
                    title={t("trip.detail.boardAt", {
                        name: detail.pickupStop.name,
                    })}
                    subtitle={busSubtitle}
                />

                <Pressable
                    className="mb-2 ml-19 active:opacity-80"
                    onPress={() => setShowStops((prev) => !prev)}
                >
                    <Text className="text-sm font-medium text-accent">
                        {showStops
                            ? t("trip.detail.hideStops")
                            : t("trip.detail.showStops")}
                    </Text>
                </Pressable>

                {showStops ? (
                    <View className="mb-4 ml-19 gap-2 rounded-lg bg-surface px-3 py-3">
                        {detail.stops.map((stop) => (
                            <Text
                                key={stop.id}
                                className="text-sm text-text-primary"
                            >
                                {stop.order}. {stop.name}
                            </Text>
                        ))}
                    </View>
                ) : null}

                <TimelineRow
                    time={formatTimeLabel(detail.endTime)}
                    icon={<Footprints color="#005f8b" size={18} />}
                    title={t("trip.detail.alightAt", {
                        name: detail.dropoffStop.name,
                    })}
                />

                <TimelineRow
                    icon={<Footprints color="#005f8b" size={18} />}
                    title={t("trip.detail.walkToDest")}
                />

                <View className="flex-row gap-3">
                    <View className="w-16" />
                    <View className="items-center">
                        <View className="h-5 w-5 items-center justify-center rounded-full border-2 border-primary">
                            <View className="h-2 w-2 rounded-full bg-primary" />
                        </View>
                    </View>
                    <View className="flex-1 flex-row items-start gap-2">
                        <Hand color="#005f8b" size={18} />
                        <Text className="flex-1 text-sm font-medium text-text-primary">
                            {t("trip.detail.arriveAt", {
                                name: destinationName || originName,
                            })}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
