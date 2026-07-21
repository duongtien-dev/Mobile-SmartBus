import type { IRoute } from "@/models/route";
import { getRouteTitle } from "@/screen/Route/Detail/utils";
import { router } from "expo-router";
import { Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type FeaturedRouteCardProps = {
    route: IRoute;
};

export function FeaturedRouteCard({ route }: FeaturedRouteCardProps) {
    const title = getRouteTitle(route);

    return (
        <Pressable
            accessibilityRole="button"
            className="mr-3 w-44 active:opacity-90"
            onPress={() =>
                router.push({
                    pathname: "/routes/[id]",
                    params: { id: route._id },
                })
            }
        >
            <View className="overflow-hidden rounded-xl border border-border bg-surface-elevated p-4">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <Text className="text-sm font-bold text-on-primary">
                        {route.code}
                    </Text>
                </View>

                <Text
                    className="mt-3 text-sm font-semibold text-text-primary"
                    numberOfLines={2}
                >
                    {title}
                </Text>

                {route.description ? (
                    <Text
                        className="mt-1 text-xs text-text-muted"
                        numberOfLines={2}
                    >
                        {route.description}
                    </Text>
                ) : null}

                {route.rating != null ? (
                    <View className="mt-3 flex-row items-center gap-1">
                        <Star color="#ffc20e" fill="#ffc20e" size={12} />
                        <Text className="text-xs font-medium text-text-primary">
                            {route.rating.toFixed(1)}
                        </Text>
                    </View>
                ) : null}
            </View>
        </Pressable>
    );
}
