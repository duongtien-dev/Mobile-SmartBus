import BaseService from '@/services/BaseService';

class PostService extends BaseService {
    constructor() {
        super('/posts');
    }

    createPost(body: object) {
        return this.post('/create', body);
    }

    listPosts(body: object) {
        return this.post('/listPosts', body);
    }

    getPostDetail(body: object) {
        return this.post('/detail', body);
    }

    updatePost(body: object) {
        return this.post('/update', body);
    }

    deletePost(body: object) {
        return this.post('/delete', body);
    }
}

export const postService = new PostService();
