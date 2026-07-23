export type QuickAction = {
    id: string;
    label: string;
    icon: "search" | "map-pin" | "heart" | "message-circle";
    path: string;
};

export const QUICK_ACTIONS: QuickAction[] = [
    {
        id: "lookup",
        label: "Tra cứu",
        icon: "search",
        path: "/routes/lookup",
    },
    {
        id: "nearby",
        label: "Trạm xung quanh",
        icon: "map-pin",
        path: "/routes/nearby",
    },
    {
        id: "favorites",
        label: "Yêu thích",
        icon: "heart",
        path: "/routes/favorites",
    },
    {
        id: "reviews",
        label: "Đánh giá",
        icon: "message-circle",
        path: "/routes/reviews",
    },
];

