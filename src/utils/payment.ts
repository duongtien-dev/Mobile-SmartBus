import { IPaymentMethod } from "@/models/paymentMethod";

const PROVIDER_LABELS: Record<IPaymentMethod["provider"], string> = {
    momo: "MoMo",
    zalopay: "ZaloPay",
    shopeepay: "ShopeePay",
    visa: "Thẻ quốc tế",
    napas: "Tài khoản / Thẻ ngân hàng",
};

export const getPaymentTitle = (method: IPaymentMethod) => PROVIDER_LABELS[method.provider] ?? method.provider;

export const getPaymentSubtitle = (method: IPaymentMethod) => {
    if (method.cardNumber) return `******${method.cardNumber.slice(-4)}`;
    if (method.accountNumber) return `************${method.accountNumber.slice(-4)}`;
    if (method.phoneNumber) return method.phoneNumber;
    return "";
};
