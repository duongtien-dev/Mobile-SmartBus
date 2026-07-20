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

export interface ITripMeta {
    routeId?: string;
    pickupOrder?: number;
    dropoffOrder?: number;
    code?: string;
    routeName?: string;
    pickupStopId?: string;
    dropoffStopId?: string;
}

export interface ITrip {
    type: "direct" | "transfer";
    totalDuration: number;
    segments: ITripSegment[];
    summary?: {
        title?: string;
    };
    meta?: ITripMeta;
}

export interface ITripLocation {
    lat: number;
    lng: number;
}

export interface ITripStop {
    id: string;
    stopCode?: string;
    name: string;
    order: number;
    times?: string[];
    location?: ITripLocation;
}

export interface ITripDetail {
    route: {
        id: string;
        code: string;
        name: string;
        description?: string;
        startName?: string;
        endName?: string;
    };
    pickupStop: ITripStop;
    dropoffStop: ITripStop;
    startTime?: string | null;
    endTime?: string | null;
    stops: ITripStop[];
    walkingStartPolyline: ITripLocation[];
    busPolyline: ITripLocation[];
    walkingEndPolyline: ITripLocation[];
}
