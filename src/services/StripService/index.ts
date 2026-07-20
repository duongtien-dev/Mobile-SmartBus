import BaseService from '@/services/BaseService';

class StripService extends BaseService {
    constructor() {
        super('');
    }

    suggestLocations(body: object) {
        return this.post('/suggest-locations', body);
    }

    createStrip(body: object) {
        return this.post('/strips/search', body);
    }

    stripDetail(body: object) {
        return this.post('/strips/detail', body);
    }
}

export const stripService = new StripService();
