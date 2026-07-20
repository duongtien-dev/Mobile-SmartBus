import type { ITripDetail, ITripLocation } from "@/models/trip";
import { useEffect, useMemo, useRef } from "react";
import MapView, { Marker, Polyline, type Region } from "react-native-maps";

type Coordinate = {
    latitude: number;
    longitude: number;
};

type TripRouteMapProps = {
    detail: ITripDetail;
};

function toCoordinate(point: ITripLocation): Coordinate {
    return {
        latitude: point.lat,
        longitude: point.lng,
    };
}

function getInitialRegion(coordinates: Coordinate[]): Region {
    if (coordinates.length === 0) {
        return {
            latitude: 16.0544,
            longitude: 108.2022,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };
    }

    const latitudes = coordinates.map((point) => point.latitude);
    const longitudes = coordinates.map((point) => point.longitude);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    return {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: Math.max((maxLat - minLat) * 1.5, 0.01),
        longitudeDelta: Math.max((maxLng - minLng) * 1.5, 0.01),
    };
}

export function TripRouteMap({ detail }: TripRouteMapProps) {
    const mapRef = useRef<MapView>(null);

    const walkingStartCoords = useMemo(
        () => detail.walkingStartPolyline.map(toCoordinate),
        [detail.walkingStartPolyline],
    );
    const busCoords = useMemo(
        () => detail.busPolyline.map(toCoordinate),
        [detail.busPolyline],
    );
    const walkingEndCoords = useMemo(
        () => detail.walkingEndPolyline.map(toCoordinate),
        [detail.walkingEndPolyline],
    );

    const allCoords = useMemo(
        () => [...walkingStartCoords, ...busCoords, ...walkingEndCoords],
        [walkingStartCoords, busCoords, walkingEndCoords],
    );

    const initialRegion = useMemo(
        () => getInitialRegion(allCoords),
        [allCoords],
    );

    useEffect(() => {
        if (allCoords.length === 0) {
            return;
        }

        mapRef.current?.fitToCoordinates(allCoords, {
            edgePadding: {
                top: 32,
                right: 32,
                bottom: 32,
                left: 32,
            },
            animated: false,
        });
    }, [allCoords]);

    const origin = walkingStartCoords[0];
    const pickup =
        walkingStartCoords[walkingStartCoords.length - 1] ?? busCoords[0];
    const dropoff =
        walkingEndCoords[0] ?? busCoords[busCoords.length - 1];
    const destination = walkingEndCoords[walkingEndCoords.length - 1];

    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
        >
            {walkingStartCoords.length > 1 ? (
                <Polyline
                    coordinates={walkingStartCoords}
                    strokeColor="#64748b"
                    strokeWidth={3}
                    lineDashPattern={[8, 6]}
                />
            ) : null}

            {busCoords.length > 1 ? (
                <Polyline
                    coordinates={busCoords}
                    strokeColor="#005f8b"
                    strokeWidth={4}
                />
            ) : null}

            {walkingEndCoords.length > 1 ? (
                <Polyline
                    coordinates={walkingEndCoords}
                    strokeColor="#64748b"
                    strokeWidth={3}
                    lineDashPattern={[8, 6]}
                />
            ) : null}

            {origin ? (
                <Marker coordinate={origin} title="Điểm đi" pinColor="#22c55e" />
            ) : null}

            {pickup ? (
                <Marker
                    coordinate={pickup}
                    title={detail.pickupStop.name}
                    pinColor="#005f8b"
                />
            ) : null}

            {dropoff ? (
                <Marker
                    coordinate={dropoff}
                    title={detail.dropoffStop.name}
                    pinColor="#005f8b"
                />
            ) : null}

            {destination ? (
                <Marker
                    coordinate={destination}
                    title="Điểm đến"
                    pinColor="#ef4444"
                />
            ) : null}
        </MapView>
    );
}
