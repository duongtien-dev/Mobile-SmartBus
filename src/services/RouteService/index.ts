import BaseService from '@/services/BaseService';

class RouteService extends BaseService {
    constructor() {
        super('/route');
    }

    createRoute(body: object) {
        return this.post('/create', body);
    }

    getRoutes(body: object) {
        return this.post('/list', body);
    }

    getRouteById(body: object) {
        return this.post('/getById', body);
    }

    updateRoute(body: object) {
        return this.post('/update', body);
    }

    deleteRoute(body: object) {
        return this.post('/delete', body);
    }

}

export default RouteService;
