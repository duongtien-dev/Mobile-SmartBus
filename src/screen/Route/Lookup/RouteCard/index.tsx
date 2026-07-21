import type { IRoute } from "@/models/route";
import { Clock, Heart, Star, Ticket } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type RouteCardProps = {
    route: IRoute;
};

function formatPrice(amount: number) {
    return `${amount.toLocaleString("vi-VN")}đ`;
}

function getRouteTitle(route: IRoute) {
    if (route.name?.trim()) return route.name;

    if (route.startName && route.endName) {
        return `${route.startName} - ${route.endName}`;
    }

    return route.code;
}

export function RouteCard({ route }: RouteCardProps) {
    const [favorited, setFavorited] = useState(false);
    const title = getRouteTitle(route);
    const hasMeta =
        Boolean(route.operatingHours) ||
        route.price != null ||
        route.rating != null;

    return (
        <View className="flex-row items-start gap-3 border-b border-border px-5 py-4">
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
                    hitSlop={8}
                    onPress={() => setFavorited((prev) => !prev)}
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
