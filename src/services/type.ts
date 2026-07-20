export type ValidationError = {
    type?: string;
    value?: unknown;
    msg?: string;
    path?: string;
    location?: string;
};

export interface ApiResponse<DataType = any> {
    success: boolean;
    data?: DataType;
    message?: string;
    errors?: ValidationError[];
}
