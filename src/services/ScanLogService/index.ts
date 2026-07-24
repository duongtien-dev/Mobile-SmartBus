import BaseService from "@/services/BaseService";

/**
 * Staff scan logs — `/api/scan-logs/*`
 * - POST /my `{ from, to?, page?, limit? }`
 */
class ScanLogService extends BaseService {
    constructor() {
        super("/scan-logs");
    }

    getMyScans(body: object) {
        return this.post("/my", body);
    }
}

export const scanLogService = new ScanLogService();
