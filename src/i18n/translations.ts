import type { AppLocale } from "./localeConfig";
import en from "./locales/en.json";
import vi from "./locales/vi.json";

type TranslationDict = Record<string, string>;

const dictionaries: Record<AppLocale, TranslationDict> = {
    vi,
    en,
};

export type TranslationKey = keyof typeof vi;

export function translate(
    locale: AppLocale,
    key: TranslationKey | string,
): string {
    return dictionaries[locale][key] ?? dictionaries.vi[key] ?? key;
}
