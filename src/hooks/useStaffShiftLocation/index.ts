import * as Location from "expo-location";
import { useEffect, useRef } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { staffShiftService } from "@/services/StaffShiftService";

const LOCATION_INTERVAL_MS = 20000;

type Options = {
    enabled: boolean;
    currentStopOrder?: number;
};

/**
 * Gửi GPS staff lên server khi ca active (Trục A1-Lite).
 */
export function useStaffShiftLocation({ enabled, currentStopOrder }: Options) {
    const stopOrderRef = useRef(currentStopOrder ?? 0);
    stopOrderRef.current = currentStopOrder ?? 0;

    useEffect(() => {
        if (!enabled) return;

        let cancelled = false;
        let timer: ReturnType<typeof setInterval> | null = null;

        const sendLocation = async () => {
            try {
                const { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted" || cancelled) return;

                const position = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });

                if (cancelled) return;

                await staffShiftService.updateLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    heading:
                        position.coords.heading != null &&
                        position.coords.heading >= 0
                            ? position.coords.heading
                            : undefined,
                    currentStopOrder: stopOrderRef.current,
                });
            } catch {
                // Nuốt lỗi mạng/GPS — lần interval sau thử lại
            }
        };

        const start = () => {
            sendLocation();
            timer = setInterval(sendLocation, LOCATION_INTERVAL_MS);
        };

        start();

        const onAppState = (state: AppStateStatus) => {
            if (state === "active") {
                sendLocation();
            }
        };
        const sub = AppState.addEventListener("change", onAppState);

        return () => {
            cancelled = true;
            if (timer) clearInterval(timer);
            sub.remove();
        };
    }, [enabled]);
}
