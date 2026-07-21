import BaseService from '@/services/BaseService';

class RouteService extends BaseService {
    constructor() {
        super('/routes');
    }

    createRoute(body: object) {
        return this.post('/create', body);
    }

    getRoutes(body: object) {
        return this.post('/listRoutes', body);
    }

    getRouteById(body: object) {
        return this.post('/detail', body);
    }

    updateRoute(body: object) {
        return this.post('/update', body);
    }

    deleteRoute(body: object) {
        return this.post('/delete', body);
    }
}

export const routeService = new RouteService();
export default RouteService;
