import type { IRoute, RouteSort } from "@/models/route";
import type { ApiResponse } from "@/services/type";
import BaseService from "@/services/BaseService";

/**
 * Routes — Backend-SmartBus `/api/routes/*`
 * - POST /listRoutes → Route[]
 * - POST /detail `{ id }` → Route
 */
class RouteService extends BaseService {
    constructor() {
        super("/routes");
    }

    createRoute(body: object) {
        return this.post("/create", body);
    }

    getRoutes(body: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: RouteSort;
        userId?: string;
        unreviewedOnly?: boolean;
    } = {}) {
        return this.post<ApiResponse<IRoute[]>>("/listRoutes", body);
    }

    getRouteById(body: { id: string }) {
        return this.post<ApiResponse<IRoute>>("/detail", body);
    }

    updateRoute(body: object) {
        return this.post("/update", body);
    }

    deleteRoute(body: object) {
        return this.post("/delete", body);
    }
}

export const routeService = new RouteService();
