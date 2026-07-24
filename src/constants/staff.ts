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

export type StaffShiftReportStatus = "submitted" | "approved" | "rejected";

export type StaffShiftHistoryItem = {
    id: string;
    date: string;
    status: StaffShiftReportStatus;
    routeName: string;
    passengerCount: number;
};

export type StaffNotificationItem = {
    id: string;
    title: string;
    datetime: string;
};

export const STAFF_SHIFT_STATUS_LABEL: Record<
    StaffShiftReportStatus,
    string
> = {
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

export const STAFF_SHIFT_HISTORY_MOCK: StaffShiftHistoryItem[] = [
    {
        id: "hist-1",
        date: "01/04/2026",
        status: "submitted",
        routeName: "Tuyến R01",
        passengerCount: 20,
    },
    {
        id: "hist-2",
        date: "31/03/2026",
        status: "approved",
        routeName: "Tuyến R16",
        passengerCount: 48,
    },
    {
        id: "hist-3",
        date: "30/03/2026",
        status: "rejected",
        routeName: "Tuyến R05",
        passengerCount: 12,
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

export const STAFF_ACTIVE_SHIFT_MOCK = {
    nextStopName: "Đối diện nhà thuốc Vũ Thương Trần Đại Nghĩa",
    eta: "04:50",
    alightingCount: 0,
    mapCenter: {
        latitude: 16.0544,
        longitude: 108.2022,
    },
    nextStopCoordinate: {
        latitude: 16.0558,
        longitude: 108.205,
    },
};
