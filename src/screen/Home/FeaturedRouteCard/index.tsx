import type { IRoute } from "@/models/route";
import { getRouteTitle } from "@/screen/Route/Detail/utils";
import { router } from "expo-router";
import { ArrowRight, Bus, ChevronDown, Flame, Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type FeaturedRouteCardProps = {
    route: IRoute;
};

export function FeaturedRouteCard({ route }: FeaturedRouteCardProps) {
    const title = getRouteTitle(route);
    const start = route.startName?.trim();
    const end = route.endName?.trim();

    return (
        <Pressable
            accessibilityRole="button"
            className="w-[170px] active:opacity-90"
            onPress={() =>
                router.push({
                    pathname: "/routes/[id]",
                    params: { id: route._id },
                })
            }
        >
            <View
                className="overflow-hidden rounded-2xl bg-card"
                style={{
                    borderWidth: 1,
                    borderColor: "#e2e8f0",
                }}
            >
                <View className="flex-row items-center justify-between bg-primary px-4 py-3">
                    <View className="flex-row items-center gap-2.5">
                        <View className="h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                            <Bus color="#ffffff" size={18} strokeWidth={2.2} />
                        </View>
                        <View>
                            <Text className="text-[11px] font-medium text-white/75">
                                Tuyến
                            </Text>
                            <Text className="text-lg font-bold text-white">
                                {route.code}
                            </Text>
                        </View>
                    </View>

                    {route.isHot ? (
                        <View className="flex-row items-center gap-1 rounded-full bg-highlight px-2.5 py-1">
                            <Flame color="#005f8b" size={12} fill="#005f8b" />
                            <Text className="text-[11px] font-bold text-on-highlight">
                                Hot
                            </Text>
                        </View>
                    ) : null}
                </View>

                <View className="gap-3 p-4">
                    <Text
                        className="text-[15px] font-bold leading-5 text-text-primary"
                        numberOfLines={2}
                    >
                        {title}
                    </Text>

                    {start && end ? (
                        <View className="flex flex-col items-start gap-2 rounded-xl bg-primary-light/70 px-3 py-2.5">
                            <View className="flex-row items-center gap-2">
                                <Bus color="#00a2e8" size={14} />
                                <Text
                                    className="min-w-0 flex-1 text-xs font-semibold text-primary"
                                    numberOfLines={1}
                                >
                                    {start}
                                </Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                                <Bus color="#00a2e8" size={14} />
                                <Text
                                    className="min-w-0 flex-1 text-right text-xs font-semibold text-primary"
                                    numberOfLines={1}
                                >
                                    {end}
                                </Text>
                            </View>
                        </View>
                    ) : route.description ? (
                        <Text
                            className="text-xs leading-4 text-text-muted"
                            numberOfLines={2}
                        >
                            {route.description}
                        </Text>
                    ) : null}

                    <View className="flex-row items-center justify-between">
                        {route.operatingHours ? (
                            <Text className="text-xs text-text-muted">
                                {route.operatingHours}
                            </Text>
                        ) : (
                            <Text className="text-xs font-medium text-accent">
                                Xem chi tiết
                            </Text>
                        )}

                        {route.rating != null ? (
                            <View className="flex-row items-center gap-1">
                                <Star color="#ffc20e" fill="#ffc20e" size={13} />
                                <Text className="text-xs font-semibold text-text-primary">
                                    {route.rating.toFixed(1)}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
