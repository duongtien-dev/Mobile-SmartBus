export type QuickAction = {
    id: string;
    label: string;
    icon: "search" | "map-pin" | "heart" | "message-circle";
    colorClass: string;
    path: string;
};

export const QUICK_ACTIONS: QuickAction[] = [
    {
        id: "lookup",
        label: "Tra cứu",
        icon: "search",
        colorClass: "bg-accent",
        path: "/routes/lookup",
    },
    {
        id: "nearby",
        label: "Trạm xung quanh",
        icon: "map-pin",
        colorClass: "bg-primary",
        path: "/routes/nearby",
    },
    {
        id: "favorites",
        label: "Yêu thích",
        icon: "heart",
        colorClass: "bg-alert",
        path: "/routes/favorites",
    },
    {
        id: "reviews",
        label: "Đánh giá",
        icon: "message-circle",
        colorClass: "bg-highlight",
        path: "/routes/reviews",
    },
];

