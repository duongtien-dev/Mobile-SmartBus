import Constants from 'expo-constants';
import useAuthStore from '@/store/auth.store';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Platform } from 'react-native';

const resolveApiBaseUrl = () => {
    const envBaseUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
    if (envBaseUrl) {
        return envBaseUrl.replace(/\/+$/, '');
    }

    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
        const host = hostUri.split(':')[0];
        return `http://${host}:3000/api`;
    }

    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:3000/api';
    }

    return 'http://localhost:3000/api';
};

const API_BASE = resolveApiBaseUrl();

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
