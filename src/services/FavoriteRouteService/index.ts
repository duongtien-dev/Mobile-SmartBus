import BaseService from '@/services/BaseService';

class FavoriteRouteService extends BaseService {
    constructor() {
        super('/route-favorites');
    }

    addFavorite(body: object) {
        return this.post('/add', body);
    }

    removeFavorite(body: object) {
        return this.post('/remove', body);
    }

    listFavorites(body: object) {
        return this.post('/listFavorites', body);
    }
}

export const favoriteRouteService = new FavoriteRouteService();
export default FavoriteRouteService;
