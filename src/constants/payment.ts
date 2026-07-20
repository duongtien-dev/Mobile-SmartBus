export type PaymentMethodOption = {
    id: "visa" | "napas";
    label: string;
    route: "/payment/visa" | "/payment/bank";
};

export const PAYMENT_METHOD_OPTIONS: PaymentMethodOption[] = [
    {
        id: "visa",
        label: "Thẻ tín dụng / Ghi nợ",
        route: "/payment/visa",
    },
    {
        id: "napas",
        label: "Tài khoản / Thẻ ngân hàng",
        route: "/payment/bank",
    },
];
