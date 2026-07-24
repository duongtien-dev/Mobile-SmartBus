export type IActiveShift = {
    _id: string;
    staffId: string;
    scheduleId?: string | null;
    routeId?: string | { _id: string; code?: string; name?: string } | null;
    routeName?: string;
    routeCode?: string;
    shiftStartAt: string;
    shiftEndAt?: string | null;
    status: "active" | "ended";
    createdAt?: string;
    updatedAt?: string;
};
