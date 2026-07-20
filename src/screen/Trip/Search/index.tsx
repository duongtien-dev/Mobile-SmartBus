import { PageHeader } from "@/components/PageHeader";
import type { ITrip } from "@/models/trip";
import { TripResultItem } from "@/screen/Trip/Search/TripResultItem";
import { tripService } from "@/services/TripService";
import useTripBookingStore from "@/store/tripBooking.store";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
} from "react-native";

export default function TripSearchScreen() {
    const searchContext = useTripBookingStore((state) => state.searchContext);
    const [trips, setTrips] = useState<ITrip[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const originName = searchContext?.originName ?? "";
    const destinationName = searchContext?.destinationName ?? "";
    const origin = searchContext?.origin;
    const destination = searchContext?.destination;

    useEffect(() => {
        if (!origin || !destination) {
            setTrips([]);
            setIsLoading(false);
            return;
        }

        const fetchTrips = async () => {
            setIsLoading(true);

            try {
                const response = await tripService.searchTrips({
                    origin,
                    destination,
                });

                setTrips((response.data ?? []) as ITrip[]);
            } catch {
                setTrips([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrips();
    }, [origin, destination]);

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Tìm tuyến" isIconBack={true} />

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-5 pb-8"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-4">
                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Điểm đi
                        </Text>
                        <View className="rounded-lg border border-border bg-background px-3 py-3">
                            <Text className="text-base text-text-primary">
                                {originName}
                            </Text>
                        </View>
                    </View>

                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Điểm đến
                        </Text>
                        <View className="rounded-lg border border-border bg-background px-3 py-3">
                            <Text className="text-base text-text-primary">
                                {destinationName}
                            </Text>
                        </View>
                    </View>
                </View>

                <Text className="mt-6 text-sm font-medium text-primary">
                    Các lộ trình di chuyển từ vị trí hiện tại của bạn:
                </Text>

                <View className="mt-2">
                    {isLoading ? (
                        <View className="items-center py-10">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : trips.length > 0 ? (
                        trips.map((trip, index) => (
                            <TripResultItem
                                key={`${trip.type}-${trip.totalDuration}-${index}`}
                                trip={trip}
                            />
                        ))
                    ) : (
                        <Text className="py-10 text-center text-sm text-text-muted">
                            Không tìm thấy lộ trình phù hợp
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
