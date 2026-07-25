import { translate } from "@/i18n/translations";
import useLocaleStore from "@/store/locale.store";

export function formatVnd(amount: number) {
    const locale = useLocaleStore.getState().locale;
    const amountStr = amount.toLocaleString(
        locale === "en" ? "en-US" : locale === "ja" ? "ja-JP" : "vi-VN",
    );
    return translate(locale, "common.currencyVnd", { amount: amountStr });
}
