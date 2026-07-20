import { createApi } from '@/services/axiosIntance';
import { AxiosInstance } from 'axios';
import { ApiResponse } from './type';

export default class BaseService {
    protected api: AxiosInstance;

    constructor(module: string) {
        this.api = createApi(module);
    }

    protected async post<T = ApiResponse>(url: string, body?: object): Promise<T> {
        const { data } = await this.api.post(url, body);
        return data;
    }
}
