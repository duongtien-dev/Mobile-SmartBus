import type { MyScanLogsBody, ScanLogListResult } from "@/models/scanLog";
import type { ApiResponse } from "@/services/type";
import BaseService from "@/services/BaseService";

/**
 * Staff scan logs — `/api/scan-logs/*`
 * - POST /my `{ from, to?, page?, limit? }`
 */
class ScanLogService extends BaseService {
    constructor() {
        super("/scan-logs");
    }

    getMyScans(body: MyScanLogsBody) {
        return this.post<ApiResponse<ScanLogListResult>>("/my", body);
    }
}

export const scanLogService = new ScanLogService();
