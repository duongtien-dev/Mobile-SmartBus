import type { IStop } from "@/models/stop";
import type { ApiResponse } from "@/services/type";
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

    listStopsByRoute(body: {
        routeId: string;
        page?: number;
        limit?: number;
    }) {
        return this.post<ApiResponse<IStop[]>>("/listByRoute", body);
    }

    getStopById(body: { id: string }) {
        return this.post<ApiResponse<IStop>>("/detail", body);
    }
}

export const stopService = new StopService();
export default StopService;
