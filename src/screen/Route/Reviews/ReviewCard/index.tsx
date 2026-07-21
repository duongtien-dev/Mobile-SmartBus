import type { IReview } from "@/models/review";
import { StarRating } from "@/screen/Route/Reviews/StarRating";
import { reviewRouteService } from "@/services/ReivewRouteService";
import moment from "moment";
import { Trash2 } from "lucide-react-native";
import { Alert, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

type ReviewCardProps = {
    review: IReview;
    onDeleted?: (reviewId: string) => void;
};

function getRouteLabel(review: IReview) {
    if (typeof review.routeId === "object" && review.routeId?.name) {
        return `Tuyến ${review.routeId.name}`;
    }
    return "Tuyến xe";
}

export function ReviewCard({ review, onDeleted }: ReviewCardProps) {
    const handleDelete = () => {
        Alert.alert("Xóa đánh giá", "Bạn có chắc muốn xóa đánh giá này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: async () => {
                    try {
                        await reviewRouteService.deleteReviewRoute({
                            id: review._id,
                        });
                        onDeleted?.(review._id);
                    } catch {
                        Toast.show({
                            type: "error",
                            text1: "Không thể xóa đánh giá",
                        });
                    }
                },
            },
        ]);
    };

    return (
        <View className="mx-5 mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between gap-3 border-b border-border pb-3">
                <StarRating value={review.rating} readonly size={18} />
                <Text className="text-xs text-text-muted">
                    {review.createdAt
                        ? moment(review.createdAt).format("DD/MM/YYYY HH:mm")
                        : ""}
                </Text>
            </View>

            <View className="pt-3">
                {review.content ? (
                    <Text className="text-base font-bold text-text-primary">
                        {review.content}
                    </Text>
                ) : null}
                <Text className="mt-1 text-sm italic text-text-muted">
                    {getRouteLabel(review)}
                </Text>
            </View>

            <View className="mt-4 flex-row justify-end">
                <Pressable
                    accessibilityRole="button"
                    className="flex-row items-center gap-1 active:opacity-70"
                    onPress={handleDelete}
                >
                    <Trash2 color="#e50049" size={16} />
                    <Text className="text-sm font-medium text-alert">Xóa</Text>
                </Pressable>
            </View>
        </View>
    );
}
