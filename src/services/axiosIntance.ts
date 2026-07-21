import useAuthStore from '@/store/auth.store';
import axios, { AxiosError, AxiosInstance } from 'axios';

const API_BASE = 'http://localhost:3000/api'; // Android Emulator
// const API_BASE = 'http://localhost:3000/api'; // iOS Simulator

export const createApi = (module: string): AxiosInstance => {
    const api = axios.create({
        baseURL: `${API_BASE}${module}`,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    api.interceptors.request.use(
        (config) => {
            const token = useAuthStore.getState().token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error: AxiosError) => Promise.reject(error),
    );

    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                useAuthStore.getState().logout();
            }

            return Promise.reject(error);
        },
    );

    return api;
};
