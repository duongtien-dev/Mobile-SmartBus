import BaseService from "@/services/BaseService";

class ScanLogService extends BaseService {
    constructor() {
        super("/scan-logs");
    }

    getMyScans(body: object) {
        return this.post("/my", body);
    }
}

export const scanLogService = new ScanLogService();
