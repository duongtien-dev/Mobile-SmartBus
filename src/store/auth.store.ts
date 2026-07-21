import type { IUser } from '@/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: true,

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
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                token: state.token,
            }),
            onRehydrateStorage: () => () => {
                useAuthStore.setState({ isLoading: false });
            },
        },
    ),
);

export default useAuthStore;
