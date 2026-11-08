export type PaymentProvider =
    | "momo"
    | "zalopay"
    | "shopeepay"
    | "visa"
    | "napas";

export interface IPaymentMethod {
    _id: string;
    user: string;
    provider: PaymentProvider;
    balance: number;
    cardNumber?: string | null;
    expiryDate?: string | null;
    csc?: string | null;
    cardHolderName?: string | null;
    bankName?: string | null;
    cccd?: string | null;
    accountNumber?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    createdAt: string;
    updatedAt: string;
}
