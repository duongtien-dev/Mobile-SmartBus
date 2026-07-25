export type AppLocale = "vi" | "en";

export type AppLocaleOption = {
    code: AppLocale;
    /** Tên hiển thị bằng chính ngôn ngữ đó */
    nativeLabel: string;
    /** Nhãn phụ (vd. English / Vietnamese) */
    secondaryLabel: string;
};

export const DEFAULT_LOCALE: AppLocale = "vi";

export const LOCALE_STORAGE_KEY = "@smartbus/locale";

export const APP_LOCALE_OPTIONS: AppLocaleOption[] = [
    {
        code: "vi",
        nativeLabel: "Tiếng Việt",
        secondaryLabel: "Vietnamese",
    },
    {
        code: "en",
        nativeLabel: "English",
        secondaryLabel: "Tiếng Anh",
    },
];

export function isAppLocale(value: unknown): value is AppLocale {
    return value === "vi" || value === "en";
}

export function getLocaleOption(code: AppLocale): AppLocaleOption {
    return (
        APP_LOCALE_OPTIONS.find((item) => item.code === code) ??
        APP_LOCALE_OPTIONS[0]
    );
}
