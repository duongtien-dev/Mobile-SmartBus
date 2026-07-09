import {
    Bell,
    CreditCard,
    Home,
    QrCode,
    User,
    type LucideIcon,
} from "lucide-react-native";

export type TabRouteName =
    | "index"
    | "notifications"
    | "scan"
    | "payment"
    | "profile";

export type TabConfig = {
    label: string;
    icon: LucideIcon;
    isCenter?: boolean;
    activeColor: string;
    inactiveColor: string;
    screenIconColor: string;
    screenIconBgClass: string;
};

export const TAB_CONFIG: Record<TabRouteName, TabConfig> = {
    index: {
        label: "Trang chủ",
        icon: Home,
        activeColor: "#00a2e8",
        inactiveColor: "#94a3b8",
        screenIconColor: "#00a2e8",
        screenIconBgClass: "bg-accent-light",
    },
    notifications: {
        label: "Thông báo",
        icon: Bell,
        activeColor: "#00a2e8",
        inactiveColor: "#94a3b8",
        screenIconColor: "#00a2e8",
        screenIconBgClass: "bg-accent-light",
    },
    scan: {
        label: "Quét mã",
        icon: QrCode,
        isCenter: true,
        activeColor: "#ffffff",
        inactiveColor: "#ffffff",
        screenIconColor: "#ffffff",
        screenIconBgClass: "bg-accent",
    },
    payment: {
        label: "Thanh toán",
        icon: CreditCard,
        activeColor: "#00a2e8",
        inactiveColor: "#94a3b8",
        screenIconColor: "#005f8b",
        screenIconBgClass: "bg-primary-light",
    },
    profile: {
        label: "Tài khoản",
        icon: User,
        activeColor: "#00a2e8",
        inactiveColor: "#94a3b8",
        screenIconColor: "#005f8b",
        screenIconBgClass: "bg-primary-light",
    },
};

export const TAB_ROUTES = Object.keys(TAB_CONFIG) as TabRouteName[];
