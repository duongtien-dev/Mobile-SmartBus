export type QuickAction = {
    id: string;
    label: string;
    icon: "search" | "map-pin" | "heart" | "message-circle";
    colorClass: string;
};

export type NewsItem = {
    id: string;
    title: string;
    date: string;
    image: number;
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

export const NEWS_ITEMS: NewsItem[] = [
    {
        id: "1",
        title: "Danabus ra mắt ứng dụng di động phiên bản mới 2025",
        date: "21/03/2026",
        image: require("../../assets/images/news.png"),
    },
    {
        id: "2",
        title: "Cập nhật lộ trình xe buýt nhanh BRT tuyến số 1",
        date: "18/03/2026",
        image: require("../../assets/images/news.png"),
    },
    {
        id: "3",
        title: "Ưu đãi vé tháng cho học sinh, sinh viên",
        date: "15/03/2026",
        image: require("../../assets/images/news.png"),
    },
];
