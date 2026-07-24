import { useEffect, useRef } from "react";
import MapView, { Circle, Marker, type Region } from "react-native-maps";
import type { MapPoint } from "./mapTypes";

type ActiveShiftMapProps = {
    mapCenter: MapPoint;
    nextStopCoordinate: MapPoint;
};

function toRegion(point: MapPoint): Region {
    return {
        ...point,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
    };
}

export function ActiveShiftMap({
    mapCenter,
    nextStopCoordinate,
}: ActiveShiftMapProps) {
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        mapRef.current?.animateToRegion(toRegion(mapCenter), 400);
    }, [mapCenter.latitude, mapCenter.longitude]);

    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={toRegion(mapCenter)}
            mapType="satellite"
            showsMyLocationButton={false}
            showsCompass={false}
            toolbarEnabled={false}
        >
            <Circle
                center={mapCenter}
                radius={40}
                fillColor="rgba(255,255,255,0.55)"
                strokeColor="#ffffff"
                strokeWidth={2}
            />
            <Marker
                coordinate={mapCenter}
                title="Vị trí hiện tại"
                pinColor="#ffffff"
            />
            <Marker
                coordinate={nextStopCoordinate}
                title="Trạm tiếp theo"
                pinColor="#e50049"
            />
        </MapView>
    );
}
