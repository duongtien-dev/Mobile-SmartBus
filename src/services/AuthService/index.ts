import BaseService from '@/services/BaseService';

class AuthService extends BaseService {
    constructor() {
        super('/user');
    }

    login(body: object) {
        return this.post('/login', body);
    }

    register(body: object) {
        return this.post('/register', body);
    }

    verifyOtp(body: object) {
        return this.post('/verify-otp', body);
    }

    forgotPassword(body: object) {
        return this.post('/forgot-password/send-otp', body);
    }

    resetPassword(body: object) {
        return this.post('/reset-password/reset', body);
    }

    updateProfile(body: object) {
        return this.post('/update-profile', body);
    }

}

export default AuthService;
