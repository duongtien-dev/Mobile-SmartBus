import BaseService from "@/services/BaseService";

class ShiftReportService extends BaseService {
    constructor() {
        super("/shift-reports");
    }

    preview(body: object) {
        return this.post("/preview", body);
    }

    submit(body: object) {
        return this.post("/submit", body);
    }

    getMyReports(body: object = {}) {
        return this.post("/my", body);
    }
}

export const shiftReportService = new ShiftReportService();
