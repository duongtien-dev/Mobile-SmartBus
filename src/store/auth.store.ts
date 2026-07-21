import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUser {
    name: string;
    email: string;
    avatar: string;
    token: string;
}

type AuthState = {
    isAuthenticated: boolean;
    user: IUser | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: IUser | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
};

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            isLoading: true,

            setIsAuthenticated: (value) => set({ isAuthenticated: value }),
            setUser: (user) => set({ user }),
            setLoading: (value) => set({ isLoading: value }),
            logout: () =>
                set({ isAuthenticated: false, user: null, isLoading: false }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user,
            }),
            onRehydrateStorage: () => () => {
                useAuthStore.setState({ isLoading: false });
            },
        },
    ),
);

export default useAuthStore;
