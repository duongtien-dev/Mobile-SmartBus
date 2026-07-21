import type { IRoute } from "@/models/route";
import { favoriteRouteService } from "@/services/FavoriteRouteService";
import { getRouteTitle } from "@/screen/Route/Detail/utils";
import { Clock, Heart, Star, Ticket } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

type RouteCardProps = {
    route: IRoute;
    onPress?: (route: IRoute) => void;
    onFavoriteChange?: (routeId: string, isFavorite: boolean) => void;
};

function formatPrice(amount: number) {
    return `${amount.toLocaleString("vi-VN")}đ`;
}

export function RouteCard({ route, onPress, onFavoriteChange }: RouteCardProps) {
    const [favorited, setFavorited] = useState(Boolean(route.isFavorite));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const title = getRouteTitle(route);
    const hasMeta =
        Boolean(route.operatingHours) ||
        route.price != null ||
        route.rating != null;

    useEffect(() => {
        setFavorited(Boolean(route.isFavorite));
    }, [route.isFavorite, route._id]);

    const handleToggleFavorite = async () => {
        if (isSubmitting) return;

        const nextValue = !favorited;
        setFavorited(nextValue);
        setIsSubmitting(true);

        try {
            if (nextValue) {
                await favoriteRouteService.addFavorite({ routeId: route._id });
            } else {
                await favoriteRouteService.removeFavorite({
                    routeId: route._id,
                });
            }
            onFavoriteChange?.(route._id, nextValue);
        } catch {
            setFavorited(!nextValue);
            Toast.show({
                type: "error",
                text1: nextValue
                    ? "Không thể thêm yêu thích"
                    : "Không thể bỏ yêu thích",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-row items-start gap-3 border-b border-border px-5 py-4">
            <Pressable
                accessibilityRole="button"
                className="min-w-0 flex-1 flex-row items-start gap-3 active:opacity-80"
                onPress={() => onPress?.(route)}
            >
                <View className="h-12 min-w-12 items-center justify-center rounded-full bg-accent px-2">
                    <Text
                        className="text-sm font-bold text-on-primary"
                        numberOfLines={1}
                    >
                        {route.code}
                    </Text>
                </View>

                <View className="min-w-0 flex-1">
                    <Text
                        className="text-base font-bold text-text-primary"
                        numberOfLines={1}
                    >
                        {title}
                    </Text>

                    {route.description ? (
                        <Text
                            className="mt-0.5 text-sm text-text-muted"
                            numberOfLines={2}
                        >
                            {route.description}
                        </Text>
                    ) : null}

                    {hasMeta ? (
                        <View className="mt-2 flex-row flex-wrap items-center gap-x-4 gap-y-1">
                            {route.operatingHours ? (
                                <View className="flex-row items-center gap-1">
                                    <Clock color="#64748b" size={14} />
                                    <Text className="text-xs text-text-muted">
                                        {route.operatingHours}
                                    </Text>
                                </View>
                            ) : null}

                            {route.price != null ? (
                                <View className="flex-row items-center gap-1">
                                    <Ticket color="#64748b" size={14} />
                                    <Text className="text-xs text-text-muted">
                                        {formatPrice(route.price)}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    ) : null}
                </View>
            </Pressable>

            <View className="items-end gap-3 pt-0.5">
                {route.rating != null ? (
                    <View className="flex-row items-center gap-1">
                        <Star color="#ffc20e" fill="#ffc20e" size={14} />
                        <Text className="text-sm font-medium text-text-primary">
                            {route.rating.toFixed(1)}
                        </Text>
                    </View>
                ) : null}

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                        favorited ? "Bỏ yêu thích" : "Thêm yêu thích"
                    }
                    className="active:opacity-70"
                    disabled={isSubmitting}
                    hitSlop={8}
                    onPress={handleToggleFavorite}
                >
                    <Heart
                        color={favorited ? "#e50049" : "#94a3b8"}
                        fill={favorited ? "#e50049" : "transparent"}
                        size={20}
                    />
                </Pressable>
            </View>
        </View>
    );
}
