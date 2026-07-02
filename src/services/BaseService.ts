import { createApi } from '@/services/axiosIntance';
import { AxiosInstance } from 'axios';
import { ApiResponse } from './type';

export default class BaseService {
    protected api: AxiosInstance;

    constructor(module: string) {
        this.api = createApi(module);
    }

    protected async post(url: string, body?: object): Promise<ApiResponse> {
        const { data } = await this.api.post(url, body);
        return data;
    }
}
