import type { IRoute } from "@/models/route";
import type { IUser } from "@/models/user";

export type IReviewUser = Pick<IUser, "_id" | "full_name" | "email">;

export type IReviewRoute = Pick<IRoute, "_id" | "code" | "name">;

export interface IReview {
    _id: string;
    user: IReviewUser | null;
    route: IReviewRoute | null;
    rating: number;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type ReviewSummary = {
    average: number;
    total: number;
    distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};
