import BaseService from "@/services/BaseService";

class StaffScheduleService extends BaseService {
    constructor() {
        super("/staff-schedules");
    }

    getMySchedule(body: object = {}) {
        return this.post("/my", body);
    }
}

export const staffScheduleService = new StaffScheduleService();
