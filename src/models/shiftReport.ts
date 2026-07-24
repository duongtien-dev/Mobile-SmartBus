export type ShiftReportStatus = "submitted" | "approved" | "rejected";

export interface IShiftReport {
    _id: string;
    staffId: string;
    shiftStartAt: string;
    shiftEndAt: string;
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    totalRevenue: number;
    note?: string;
    status: ShiftReportStatus;
    reviewedBy?: string | null;
    reviewNote?: string;
    reviewedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export type ShiftReportPreview = {
    shiftStartAt: string;
    shiftEndAt: string;
    totalScans: number;
    successfulScans: number;
    failedScans: number;
    totalRevenue: number;
};

