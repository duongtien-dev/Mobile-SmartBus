export type PaymentMethodId =
    | "momo"
    | "zalopay"
    | "shopeepay"
    | "domestic-bank"
    | "international-card";

export type PaymentMethod = {
    id: PaymentMethodId;
    label: string;
    badgeLabel: string;
    badgeBg: string;
    badgeText: string;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
    {
        id: "momo",
        label: "MoMo",
        badgeLabel: "momo",
        badgeBg: "#FCE7F3",
        badgeText: "#DB2777",
    },
    {
        id: "zalopay",
        label: "Zalopay",
        badgeLabel: "Zalo",
        badgeBg: "#DBEAFE",
        badgeText: "#2563EB",
    },
    {
        id: "shopeepay",
        label: "ShopeePay",
        badgeLabel: "S",
        badgeBg: "#FFEDD5",
        badgeText: "#EA580C",
    },
    {
        id: "domestic-bank",
        label: "Liên kết Ngân hàng nội địa",
        badgeLabel: "NH",
        badgeBg: "#E0F2FE",
        badgeText: "#0284C7",
    },
    {
        id: "international-card",
        label: "Thẻ quốc tế",
        badgeLabel: "Visa",
        badgeBg: "#FEF3C7",
        badgeText: "#B45309",
    },
];
