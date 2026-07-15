import type { LucideIcon } from "lucide-react-native";
import {
    CircleHelp,
    CreditCard,
    FileText,
    Heart,
    History,
    Info,
    Languages,
    MapPin,
    Ticket,
    UserRound,
} from "lucide-react-native";

export type ProfileMenuAction =
    | { type: "route"; href: string }
    | { type: "soon" };

export type ProfileMenuItem = {
    id: string;
    label: string;
    description?: string;
    icon: LucideIcon;
    action: ProfileMenuAction;
    requireAuth?: boolean;
};

export type ProfileMenuSection = {
    id: string;
    title: string;
    items: ProfileMenuItem[];
};

export const PROFILE_MENU_SECTIONS: ProfileMenuSection[] = [
    {
        id: "account",
        title: "Tài khoản",
        items: [
            {
                id: "personal",
                label: "Thông tin cá nhân",
                description: "Họ tên, SĐT, email",
                icon: UserRound,
                action: { type: "soon" },
                requireAuth: true,
            },
            {
                id: "trips",
                label: "Lịch sử chuyến đi",
                description: "Các chuyến đã đi gần đây",
                icon: History,
                action: { type: "soon" },
                requireAuth: true,
            },
            {
                id: "tickets",
                label: "Vé & thẻ tháng",
                description: "Quản lý vé tháng, vé lượt",
                icon: Ticket,
                action: { type: "soon" },
                requireAuth: true,
            },
            {
                id: "favorites",
                label: "Tuyến & trạm yêu thích",
                icon: Heart,
                action: { type: "soon" },
            },
            {
                id: "nearby",
                label: "Trạm xung quanh",
                icon: MapPin,
                action: { type: "soon" },
            },
            {
                id: "payment",
                label: "Phương thức thanh toán",
                icon: CreditCard,
                action: { type: "route", href: "/payment" },
                requireAuth: true,
            },
        ],
    },
    {
        id: "settings",
        title: "Cài đặt",
        items: [
            {
                id: "language",
                label: "Ngôn ngữ",
                description: "Tiếng Việt",
                icon: Languages,
                action: { type: "soon" },
            },
        ],
    },
    {
        id: "support",
        title: "Hỗ trợ",
        items: [
            {
                id: "help",
                label: "Trung tâm hỗ trợ",
                icon: CircleHelp,
                action: { type: "soon" },
            },
            {
                id: "terms",
                label: "Điều khoản sử dụng",
                icon: FileText,
                action: { type: "soon" },
            },
            {
                id: "about",
                label: "Về DanaBus",
                icon: Info,
                action: { type: "soon" },
            },
        ],
    },
];
