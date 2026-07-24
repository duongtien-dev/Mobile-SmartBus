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

    submit(body: object) {
        return this.post("/submit", body);
    }

    getMyRequests(body: object = {}) {
        return this.post("/my", body);
    }
}

export const leaveRequestService = new LeaveRequestService();
