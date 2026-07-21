import type { LucideIcon } from "lucide-react-native";
import {
    Bell,
    CreditCard,
    HelpCircle,
    MapPinned,
    QrCode,
    Route,
    ScanLine,
    Ticket,
} from "lucide-react-native";

export type HomeTip = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    colorClass: string;
};

export type HomeUtility = {
    id: string;
    label: string;
    icon: LucideIcon;
    path: string;
    colorClass: string;
};

export const HOME_TIPS: HomeTip[] = [
    {
        id: "plan-ahead",
        title: "Lên lịch trước",
        description: "Nhập điểm đi và điểm đến sớm để xem lộ trình và giờ khởi hành phù hợp.",
        icon: Route,
        colorClass: "bg-accent",
    },
    {
        id: "save-favorite",
        title: "Lưu tuyến yêu thích",
        description: "Thêm tuyến thường đi vào mục Yêu thích để tra cứu nhanh hơn.",
        icon: MapPinned,
        colorClass: "bg-primary",
    },
    {
        id: "monthly-ticket",
        title: "Mua vé tháng",
        description: "Tiết kiệm chi phí nếu bạn đi xe buýt thường xuyên trong tháng.",
        icon: Ticket,
        colorClass: "bg-highlight",
    },
    {
        id: "scan-boarding",
        title: "Quét mã lên xe",
        description: "Dùng mã QR trên vé để lên xe nhanh và theo dõi chuyến đi dễ dàng.",
        icon: ScanLine,
        colorClass: "bg-alert",
    },
];

export const HOME_UTILITIES: HomeUtility[] = [
    {
        id: "payment",
        label: "Thanh toán",
        icon: CreditCard,
        path: "/payment",
        colorClass: "bg-accent/10",
    },
    {
        id: "notifications",
        label: "Thông báo",
        icon: Bell,
        path: "/notifications",
        colorClass: "bg-primary/10",
    },
    {
        id: "scan",
        label: "Quét mã",
        icon: QrCode,
        path: "/scan",
        colorClass: "bg-highlight/10",
    },
    {
        id: "help",
        label: "Trợ giúp",
        icon: HelpCircle,
        path: "/help",
        colorClass: "bg-alert/10",
    },
];

export const HOME_FAQ_PREVIEW_COUNT = 3;
