import BaseService from "@/services/BaseService";

class StaffShiftService extends BaseService {
    constructor() {
        super("/staff-shifts");
    }

    checkIn(body: object = {}) {
        return this.post("/check-in", body);
    }

    getActive() {
        return this.post("/active", {});
    }

    end() {
        return this.post("/end", {});
    }

    updateLocation(body: {
        lat: number;
        lng: number;
        heading?: number;
        currentStopOrder?: number;
    }) {
        return this.post("/location", body);
    }

    advanceStop(body: { stopIndex?: number } = {}) {
        return this.post("/advance-stop", body);
    }
}

export const staffShiftService = new StaffShiftService();
