import { Button } from "@/components/Button";
import ModalBlank from "@/components/ModalBlank";
import { useTranslation } from "@/i18n";
import type { IReview } from "@/models/review";
import { StarRating } from "@/screen/Route/Reviews/StarRating";
import { reviewRouteService } from "@/services/ReivewRouteService";
import { Trash2 } from "lucide-react-native";
import moment from "moment";
import { memo, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

type ReviewCardProps = {
    review: IReview;
    onDeleted?: (reviewId: string) => void;
};

function ReviewCardComponent({ review, onDeleted }: ReviewCardProps) {
    const { t } = useTranslation();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const getRouteLabel = () => {
        if (review.route?.name) {
            return t("route.reviews.routeNamed", { name: review.route.name });
        }
        if (review.route?.code) {
            return t("route.reviews.routeNamed", { name: review.route.code });
        }
        return t("route.reviews.routeLabel");
    };

    const handleConfirmDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            await reviewRouteService.deleteReviewRoute({
                id: review._id,
            });
            setIsConfirmOpen(false);
            onDeleted?.(review._id);
        } catch {
            Toast.show({
                type: "error",
                text1: t("route.reviews.deleteFail"),
            });
        } finally {
            setIsDeleting(false);
        }
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
                    {getRouteLabel()}
                </Text>
            </View>

            <View className="mt-4 flex-row justify-end">
                <Pressable
                    accessibilityRole="button"
                    className="flex-row items-center gap-1 active:opacity-70"
                    onPress={() => setIsConfirmOpen(true)}
                >
                    <Trash2 color="#e50049" size={16} />
                    <Text className="text-sm font-medium text-alert">
                        {t("route.reviews.delete")}
                    </Text>
                </Pressable>
            </View>

            <ModalBlank
                className="gap-4"
                isOpen={isConfirmOpen}
                onClose={() => {
                    if (!isDeleting) setIsConfirmOpen(false);
                }}
                closeButton={!isDeleting}
            >
                <Text className="text-lg font-bold text-text-primary">
                    {t("route.reviews.deleteTitle")}
                </Text>
                <Text className="text-sm leading-5 text-text-secondary">
                    {t("route.reviews.deleteMessage")}
                </Text>
                <View className="mt-1 flex-row gap-3">
                    <Button
                        type="secondary"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        disabled={isDeleting}
                        onPress={() => setIsConfirmOpen(false)}
                    >
                        {t("route.reviews.deleteCancel")}
                    </Button>
                    <Button
                        type="danger"
                        variant="bold"
                        size="sm"
                        className="flex-1"
                        disabled={isDeleting}
                        onPress={handleConfirmDelete}
                    >
                        {isDeleting ? (
                            <ActivityIndicator color="#ffffff" size="small" />
                        ) : (
                            t("route.reviews.delete")
                        )}
                    </Button>
                </View>
            </ModalBlank>
        </View>
    );
}

export const ReviewCard = memo(ReviewCardComponent);
