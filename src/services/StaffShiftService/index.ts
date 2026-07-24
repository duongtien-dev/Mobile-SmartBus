import type { CheckInShiftBody, IActiveShift } from "@/models/activeShift";
import type { ApiResponse } from "@/services/type";
import BaseService from "@/services/BaseService";

/**
 * Staff active shift — `/api/staff-shifts/*`
 * - POST /check-in
 * - POST /active
 * - POST /end
 */
class StaffShiftService extends BaseService {
    constructor() {
        super("/staff-shifts");
    }

    checkIn(body: CheckInShiftBody = {}) {
        return this.post<ApiResponse<IActiveShift>>("/check-in", body);
    }

    getActive() {
        return this.post<ApiResponse<IActiveShift | null>>("/active", {});
    }

    end() {
        return this.post<ApiResponse<IActiveShift | null>>("/end", {});
    }
}

export const staffShiftService = new StaffShiftService();
