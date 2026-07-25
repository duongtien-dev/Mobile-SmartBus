import useCurrentLocation, {
    type MapCoordinate,
} from "@/hooks/useCurrentLocation";
import { useTranslation } from "@/i18n";
import type { ISuggestLocation } from "@/models/suggestLocation";
import { NearbyActionBar } from "@/screen/Route/Nearby/NearbyActionBar";
import { NearbyMap } from "@/screen/Route/Nearby/NearbyMap";
import { NearbySearchBar } from "@/screen/Route/Nearby/NearbySearchBar";
import useTripBookingStore from "@/store/tripBooking.store";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NearbyScreen() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const setPrefillOrigin = useTripBookingStore(
        (state) => state.setPrefillOrigin,
    );
    const { location, isLoading, permissionDenied, refresh } =
        useCurrentLocation();

    const [selectedLocation, setSelectedLocation] =
        useState<ISuggestLocation | null>(null);

    const mapSelectedLocation: MapCoordinate | null = selectedLocation
        ? {
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
          }
        : null;

    const handleDirectionsPress = () => {
        const originName =
            selectedLocation?.display_name ?? t("route.nearby.currentLocation");
        const originLat = selectedLocation?.lat ?? location.latitude;
        const originLng = selectedLocation?.lng ?? location.longitude;

        setPrefillOrigin({
            display_name: originName,
            lat: originLat,
            lng: originLng,
        });

        router.push("/(tabs)" as never);
    };

    return (
        <View className="flex-1 bg-background">
            {isLoading ? (
                <View className="flex-1 items-center justify-center bg-surface">
                    <ActivityIndicator color="#005f8b" size="large" />
                    <Text className="mt-3 text-sm text-text-muted">
                        {t("route.nearby.locating")}
                    </Text>
                </View>
            ) : (
                <>
                    <NearbyMap
                        userLocation={location}
                        selectedLocation={mapSelectedLocation}
                        selectedLabel={selectedLocation?.display_name}
                    />

                    <NearbySearchBar
                        topInset={8}
                        onSelectLocation={setSelectedLocation}
                    />

                    {permissionDenied ? (
                        <View
                            className="absolute z-10 self-center rounded-full bg-black/70 px-4 py-2"
                            style={{ top: 80 }}
                        >
                            <Text className="text-xs text-white">
                                {t("route.nearby.permissionDeniedDetail")}
                            </Text>
                            <Pressable
                                className="mt-1 active:opacity-80"
                                onPress={refresh}
                            >
                                <Text className="text-center text-xs font-medium text-accent">
                                    {t("route.nearby.retry")}
                                </Text>
                            </Pressable>
                        </View>
                    ) : null}

                    <NearbyActionBar
                        bottomInset={insets.bottom}
                        onLookupPress={() => router.push("/routes/lookup")}
                        onDirectionsPress={handleDirectionsPress}
                    />
                </>
            )}
        </View>
    );
}
