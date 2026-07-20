import BaseService from '@/services/BaseService';

class PaymentService extends BaseService {
    constructor() {
        super('/payment-methods');
    }

    createPayment(body: object) {
        return this.post('/create', body);
    }

    updatePayment(body: object) {
        return this.post('/update', body);
    }

    deletePayment(body: object) {
        return this.post('/delete', body);
    }

    getMyPaymentMethods(body: object = {}) {
        return this.post('/my-payment-methods', body);
    }

    getPaymentMethodById(body: object) {
        return this.post('/detail', body);
    }
}

export const paymentService = new PaymentService();
