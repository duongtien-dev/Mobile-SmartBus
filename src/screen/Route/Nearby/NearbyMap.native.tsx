import type { MapCoordinate } from "@/hooks/useCurrentLocation";
import { useTranslation } from "@/i18n";
import { useEffect, useRef } from "react";
import MapView, { Marker, type Region } from "react-native-maps";

type NearbyMapProps = {
    userLocation: MapCoordinate;
    selectedLocation?: MapCoordinate | null;
    selectedLabel?: string;
};

function toRegion(coordinate: MapCoordinate): Region {
    return {
        ...coordinate,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
    };
}

export function NearbyMap({
    userLocation,
    selectedLocation,
    selectedLabel,
}: NearbyMapProps) {
    const { t } = useTranslation();
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        mapRef.current?.animateToRegion(toRegion(userLocation), 500);
    }, [userLocation.latitude, userLocation.longitude]);

    useEffect(() => {
        if (!selectedLocation) return;

        mapRef.current?.animateToRegion(toRegion(selectedLocation), 500);
    }, [selectedLocation?.latitude, selectedLocation?.longitude]);

    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={toRegion(userLocation)}
            mapType="satellite"
            showsMyLocationButton={false}
            showsCompass={false}
            toolbarEnabled={false}
        >
            <Marker
                coordinate={userLocation}
                title={t("route.nearby.yourLocation")}
                pinColor="#e50049"
            />

            {selectedLocation ? (
                <Marker
                    coordinate={selectedLocation}
                    title={selectedLabel ?? t("route.nearby.place")}
                    pinColor="#005f8b"
                />
            ) : null}
        </MapView>
    );
}
