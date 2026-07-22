import {
    Bell,
    CreditCard,
    FileText,
    Heart,
    HelpCircle,
    History,
    Info,
    Languages,
    LogIn,
    LogOut,
    MapPin,
    Shield,
    Ticket,
    UserRound,
} from "lucide-react-native";

export const PROFILE_MENU_SECTIONS = [
    {
        id: "account",
        title: "Tài khoản",
        items: [
            {
                id: "edit-profile",
                label: "Thông tin cá nhân",
                description: "Cập nhật họ tên, số điện thoại",
                icon: UserRound,
                href: "/profile/edit",
                authOnly: true,
            },
            {
                id: "payment",
                label: "Phương thức thanh toán",
                description: "Thẻ, ví điện tử đã liên kết",
                icon: CreditCard,
                href: "/payment",
            },
            {
                id: "my-tickets",
                label: "Vé của tôi",
                description: "Vé lượt, vé tháng đang sử dụng",
                icon: Ticket,
                href: "/profile/my-tickets",
                authOnly: true,
            },
            {
                id: "trip-history",
                label: "Lịch sử chuyến đi",
                description: "Các chuyến đã đi gần đây",
                icon: History,
                href: "/profile/trip-history",
                authOnly: true,
            },
        ],
    },
    {
        id: "services",
        title: "Dịch vụ",
        items: [
            {
                id: "favorites",
                label: "Tuyến yêu thích",
                description: "Lưu nhanh tuyến thường dùng",
                icon: Heart,
                href: "/routes/favorites",
            },
            {
                id: "nearby",
                label: "Trạm xung quanh",
                description: "Tìm trạm gần vị trí hiện tại",
                icon: MapPin,
                href: "/",
            },
            {
                id: "notifications",
                label: "Thông báo",
                description: "Tin tức và cập nhật tuyến",
                icon: Bell,
                href: "/notifications",
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
            },
            {
                id: "help",
                label: "Trung tâm trợ giúp",
                description: "Câu hỏi thường gặp, liên hệ",
                icon: HelpCircle,
                href: "/help",
            },
            {
                id: "terms",
                label: "Điều khoản sử dụng",
                icon: FileText,
            },
            {
                id: "privacy",
                label: "Chính sách bảo mật",
                icon: Shield,
            },
            {
                id: "about",
                label: "Về DanaBus",
                description: "Phiên bản ứng dụng",
                icon: Info,
            },
        ],
    },
] as const;

export const PROFILE_AUTH_ACTIONS = [
    {
        id: "login",
        label: "Đăng nhập / Đăng ký",
        description: "Đồng bộ vé và điểm tích lũy",
        icon: LogIn,
        href: "/login",
        guestOnly: true,
    },
    {
        id: "logout",
        label: "Đăng xuất",
        description: "Thoát khỏi tài khoản hiện tại",
        icon: LogOut,
        destructive: true,
        authOnly: true,
    },
] as const;

export const GUEST_PROFILE_STATS = [
    { id: "points", label: "Điểm", value: "—" },
    { id: "trips", label: "Chuyến", value: "—" },
    { id: "tickets", label: "Vé tháng", value: "—" },
] as const;

export const DEMO_PROFILE_STATS = [
    { id: "points", label: "Điểm", value: "1.250" },
    { id: "trips", label: "Chuyến", value: "48" },
    { id: "tickets", label: "Vé tháng", value: "1" },
] as const;
