import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

export type MapCoordinate = {
    latitude: number;
    longitude: number;
};

const DEFAULT_LOCATION: MapCoordinate = {
    latitude: 16.0544,
    longitude: 108.2022,
};

type UseCurrentLocationResult = {
    location: MapCoordinate;
    isLoading: boolean;
    permissionDenied: boolean;
    refresh: () => Promise<void>;
};

export default function useCurrentLocation(): UseCurrentLocationResult {
    const [location, setLocation] = useState<MapCoordinate>(DEFAULT_LOCATION);
    const [isLoading, setIsLoading] = useState(true);
    const [permissionDenied, setPermissionDenied] = useState(false);

    const refresh = useCallback(async () => {
        setIsLoading(true);

        try {
            if (Platform.OS === "web") {
                if (!navigator.geolocation) {
                    setPermissionDenied(true);
                    return;
                }

                const coords = await new Promise<MapCoordinate>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            resolve({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            });
                        },
                        reject,
                        { enableHighAccuracy: true, timeout: 10000 },
                    );
                });

                setLocation(coords);
                setPermissionDenied(false);
                return;
            }

            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setPermissionDenied(true);
                return;
            }

            const position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            setPermissionDenied(false);
        } catch {
            setPermissionDenied(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        location,
        isLoading,
        permissionDenied,
        refresh,
    };
}
