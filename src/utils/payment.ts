import { translate } from "@/i18n/translations";
import type { IPaymentMethod } from "@/models/paymentMethod";
import useLocaleStore from "@/store/locale.store";

function t(key: string) {
    return translate(useLocaleStore.getState().locale, key);
}

export const getPaymentTitle = (method: IPaymentMethod) => {
    if (method.provider === "visa") return t("payment.methodVisa");
    if (method.provider === "napas") return t("payment.methodNapas");
    const labels: Record<string, string> = {
        momo: "MoMo",
        zalopay: "ZaloPay",
        shopeepay: "ShopeePay",
    };
    return labels[method.provider] ?? method.provider;
};

export const getPaymentSubtitle = (method: IPaymentMethod) => {
    if (method.cardNumber) return `******${method.cardNumber.slice(-4)}`;
    if (method.accountNumber)
        return `************${method.accountNumber.slice(-4)}`;
    if (method.phoneNumber) return method.phoneNumber;
    return "";
};
