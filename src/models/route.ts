export type RouteSort = "newest" | "oldest";

export type RouteStaffRef = {
    _id: string;
    full_name?: string;
    email?: string;
};

export interface IRoute {
    _id: string;
    code: string;
    name: string;
    description?: string;
    isHot?: boolean;
    turnOnDay?: number;
    startName?: string;
    endName?: string;
    isFavorite?: boolean;
    /** Staff được gán vận hành tuyến (nếu có) */
    staffId?: string | RouteStaffRef | null;
    /** Giờ hoạt động hiển thị (nếu API bổ sung sau) */
    operatingHours?: string;
    /** Giá vé (nếu API bổ sung sau) */
    price?: number;
    /** Điểm đánh giá trung bình (nếu API bổ sung sau) */
    rating?: number;
    createdAt?: string;
    updatedAt?: string;
}
