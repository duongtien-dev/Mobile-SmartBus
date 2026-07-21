import type { IUser } from '@/models/user';
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    user: IUser | null;
    token: string | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: IUser | null) => void;
    setToken: (token: string | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setLoading: (value) => set({ isLoading: value }),
    logout: () =>
        set({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
        }),
}));

export default useAuthStore;
