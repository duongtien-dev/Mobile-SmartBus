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
}

export const staffShiftService = new StaffShiftService();
