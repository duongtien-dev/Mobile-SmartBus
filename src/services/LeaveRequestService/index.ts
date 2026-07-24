import type {
    ILeaveRequest,
    LeaveRequestListResult,
    MyLeaveRequestsBody,
    SubmitLeaveRequestBody,
} from "@/models/leaveRequest";
import type { ApiResponse } from "@/services/type";
import BaseService from "@/services/BaseService";

/**
 * Staff leave requests — `/api/leave-requests/*`
 * - POST /submit `{ startDate, endDate, reason }`
 * - POST /my `{ page?, limit?, status? }`
 */
class LeaveRequestService extends BaseService {
    constructor() {
        super("/leave-requests");
    }

    submit(body: SubmitLeaveRequestBody) {
        return this.post<ApiResponse<ILeaveRequest>>("/submit", body);
    }

    getMyRequests(body: MyLeaveRequestsBody = {}) {
        return this.post<ApiResponse<LeaveRequestListResult>>("/my", body);
    }
}

export const leaveRequestService = new LeaveRequestService();
