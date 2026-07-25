import usePaginationList from "@/hooks/usePaginationList";
import { useTranslation } from "@/i18n";
import type { IReview } from "@/models/review";
import { ReviewCard } from "@/screen/Route/Reviews/ReviewCard";
import { reviewRouteService } from "@/services/ReivewRouteService";
import useAuthStore from "@/store/auth.store";
import { router, useFocusEffect } from "expo-router";
import { ArrowLeft, Plus } from "lucide-react-native";
import { useCallback } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";

export default function MyReviewsScreen() {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);

    const {
        list: reviews,
        setList,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<IReview, { userId: string; sort: "newest" }>({
        fetchFn: async (payload) => {
            const response = await reviewRouteService.getReviewRoutes(payload);
            return response.data ?? [];
        },
        limit: 12,
        params: { userId: user?._id!, sort: "newest" },
    });

    useFocusEffect(
        useCallback(() => {
            if (!user?._id) return;
            loadFirstPage();
        }, [user?._id]),
    );

    const handleDeleted = (reviewId: string) => {
        setList((prev) => prev.filter((item) => item._id !== reviewId));
    };

    return (
        <View className="flex-1 bg-surface">
            <View className="bg-highlight">
                <View className="flex-row items-center gap-2 px-4 py-3">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={t("a11y.back")}
                        className="h-10 w-10 items-center justify-center active:opacity-80"
                        hitSlop={8}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft color="#005f8b" size={24} />
                    </Pressable>
                    <Text className="text-lg font-bold text-on-highlight">
                        {t("route.reviews.title")}
                    </Text>
                </View>
            </View>

            <FlatList
                className="flex-1"
                data={reviews}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <ReviewCard review={item} onDeleted={handleDeleted} />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-28 pt-4"
                ListEmptyComponent={
                    isSkeletonLoading ? (
                        <View className="items-center py-10">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : (
                        <Text className="px-5 py-10 text-center text-sm text-text-muted">
                            {t("route.reviews.empty")}
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

            <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("route.reviews.addA11y")}
                className="absolute bottom-8 right-6 h-14 w-14 items-center justify-center rounded-2xl border-2 border-primary bg-white shadow-md active:opacity-80"
                onPress={() => router.push("/routes/reviews/create" as never)}
            >
                <Plus color="#005f8b" size={28} />
            </Pressable>
        </View>
    );
}
