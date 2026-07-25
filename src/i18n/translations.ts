import type { AppLocale } from "./localeConfig";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import ja from "./locales/ja.json";

type TranslationDict = Record<string, string>;
type TranslateParams = Record<string, string | number>;

const dictionaries: Record<AppLocale, TranslationDict> = {
    vi,
    en,
    ja,
};

export type TranslationKey = keyof typeof vi;

function applyParams(template: string, params?: TranslateParams): string {
    if (!params) return template;
    return template.replace(/\{(\w+)\}/g, (_, key: string) =>
        params[key] != null ? String(params[key]) : `{${key}}`,
    );
}

export function translate(
    locale: AppLocale,
    key: TranslationKey | string,
    params?: TranslateParams,
): string {
    const template =
        dictionaries[locale][key] ?? dictionaries.vi[key] ?? key;
    return applyParams(template, params);
}
