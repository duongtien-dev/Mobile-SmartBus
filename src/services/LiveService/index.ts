import BaseService from "@/services/BaseService";

export type LiveCrowding = {
    level: "unknown" | "low" | "medium" | "high" | "full";
    validScans: number;
    capacity: number;
    loadRatio: number;
};

export type LiveVehicle = {
    shiftId: string;
    routeId: string;
    routeCode?: string;
    routeName?: string;
    plateNumber?: string;
    currentStopOrder: number;
    currentStop?: {
        _id: string;
        name: string;
        order?: number;
        location?: { type: string; coordinates: [number, number] };
    } | null;
    location?: {
        lat: number;
        lng: number;
        updatedAt?: string;
        heading?: number | null;
        fromStop?: boolean;
        source?: "staff" | "vehicle" | "stop" | string;
    } | null;
    etaMinutes?: number | null;
    crowding: LiveCrowding;
    shiftStartAt?: string;
};

class LiveService extends BaseService {
    constructor() {
        super("/live");
    }

    listRouteVehicles(body: { routeId: string; stopId?: string }) {
        return this.post("/route-vehicles", body);
    }

    getEta(body: { routeId: string; stopId: string }) {
        return this.post("/eta", body);
    }

    getCrowding(body: { routeId: string }) {
        return this.post("/crowding", body);
    }
}

export const liveService = new LiveService();
