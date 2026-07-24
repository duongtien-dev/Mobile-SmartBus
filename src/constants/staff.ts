import type { LeaveRequestStatus } from "@/models/leaveRequest";
import type { ShiftReportStatus } from "@/models/shiftReport";

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

export const STAFF_LEAVE_STATUS_LABEL: Record<LeaveRequestStatus, string> = {
    submitted: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
};

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
