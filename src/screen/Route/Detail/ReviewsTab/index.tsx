import useFetch from "@/hooks/useFetch";
import usePaginationList from "@/hooks/usePaginationList";
import type { IReview, ReviewSummary } from "@/models/review";
import { reviewRouteService } from "@/services/ReivewRouteService";
import { Star } from "lucide-react-native";
import { useEffect, useMemo } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
} from "react-native";

const RATING_COLORS: Record<1 | 2 | 3 | 4 | 5, string> = {
    5: "#22c55e",
    4: "#eab308",
    3: "#f97316",
    2: "#ea580c",
    1: "#ef4444",
};

type ReviewsTabProps = {
    routeId: string;
};

function RatingStars({ rating }: { rating: number }) {
    return (
        <View className="flex-row gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    size={14}
                    color="#ffc20e"
                    fill={index < Math.round(rating) ? "#ffc20e" : "transparent"}
                />
            ))}
        </View>
    );
}

function ReviewSummarySection({ summary }: { summary: ReviewSummary }) {
    const maxCount = Math.max(...Object.values(summary.distribution), 1);

    return (
        <View className="px-5 py-4">
            <Text className="mb-4 text-base font-bold text-text-primary">
                Tổng hợp đánh giá
            </Text>

            <View className="flex-row items-center gap-4">
                <Text className="text-4xl font-bold text-text-primary">
                    {summary.total ? summary.average.toFixed(1) : "0.0"}
                </Text>
                <View>
                    <RatingStars rating={summary.average} />
                    <Text className="mt-1 text-sm text-text-muted">
                        {summary.total} đánh giá
                    </Text>
                </View>
            </View>

            <View className="mt-5 gap-2">
                {([5, 4, 3, 2, 1] as const).map((rating) => {
                    const count = summary.distribution[rating];
                    const width = `${(count / maxCount) * 100}%`;

                    return (
                        <View key={rating} className="flex-row items-center gap-3">
                            <Text className="w-4 text-sm text-text-muted">
                                {rating}
                            </Text>
                            <View className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                                <View
                                    className="h-full rounded-full"
                                    style={{
                                        width: width as any,
                                        backgroundColor: RATING_COLORS[rating],
                                    }}
                                />
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

function ReviewItem({ review }: { review: IReview }) {
    return (
        <View className="border-b border-border px-5 py-4">
            <View className="flex-row items-center justify-between gap-3">
                <Text className="text-sm font-semibold text-text-primary">
                    {review.user?.full_name}
                </Text>
                <RatingStars rating={review.rating} />
            </View>
            {review.content ? (
                <Text className="mt-2 text-sm leading-6 text-text-muted">
                    {review.content}
                </Text>
            ) : null}
        </View>
    );
}

export function ReviewsTab({ routeId }: ReviewsTabProps) {
    const {
        data: summary,
        isLoading: isSummaryLoading,
        loadFetchFn: loadSummary,
    } = useFetch<ReviewSummary>({
        fetchFn: async () => {
            const response = await reviewRouteService.getReviewSummary({
                route: routeId,
            });
            return response.data;
        },
    });

    const {
        list: reviews,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<IReview, { route: string; sort: "newest" }>({
        fetchFn: async (payload) => {
            const response = await reviewRouteService.getReviewRoutes(payload);
            return response.data ?? [];
        },
        limit: 12,
        params: { route: routeId, sort: "newest" },
    });

    useEffect(() => {
        loadFirstPage();
    }, [routeId]);

    useEffect(() => {
        loadSummary();
    }, [routeId]);

    const listHeader = useMemo(() => {
        if (isSummaryLoading) {
            return (
                <View className="items-center py-6">
                    <ActivityIndicator color="#005f8b" />
                </View>
            );
        }

        if (!summary) return null;

        return (
            <>
                <ReviewSummarySection summary={summary} />
                <Text className="border-t border-border px-5 py-4 text-base font-bold text-text-primary">
                    Nhận xét và đánh giá
                </Text>
            </>
        );
    }, [isSummaryLoading, summary]);

    return (
        <FlatList
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ListHeaderComponent={listHeader}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-8"
            ListEmptyComponent={
                isSkeletonLoading ? (
                    <View className="items-center py-10">
                        <ActivityIndicator color="#005f8b" />
                    </View>
                ) : (
                    <Text className="px-5 py-6 text-center text-sm text-text-muted">
                        Chưa có đánh giá nào
                    </Text>
                )
            }
            ListFooterComponent={
                isLoadingMore ? (
                    <View className="items-center py-4">
                        <ActivityIndicator color="#005f8b" />
                    </View>
                ) : null
            }
        />
    );
}
