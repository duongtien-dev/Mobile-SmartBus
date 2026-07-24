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

export type LeaveRequestListResult = {
    items: ILeaveRequest[];
    page: number;
    limit: number;
    total: number;
};

export type SubmitLeaveRequestBody = {
    /** DD/MM/YYYY hoặc ISO8601 */
    startDate: string;
    endDate: string;
    reason: string;
};

export type MyLeaveRequestsBody = {
    page?: number;
    limit?: number;
    status?: LeaveRequestStatus;
};
