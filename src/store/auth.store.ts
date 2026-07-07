import { create } from 'zustand';

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
    // fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setLoading: (value) => set({ isLoading: value }),
    logout: () => set({ isAuthenticated: false, user: null, isLoading: false }),
    // fetchAuthenticatedUser: async () => {
    //     set({ isLoading: true });

    //     try {
    //         const user = await getCurrentUser();

    //         if (user) set({ isAuthenticated: true, user: user as User })
    //         else set({ isAuthenticated: false, user: null });
    //     } catch (e) {
    //         console.log('fetchAuthenticatedUser error', e);
    //         set({ isAuthenticated: false, user: null })
    //     } finally {
    //         set({ isLoading: false });
    //     }
    // }
}))

export default useAuthStore;
