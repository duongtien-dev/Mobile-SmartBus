import BaseService from "@/services/BaseService";

/**
 * Stops — Backend-SmartBus `/api/stops/*`
 * - POST /listByRoute `{ routeId, page?, limit? }` → Stop[]
 * - POST /detail `{ id }` → Stop
 */
class StopService extends BaseService {
    constructor() {
        super("/stops");
    }

    listStopsByRoute(body: object) {
        return this.post("/listByRoute", body);
    }

    getStopById(body: object) {
        return this.post("/detail", body);
    }
}

export const stopService = new StopService();
export default StopService;
