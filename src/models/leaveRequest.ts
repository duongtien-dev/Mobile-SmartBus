export type LeaveRequestStatus = "submitted" | "approved" | "rejected";

export interface ILeaveRequest {
    _id: string;
    staffId: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: LeaveRequestStatus;
    reviewedBy?: string | null;
    reviewNote?: string;
    reviewedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
}
