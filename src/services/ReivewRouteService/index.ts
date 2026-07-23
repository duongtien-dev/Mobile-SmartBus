import BaseService from '@/services/BaseService';

class ReviewRouteService extends BaseService {
    constructor() {
        super('/reviews');
    }

    createReviewRoute(body: object) {
        return this.post('/create', body);
    }

    getReviewRoutes(body: object) {
        return this.post('/listReviews', body);
    }

    getReviewSummary(body: object) {
        return this.post('/summary', body);
    }

    updateReviewRoute(body: object) {
        return this.post('/update', body);
    }

    deleteReviewRoute(body: { id: string }) {
        return this.post('/delete', body);
    }
}

export const reviewRouteService = new ReviewRouteService();
