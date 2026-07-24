import { STAFF_ACTIVE_SHIFT_MOCK } from "@/constants/staff";
import { useRef } from "react";
import MapView, { Circle, Marker } from "react-native-maps";

export function ActiveShiftMap() {
    const mapRef = useRef<MapView>(null);
    const { mapCenter, nextStopCoordinate } = STAFF_ACTIVE_SHIFT_MOCK;

    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
                ...mapCenter,
                latitudeDelta: 0.012,
                longitudeDelta: 0.012,
            }}
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
