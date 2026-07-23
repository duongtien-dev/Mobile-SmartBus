import type { ITrip } from "@/models/trip";

export type IBookingSelection = {
    routeId: string;
    routeCode: string;
    routeName: string;
    startStopName: string;
    endStopName: string;
};

type SearchNames = {
    originName?: string;
    destinationName?: string;
} | null;

/** Resolve một lần lúc chọn chuyến — không dig lại lúc thanh toán. */
export function resolveBookingSelection(
    trip: ITrip,
    searchContext: SearchNames,
): IBookingSelection | null {
    const bus = trip.segments.find((s) => s.type === "bus");

    const routeId = trip.meta?.routeId || bus?.routeId || "";
    if (!routeId) return null;

    const routeCode = bus?.code || trip.meta?.code || "";
    const routeName =
        trip.meta?.routeName ||
        bus?.routeName ||
        trip.summary?.title ||
        (routeCode ? `Tuyến ${routeCode}` : "Tuyến xe buýt");

    const startStopName =
        bus?.pickupStopName || searchContext?.originName || "";
    const endStopName =
        bus?.dropoffStopName || searchContext?.destinationName || "";

    return {
        routeId,
        routeCode,
        routeName,
        startStopName,
        endStopName,
    };
}
