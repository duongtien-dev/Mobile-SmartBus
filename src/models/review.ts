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
