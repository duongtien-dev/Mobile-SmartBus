import type { ApiResponse } from "@/services/type";
import axios from "axios";

export function getApiErrorMessage(
    err: unknown,
    fallback = "Đã có lỗi xảy ra",
): string {
    if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiResponse | undefined;
        return (
            data?.message ||
            data?.errors?.[0]?.msg ||
            err.message ||
            fallback
        );
    }

    if (err instanceof Error && err.message) {
        return err.message;
    }

    return fallback;
}
