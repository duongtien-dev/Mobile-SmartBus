export type TicketTypeId = "single" | "monthly-single" | "monthly-multi";

export type TicketTypeOption = {
    id: TicketTypeId;
    title: string;
    validity: string;
    price: number;
    priceLabel: string;
};

export const TICKET_TYPE_OPTIONS: TicketTypeOption[] = [
    {
        id: "single",
        title: "Vé lượt",
        validity: "Có giá trị sử dụng 1 lần",
        price: 8000,
        priceLabel: "8.000 đồng (1 lượt)",
    },
    {
        id: "monthly-single",
        title: "Vé tháng đơn tuyến",
        validity: "Có giá trị trong 1 tháng",
        price: 800000,
        priceLabel: "800.000 đồng",
    },
    {
        id: "monthly-multi",
        title: "Vé tháng liên tuyến",
        validity: "Có giá trị trong 1 tháng",
        price: 800000,
        priceLabel: "800.000 đồng",
    },
];

export const SINGLE_TICKET_PRICE = 8000;
export const MONTHLY_TICKET_PRICE = 800000;

export function formatVnd(amount: number) {
    return `${amount.toLocaleString("vi-VN")} đồng`;
}
