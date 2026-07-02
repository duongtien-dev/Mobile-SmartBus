export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export interface ApiResponse<DataType = any> {
    statusCode: number;
    message: string;
    data: DataType;
    option_data?: {
        pagination?: PaginationMeta;
        [key: string]: unknown;
    };
}
