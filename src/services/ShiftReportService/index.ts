import BaseService from "@/services/BaseService";

/**
 * Staff shift reports — Backend-SmartBus `/api/shift-reports/*`
 * Auth + role `staff` required.
 *
 * - POST /preview  — thống kê ca trước khi gửi
 * - POST /submit   — gửi báo cáo ca (server tự tính stats)
 * - POST /my       — lịch sử báo cáo của staff hiện tại
 */
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
