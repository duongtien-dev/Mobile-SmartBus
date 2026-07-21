import type { IStop } from "@/models/stop";
import { useEffect, useMemo, useRef } from "react";
import MapView, { Marker, type Region } from "react-native-maps";

type Coordinate = {
    latitude: number;
    longitude: number;
};

type RouteDetailMapProps = {
    stops: IStop[];
};

function toCoordinate(stop: IStop): Coordinate | null {
    const coordinates = stop.location?.coordinates;
    if (!coordinates || coordinates.length < 2) return null;

    return {
        longitude: coordinates[0],
        latitude: coordinates[1],
    };
}

function getInitialRegion(coordinates: Coordinate[]): Region {
    if (!coordinates.length) {
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

export function RouteDetailMap({ stops }: RouteDetailMapProps) {
    const mapRef = useRef<MapView>(null);

    const coordinates = useMemo(
        () =>
            stops
                .map(toCoordinate)
                .filter((point): point is Coordinate => point != null),
        [stops],
    );

    const initialRegion = useMemo(
        () => getInitialRegion(coordinates),
        [coordinates],
    );

    useEffect(() => {
        if (!coordinates.length) return;

        mapRef.current?.fitToCoordinates(coordinates, {
            edgePadding: { top: 24, right: 24, bottom: 24, left: 24 },
            animated: false,
        });
    }, [coordinates]);

    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
        >
            {stops.map((stop, index) => {
                const coordinate = toCoordinate(stop);
                if (!coordinate) return null;

                return (
                    <Marker
                        key={stop._id}
                        coordinate={coordinate}
                        title={stop.name}
                        pinColor={index === 0 ? "#e50049" : "#005f8b"}
                    />
                );
            })}
        </MapView>
    );
}
