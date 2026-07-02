import BaseService from '@/services/BaseService';

class StripService extends BaseService {
    constructor() {
        super('/');
    }
    suggestionLocation(body: object) {
        return this.post('/suggest-locations', body);
    }

    createStrip(body: object) {
        return this.post('/strips/search', body);
    }

    stripDetail(body: object) {
        return this.post('/strips/detail', body);
    }

}

export default StripService;
