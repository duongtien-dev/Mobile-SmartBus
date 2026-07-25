import { useTranslation } from "@/i18n";
import type { ITrip, ITripDetail } from "@/models/trip";
import { TripDetailPanel } from "@/screen/Trip/Search/TripDetail";
import { tripService } from "@/services/TripService";
import useTripBookingStore from "@/store/tripBooking.store";
import { router } from "expo-router";
import { Bus, ChevronRight, Footprints, Plus } from "lucide-react-native";
import { Fragment, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

type TripResultItemProps = {
    trip: ITrip;
};

export function TripResultItem({ trip }: TripResultItemProps) {
    const { t } = useTranslation();
    const searchContext = useTripBookingStore((state) => state.searchContext);
    const setBookingSelection = useTripBookingStore(
        (state) => state.setBookingSelection,
    );

    const [expanded, setExpanded] = useState(false);
    const [detail, setDetail] = useState<ITripDetail | null>(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);

    const origin = searchContext?.origin;
    const destination = searchContext?.destination;
    const originName = searchContext?.originName ?? "";
    const destinationName = searchContext?.destinationName ?? "";

    const formatDuration = (minutes: number) => {
        if (minutes < 60) {
            return t("trip.duration.minutes", { n: minutes });
        }

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (remainingMinutes === 0) {
            return t("trip.duration.hours", { n: hours });
        }

        return t("trip.duration.hoursMinutes", {
            hours,
            minutes: remainingMinutes,
        });
    };

    const canShowDetail =
        trip.type === "direct" &&
        trip.meta?.routeId &&
        trip.meta.pickupOrder != null &&
        trip.meta.dropoffOrder != null;

    const handleToggleDetail = async () => {
        if (expanded) {
            setExpanded(false);
            return;
        }

        if (!canShowDetail || !origin || !destination) {
            Toast.show({
                type: "error",
                text1: t("trip.search.toastNoDetail"),
            });
            return;
        }

        setExpanded(true);

        if (detail) {
            return;
        }

        setIsLoadingDetail(true);

        try {
            const response = await tripService.getTripDetail({
                routeId: trip.meta?.routeId,
                pickupOrder: trip.meta?.pickupOrder,
                dropoffOrder: trip.meta?.dropoffOrder,
                origin,
                destination,
            });

            setDetail((response.data ?? null) as ITripDetail | null);
        } catch {
            Toast.show({
                type: "error",
                text1: t("trip.search.toastLoadFail"),
            });
            setExpanded(false);
        } finally {
            setIsLoadingDetail(false);
        }
    };

    const handleBuyTicket = () => {
        const bus = trip.segments.find((s) => s.type === "bus");
        const routeId = trip.meta?.routeId || bus?.routeId;
        if (!routeId) {
            Toast.show({
                type: "error",
                text1: t("trip.search.toastMissingRoute"),
            });
            return;
        }

        setBookingSelection({
            routeId,
            routeCode: bus?.code || trip.meta?.code || "",
            startStopName:
                bus?.pickupStopName || searchContext?.originName || "",
            endStopName:
                bus?.dropoffStopName || searchContext?.destinationName || "",
        });

        router.push("/trips/tickets" as never);
    };

    return (
        <View className="border-b border-border py-4">
            <View className="flex-row items-start justify-between gap-4">
                <Text className="text-lg font-bold text-text-primary">
                    {formatDuration(trip.totalDuration)}
                </Text>

                <Pressable
                    className="items-center active:opacity-80"
                    onPress={handleBuyTicket}
                >
                    <View className="h-10 w-10 items-center justify-center rounded border border-primary">
                        <Plus color="#005f8b" size={18} />
                    </View>
                    <Text className="mt-1 text-xs font-medium text-primary">
                        {t("trip.search.buyTicket")}
                    </Text>
                </Pressable>
            </View>

            <View className="mt-4 flex-row flex-wrap items-center gap-2">
                {trip.segments.map((segment, index) => (
                    <Fragment key={`${segment.type}-${index}`}>
                        {index > 0 ? (
                            <ChevronRight color="#005f8b" size={14} />
                        ) : null}

                        <View className="items-center gap-1">
                            {segment.type === "walk" ? (
                                <Footprints color="#005f8b" size={18} />
                            ) : (
                                <Bus color="#005f8b" size={18} />
                            )}
                            <Text className="text-xs text-text-primary">
                                {segment.type === "walk"
                                    ? t("trip.search.walk")
                                    : t("trip.search.routeCode", {
                                          code: segment.code ?? "",
                                      })}
                            </Text>
                        </View>
                    </Fragment>
                ))}
            </View>

            <Pressable
                className="mt-4 active:opacity-80"
                onPress={handleToggleDetail}
            >
                <Text className="text-sm font-medium text-accent">
                    {expanded
                        ? t("trip.search.hideDetail")
                        : t("trip.search.showDetail")}
                </Text>
            </Pressable>

            {expanded ? (
                isLoadingDetail ? (
                    <View className="items-center py-6">
                        <ActivityIndicator color="#005f8b" />
                    </View>
                ) : detail ? (
                    <TripDetailPanel
                        trip={trip}
                        detail={detail}
                        originName={originName}
                        destinationName={destinationName}
                    />
                ) : null
            ) : null}
        </View>
    );
}
