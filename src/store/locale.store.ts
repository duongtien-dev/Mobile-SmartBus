import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
    DEFAULT_LOCALE,
    isAppLocale,
    LOCALE_STORAGE_KEY,
    type AppLocale,
} from "@/i18n/localeConfig";

type LocaleState = {
    locale: AppLocale;
    hydrated: boolean;
    hydrate: () => Promise<void>;
    setLocale: (locale: AppLocale) => Promise<void>;
};

const useLocaleStore = create<LocaleState>((set, get) => ({
    locale: DEFAULT_LOCALE,
    hydrated: false,

    hydrate: async () => {
        if (get().hydrated) return;
        try {
            const saved = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
            if (isAppLocale(saved)) {
                set({ locale: saved, hydrated: true });
                return;
            }
        } catch {
            // ignore storage errors — fallback default
        }
        set({ hydrated: true });
    },

    setLocale: async (locale) => {
        set({ locale });
        try {
            await AsyncStorage.setItem(LOCALE_STORAGE_KEY, locale);
        } catch {
            // keep in-memory locale even if persist fails
        }
    },
}));

export default useLocaleStore;
