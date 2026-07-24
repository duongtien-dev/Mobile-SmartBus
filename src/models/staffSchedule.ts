export type StaffSchedulePeriod = "morning" | "afternoon" | "evening";

export type StaffScheduleStatus =
    | "scheduled"
    | "in_progress"
    | "completed"
    | "cancelled";

export type IStaffScheduleItem = {
    _id: string;
    staffId: string;
    workDate: string;
    dateLabel: string;
    isToday: boolean;
    period: StaffSchedulePeriod;
    periodLabel: string;
    startTime: string;
    endTime: string;
    timeRange: string;
    routeId?: string | null;
    routeCode: string;
    routeName: string;
    plateNumber: string;
    status: StaffScheduleStatus;
    statusLabel: string;
    createdAt?: string;
    updatedAt?: string;
};

export type StaffScheduleListResult = {
    items: IStaffScheduleItem[];
    from: string;
    to: string;
};

export type MyStaffScheduleBody = {
    from?: string;
    to?: string;
};
