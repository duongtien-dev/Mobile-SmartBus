import BaseService from "@/services/BaseService";

/**
 * Staff schedules — `/api/staff-schedules/*`
 * - POST /my `{ from?, to? }` — lịch ca tuần (mặc định tuần hiện tại)
 */
class StaffScheduleService extends BaseService {
    constructor() {
        super("/staff-schedules");
    }

    getMySchedule(body: object = {}) {
        return this.post("/my", body);
    }
}

export const staffScheduleService = new StaffScheduleService();
