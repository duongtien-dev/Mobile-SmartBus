import BaseService from '@/services/BaseService';

class AuthService extends BaseService {
    constructor() {
        super('/users');
    }

    login(body: object) {
        return this.post('/login', body);
    }

    register(body: object) {
        return this.post('/register', body);
    }

    verifyRegisterOtp(body: object) {
        return this.post('/register/verify-otp', body);
    }

    forgotPassword(body: object) {
        return this.post('/forgot-password/send-otp', body);
    }

    resetPassword(body: object) {
        return this.post('/forgot-password/reset', body);
    }

    updateProfile(body: object) {
        return this.post('/profile', body);
    }
}

export const authService = new AuthService();
