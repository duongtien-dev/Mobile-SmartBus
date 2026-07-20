export type QuickAction = {
    id: string;
    label: string;
    icon: "search" | "map-pin" | "heart" | "message-circle";
    colorClass: string;
};

export const QUICK_ACTIONS: QuickAction[] = [
    {
        id: "lookup",
        label: "Tra cứu",
        icon: "search",
        colorClass: "bg-accent",
    },
    {
        id: "nearby",
        label: "Trạm xung quanh",
        icon: "map-pin",
        colorClass: "bg-primary",
    },
    {
        id: "favorites",
        label: "Yêu thích",
        icon: "heart",
        colorClass: "bg-alert",
    },
    {
        id: "reviews",
        label: "Đánh giá",
        icon: "message-circle",
        colorClass: "bg-highlight",
    },
];

