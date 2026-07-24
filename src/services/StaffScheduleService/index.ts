import type {
    MyStaffScheduleBody,
    StaffScheduleListResult,
} from "@/models/staffSchedule";
import type { ApiResponse } from "@/services/type";
import BaseService from "@/services/BaseService";

/**
 * Staff schedules — `/api/staff-schedules/*`
 * - POST /my `{ from?, to? }` — lịch ca tuần (mặc định tuần hiện tại)
 */
class StaffScheduleService extends BaseService {
    constructor() {
        super("/staff-schedules");
    }

    getMySchedule(body: MyStaffScheduleBody = {}) {
        return this.post<ApiResponse<StaffScheduleListResult>>("/my", body);
    }
}

export const staffScheduleService = new StaffScheduleService();
