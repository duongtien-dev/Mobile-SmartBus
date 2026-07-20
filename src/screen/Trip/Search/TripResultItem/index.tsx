import type { ITrip } from "@/models/trip";
import { Bus, ChevronRight, Footprints, Plus } from "lucide-react-native";
import { Fragment } from "react";
import { Pressable, Text, View } from "react-native";

function formatDuration(minutes: number) {
    if (minutes < 60) {
        return `${minutes} phút`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
        return `${hours} giờ`;
    }

    return `${hours} giờ ${remainingMinutes} phút`;
}

type TripResultItemProps = {
    trip: ITrip;
};

export function TripResultItem({ trip }: TripResultItemProps) {
    return (
        <View className="border-b border-border py-4">
            <View className="flex-row items-start justify-between gap-4">
                <Text className="text-lg font-bold text-text-primary">
                    {formatDuration(trip.totalDuration)}
                </Text>

                <Pressable className="items-center active:opacity-80">
                    <View className="h-10 w-10 items-center justify-center rounded border border-primary">
                        <Plus color="#005f8b" size={18} />
                    </View>
                    <Text className="mt-1 text-xs font-medium text-primary">
                        Mua vé
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
                                    ? "Đi bộ"
                                    : `Tuyến ${segment.code ?? ""}`}
                            </Text>
                        </View>
                    </Fragment>
                ))}
            </View>

            <Pressable className="mt-4 active:opacity-80">
                <Text className="text-sm font-medium text-accent">
                    {">"} Xem thêm chi tiết
                </Text>
            </Pressable>
        </View>
    );
}
