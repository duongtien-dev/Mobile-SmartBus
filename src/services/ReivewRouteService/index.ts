import BaseService from '@/services/BaseService';
import type { ApiResponse } from '@/services/type';
import type { CreateReviewBody, IReview, ReviewSummary } from '@/models/review';

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

    deleteReviewRoute(body: object) {
        return this.post('/delete', body);
    }
}

export const reviewRouteService = new ReviewRouteService();
