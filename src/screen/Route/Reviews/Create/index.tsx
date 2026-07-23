import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import TextArea from "@/components/Input/TextArea";
import usePaginationList from "@/hooks/usePaginationList";
import { useToastify } from "@/hooks/useToastify";
import type { IRoute } from "@/models/route";
import { getRouteTitle } from "@/screen/Route/Detail/utils";
import { StarRating } from "@/screen/Route/Reviews/StarRating";
import { reviewRouteService } from "@/services/ReivewRouteService";
import { routeService } from "@/services/RouteService";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

const PAGE_SIZE = 12;

export default function CreateReviewScreen() {
    const showToast = useToastify();

    const [selectedRouteId, setSelectedRouteId] = useState<string>();
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        list: routes,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
        isLastPage,
    } = usePaginationList<IRoute, { unreviewedOnly: boolean }>({
        fetchFn: async (payload) => {
            const response = await routeService.getRoutes(payload);
            return response.data ?? [];
        },
        limit: PAGE_SIZE,
        params: { unreviewedOnly: true },
    });

    useEffect(() => {
        loadFirstPage();
    }, []);

    const routeOptions = useMemo(
        () =>
            routes.map((route) => ({
                value: route._id,
                label: getRouteTitle(route),
            })),
        [routes],
    );

    const canSubmit =
        Boolean(selectedRouteId) && rating > 0 && content.trim().length > 0;

    const handleSubmit = async () => {
        if (!canSubmit || isSubmitting || !selectedRouteId) return;

        setIsSubmitting(true);
        try {
            await reviewRouteService.createReviewRoute({
                routeId: selectedRouteId,
                rating,
                content: content.trim(),
            });
            showToast({
                type: "success",
                content: "Gửi đánh giá thành công",
            });
            router.back();
        } catch {
            showToast({
                type: "error",
                content: "Không thể gửi đánh giá",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-1 bg-background">
            <View className="bg-highlight">
                <View className="flex-row items-center gap-2 px-4 py-3">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Quay lại"
                        className="h-10 w-10 items-center justify-center active:opacity-80"
                        hitSlop={8}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft color="#005f8b" size={24} />
                    </Pressable>
                    <Text className="text-lg font-bold text-on-highlight">
                        Đánh giá
                    </Text>
                </View>
            </View>

            {isSkeletonLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator color="#005f8b" />
                </View>
            ) : (
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <ScrollView
                        className="flex-1"
                        contentContainerClassName="gap-6 px-5 py-6 pb-10"
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="gap-2">
                            <Text className="text-sm font-semibold text-primary">
                                Chọn tuyến xe
                            </Text>
                            {routeOptions.length > 0 ? (
                                <>
                                    <Select
                                        value={selectedRouteId}
                                        onValueChange={setSelectedRouteId}
                                        placeholder="Chọn tuyến xe"
                                        options={routeOptions}
                                        triggerClassName="h-12 rounded-xl border-border bg-surface px-4"
                                    />
                                    {!isLastPage ? (
                                        <Pressable
                                            accessibilityRole="button"
                                            className="mt-2 items-center py-2 active:opacity-70"
                                            disabled={isLoadingMore}
                                            onPress={loadMore}
                                        >
                                            {isLoadingMore ? (
                                                <ActivityIndicator
                                                    color="#005f8b"
                                                    size="small"
                                                />
                                            ) : (
                                                <Text className="text-sm font-medium text-accent">
                                                    Tải thêm tuyến
                                                </Text>
                                            )}
                                        </Pressable>
                                    ) : null}
                                </>
                            ) : (
                                <Text className="rounded-xl bg-surface px-4 py-3 text-sm text-text-muted">
                                    Không có tuyến nào cần đánh giá
                                </Text>
                            )}
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-semibold text-primary">
                                Đánh giá của bạn
                            </Text>
                            <StarRating value={rating} onChange={setRating} />
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-semibold text-primary">
                                Nội dung phản hồi
                            </Text>
                            <TextArea
                                value={content}
                                onChangeText={setContent}
                                placeholder="Nhập nội dung đánh giá..."
                                className="min-h-40 rounded-xl bg-surface"
                            />
                        </View>

                        <Text className="text-center text-sm leading-6 text-accent">
                            Mỗi ý kiến góp ý từ Quý khách hàng đều sẽ giúp
                            DanaBus tốt hơn từng ngày. Chúng tôi xin trân trọng
                            cảm ơn và sẽ đảm bảo tính bảo mật của phản hồi!
                        </Text>

                        <Button
                            type="primary"
                            variant="bold"
                            className="w-full rounded-xl"
                            disabled={!canSubmit || isSubmitting}
                            onPress={handleSubmit}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                "Gửi đánh giá"
                            )}
                        </Button>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </View>
    );
}
