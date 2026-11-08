import BaseService from '@/services/BaseService';
import type { ISuggestLocation } from '@/models/suggestLocation';
import type { ApiResponse } from '@/services/type';

class TripService extends BaseService {
    constructor() {
        super('');
    }
    suggestLocations(body: { keyword: string }) {
        return this.post<ApiResponse<ISuggestLocation[]>>('/suggest-locations', body);
    }

    searchTrips(body: object) {
        return this.post('/trips/search', body);
    }

    getTripDetail(body: object) {
        return this.post('/trips/detail', body);
    }
}

export const tripService = new TripService();
