import type {
    MyShiftReportsBody,
    PreviewShiftReportBody,
    ShiftReportListResult,
    ShiftReportPreview,
    IShiftReport,
    SubmitShiftReportBody,
} from "@/models/shiftReport";
import type { ApiResponse } from "@/services/type";
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

    preview(body: PreviewShiftReportBody) {
        return this.post<ApiResponse<ShiftReportPreview>>("/preview", body);
    }

    submit(body: SubmitShiftReportBody) {
        return this.post<ApiResponse<IShiftReport>>("/submit", body);
    }

    getMyReports(body: MyShiftReportsBody = {}) {
        return this.post<ApiResponse<ShiftReportListResult>>("/my", body);
    }
}

export const shiftReportService = new ShiftReportService();
