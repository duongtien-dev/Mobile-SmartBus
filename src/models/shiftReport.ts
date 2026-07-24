import type { ITicket } from "@/models/ticket";

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

export type ShiftReportListResult = {
    items: IShiftReport[];
    page: number;
    limit: number;
    total: number;
};

export type PreviewShiftReportBody = {
    shiftStartAt: string;
    shiftEndAt: string;
};

export type SubmitShiftReportBody = {
    shiftStartAt: string;
    shiftEndAt: string;
    note?: string;
};

export type MyShiftReportsBody = {
    page?: number;
    limit?: number;
    status?: ShiftReportStatus;
};

export type VerifyScannedQrBody = {
    qrCode: string;
};

export type VerifyScannedQrResult = {
    isValid: boolean;
    reason: string;
    ticket: ITicket | null;
    scanLogId: string;
};
