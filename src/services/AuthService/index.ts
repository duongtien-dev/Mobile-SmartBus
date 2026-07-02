import BaseService from '@/services/BaseService';

class AuthService extends BaseService {
    constructor() {
        super('/auth');
    }

    signIn(body: object) {
        return this.post('/signIn', body);
    }

    signUp(body: object) {
        return this.post('/signUp', body);
    }
}

export default new AuthService();
