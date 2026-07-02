import BaseService from '@/services/BaseService';

class RouteReportService extends BaseService {
    constructor() {
        super('/route-reports');
    }

    createRouteReport(body: object) {
        return this.post('/create', body);
    }

    getRouteReports(body: object) {
        return this.post('/list', body);
    }

    getRouteReportById(body: object) {
        return this.post('/getById', body);
    }

    updateRouteReport(body: object) {
        return this.post('/update', body);
    }

    deleteRouteReport(body: object) {
        return this.post('/delete', body);
    }

}

export default RouteReportService;
