import type { AppLocale } from "@/i18n/localeConfig";
import useLocaleStore from "@/store/locale.store";

export function getNumberLocale(locale?: AppLocale | string) {
    const resolved = locale ?? useLocaleStore.getState().locale;
    if (resolved === "en") return "en-US";
    if (resolved === "ja") return "ja-JP";
    return "vi-VN";
}

/** Formats a number with the active (or provided) app locale. */
export function formatAmount(amount: number, locale?: AppLocale | string) {
    return amount.toLocaleString(getNumberLocale(locale));
}
