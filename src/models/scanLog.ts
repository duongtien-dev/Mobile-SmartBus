export type IScanLogItem = {
    _id: string;
    qrCode: string;
    isValid: boolean;
    reason: string;
    scannedAt: string;
    scanLogId: string;
    customerName?: string;
    routeName?: string;
    ticketId?: string | null;
};

export type ScanLogListResult = {
    items: IScanLogItem[];
    page: number;
    limit: number;
    total: number;
};

export type MyScanLogsBody = {
    from: string;
    to?: string;
    page?: number;
    limit?: number;
};
