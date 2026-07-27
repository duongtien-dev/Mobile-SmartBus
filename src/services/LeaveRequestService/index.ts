import BaseService from "@/services/BaseService";

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
