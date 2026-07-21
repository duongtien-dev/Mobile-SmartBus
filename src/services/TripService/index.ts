import BaseService from '@/services/BaseService';

class TripService extends BaseService {
    constructor() {
        super('');
    }
    suggestLocations(body: object) {
        return this.post('/suggest-locations', body);
    }

    searchTrips(body: object) {
        return this.post('/trips/search', body);
    }

    getTripDetail(body: object) {
        return this.post('/trips/detail', body);
    }
}

export const tripService = new TripService();
