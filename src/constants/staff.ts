import type { ShiftReportStatus } from "@/models/shiftReport";

export type StaffShiftStatus = "pending_checkin" | "checked_in" | "completed";

export type StaffScheduleShift = {
    id: string;
    dateLabel: string;
    isToday?: boolean;
    period: string;
    timeRange: string;
    routeName: string;
    plateNumber: string;
    statusLabel: string;
    status: StaffShiftStatus;
};

export type StaffNotificationItem = {
    id: string;
    title: string;
    datetime: string;
};

export const STAFF_SHIFT_STATUS_LABEL: Record<ShiftReportStatus, string> = {
    submitted: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
};

export const STAFF_SCHEDULE_MOCK: StaffScheduleShift[] = [
    {
        id: "shift-today",
        dateLabel: "Hôm nay",
        isToday: true,
        period: "Chiều",
        timeRange: "12:30 - 19:30",
        routeName: "R16 - Kim Liên - Đại học Việt Hàn",
        plateNumber: "43H57896",
        statusLabel: "Chưa Check-in",
        status: "pending_checkin",
    },
    {
        id: "shift-1",
        dateLabel: "13/04/2026",
        period: "Chiều",
        timeRange: "12:30 - 19:30",
        routeName: "R16 - Kim Liên - Đại học Việt Hàn",
        plateNumber: "43H57896",
        statusLabel: "Chưa tới lịch",
        status: "pending_checkin",
    },
    {
        id: "shift-2",
        dateLabel: "14/04/2026",
        period: "Chiều",
        timeRange: "12:30 - 19:30",
        routeName: "R01 - Trung tâm - Sân bay",
        plateNumber: "43H11223",
        statusLabel: "Chưa tới lịch",
        status: "pending_checkin",
    },
    {
        id: "shift-3",
        dateLabel: "15/04/2026",
        period: "Chiều",
        timeRange: "12:30 - 19:30",
        routeName: "R05 - Hòa Khánh - Hải Châu",
        plateNumber: "43H44556",
        statusLabel: "Chưa tới lịch",
        status: "pending_checkin",
    },
    {
        id: "shift-4",
        dateLabel: "16/04/2026",
        period: "Chiều",
        timeRange: "12:30 - 19:30",
        routeName: "R16 - Kim Liên - Đại học Việt Hàn",
        plateNumber: "43H57896",
        statusLabel: "Chưa tới lịch",
        status: "pending_checkin",
    },
    {
        id: "shift-5",
        dateLabel: "17/04/2026",
        period: "Chiều",
        timeRange: "12:30 - 19:30",
        routeName: "R02 - Ngũ Hành Sơn - Liên Chiểu",
        plateNumber: "43H77889",
        statusLabel: "Chưa tới lịch",
        status: "pending_checkin",
    },
];

export const STAFF_NOTIFICATIONS_MOCK: StaffNotificationItem[] = [
    {
        id: "noti-1",
        title: "Thông báo: Nộp giấy phép lái xe định kỳ",
        datetime: "14:00 06/11/2025",
    },
    {
        id: "noti-2",
        title: "Cập nhật ứng dụng phiên bản 2.1",
        datetime: "04:52 03/11/2025",
    },
];
