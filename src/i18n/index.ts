import { useCallback } from "react";
import {
    DEFAULT_LOCALE,
    getLocaleOption,
    type AppLocale,
} from "./localeConfig";
import { translate, type TranslationKey } from "./translations";
import useLocaleStore from "@/store/locale.store";

export function useTranslation() {
    const locale = useLocaleStore((state) => state.locale);
    const setLocale = useLocaleStore((state) => state.setLocale);
    const hydrated = useLocaleStore((state) => state.hydrated);

    const t = useCallback(
        (key: TranslationKey | string) => translate(locale, key),
        [locale],
    );

    return {
        t,
        locale,
        setLocale,
        hydrated,
        localeLabel: getLocaleOption(locale).nativeLabel,
        defaultLocale: DEFAULT_LOCALE,
    };
}

export type { AppLocale };
