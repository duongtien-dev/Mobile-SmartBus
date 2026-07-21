export interface IReview {
    _id: string;
    routeId: string | { _id: string; code?: string; name?: string };
    userId:
    | string
    | {
        _id: string;
        full_name?: string;
        email?: string;
    };
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

export function buildReviewSummary(reviews: IReview[]): ReviewSummary {
    const distribution: ReviewSummary["distribution"] = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };

    if (!reviews.length) {
        return { average: 0, total: 0, distribution };
    }

    let totalRating = 0;

    reviews.forEach((review) => {
        const rating = Math.min(5, Math.max(1, Math.round(review.rating))) as
            | 1
            | 2
            | 3
            | 4
            | 5;
        distribution[rating] += 1;
        totalRating += review.rating;
    });

    return {
        average: totalRating / reviews.length,
        total: reviews.length,
        distribution,
    };
}
