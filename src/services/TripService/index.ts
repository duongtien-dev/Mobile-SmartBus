import BaseService from '@/services/BaseService';

class TripService extends BaseService {
    constructor() {
        super('/trips');
    }

    searchTrips(body: object) {
        return this.post('/search', body);
    }

    getTripDetail(body: object) {
        return this.post('/detail', body);
    }
}

export const tripService = new TripService();
