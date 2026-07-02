import BaseService from '@/services/BaseService';

class PostService extends BaseService {
    constructor() {
        super('/post');
    }

    createPost(body: object) {
        return this.post('/create', body);
    }

    getPosts(body: object) {
        return this.post('/list', body);
    }

    getPostById(body: object) {
        return this.post('/getById', body);
    }

    updatePost(body: object) {
        return this.post('/update', body);
    }

    deletePost(body: object) {
        return this.post('/delete', body);
    }

}

export default PostService;
