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

    updateReviewRoute(body: object) {
        return this.post('/update', body);
    }

    deleteReviewRoute(body: object) {
        return this.post('/delete', body);
    }

}

export default ReviewRouteService;
