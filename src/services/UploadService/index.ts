import BaseService from '@/services/BaseService';

class UploadService extends BaseService {
    constructor() {
        super('/upload');
    }

    uploadImages(body: object) {
        return this.post('/images', body);
    }

}

export default UploadService;
