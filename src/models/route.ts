export type RouteSort = "newest" | "oldest";

export interface IRoute {
    _id: string;
    code: string;
    name: string;
    description?: string;
    isHot?: boolean;
    turnOnDay?: number;
    startName?: string;
    endName?: string;
    /** Giờ hoạt động hiển thị (nếu API bổ sung sau) */
    operatingHours?: string;
    /** Giá vé (nếu API bổ sung sau) */
    price?: number;
    /** Điểm đánh giá trung bình (nếu API bổ sung sau) */
    rating?: number;
    createdAt?: string;
    updatedAt?: string;
}
