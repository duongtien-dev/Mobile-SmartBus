export type TripSegmentType = "walk" | "bus";

export interface ITripSegment {
    type: TripSegmentType;
    durationMinutes?: number;
    routeId?: string;
    code?: string;
    routeName?: string;
    pickupStopName?: string;
    dropoffStopName?: string;
    stopsCount?: number;
}

export interface ITrip {
    type: "direct" | "transfer";
    totalDuration: number;
    segments: ITripSegment[];
    summary?: {
        title?: string;
    };
    meta?: Record<string, unknown>;
}
