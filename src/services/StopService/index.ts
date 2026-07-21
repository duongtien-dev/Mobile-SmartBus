import BaseService from '@/services/BaseService';

class StopService extends BaseService {
    constructor() {
        super('/stops');
    }

    listStopsByRoute(body: object) {
        return this.post('/listByRoute', body);
    }

    getStopById(body: object) {
        return this.post('/detail', body);
    }
}

export const stopService = new StopService();
export default StopService;
