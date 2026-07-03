import BaseService from '@/services/BaseService';

class PaymentService extends BaseService {
    constructor() {
        super('/payment');
    }

    createPayment(body: object) {
        return this.post('/create', body);
    }
}

export default PaymentService;
