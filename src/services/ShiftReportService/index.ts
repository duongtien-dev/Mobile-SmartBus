import BaseService from '@/services/BaseService';

class ShiftReportService extends BaseService {
    constructor() {
        super('');
    }

    previewReportStaff(body: object) {
        return this.post('/shift-reports/preview', body);
    }

    submitShiftReportStaff(body: object) {
        return this.post('/shift-reports/submit', body);
    }

    getShiftReportStaff(body: object) {
        return this.post('/shift-reports/get', body);
    }

    getShiftReportAdmin(body: object) {
        return this.post('/admin/shift-reports', body);
    }

    updateShiftReportAdmin(body: object) {
        return this.post('/admin/shift-reports/review', body);
    }

}

export default ShiftReportService;
