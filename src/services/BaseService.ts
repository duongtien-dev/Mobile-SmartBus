import { createApi } from '@/services/axiosIntance';
import { AxiosInstance } from 'axios';

export default class BaseService {
    protected api: AxiosInstance;

    constructor(module: string) {
        this.api = createApi(module);
    }

    protected async get<T>(url: string, params?: object): Promise<T> {
        const { data } = await this.api.get(url, { params });
        return data;
    }

    protected async post<T>(url: string, body?: object): Promise<T> {
        const { data } = await this.api.post(url, body);
        return data;
    }

    protected async put<T>(url: string, body?: object): Promise<T> {
        const { data } = await this.api.put(url, body);
        return data;
    }

    protected async patch<T>(url: string, body?: object): Promise<T> {
        const { data } = await this.api.patch(url, body);
        return data;
    }

    protected async delete<T>(url: string): Promise<T> {
        const { data } = await this.api.delete(url);
        return data;
    }
}
