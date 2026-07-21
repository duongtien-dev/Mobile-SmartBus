import TabContainer from "@/components/TabContainer";
import usePaginationList from "@/hooks/usePaginationList";
import type { IRoute } from "@/models/route";
import { RouteCard } from "@/screen/Route/Lookup/RouteCard";
import { favoriteRouteService } from "@/services/FavoriteRouteService";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FAVORITE_TABS = [
    { key: "routes", label: "Tuyến" },
    { key: "stops", label: "Trạm" },
] as const;

type FavoriteTab = (typeof FAVORITE_TABS)[number]["key"];

export default function FavoriteRoutesScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<FavoriteTab>("routes");

    const {
        list: routes,
        setList,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<IRoute>({
        fetchFn: async (payload) => {
            const response = await favoriteRouteService.listFavorites(payload);
            return response.data ?? [];
        },
        limit: 12,
        params: {},
    });

    useEffect(() => {
        if (activeTab === "routes") {
            loadFirstPage();
        }
    }, [activeTab]);

    const handleFavoriteChange = (routeId: string, isFavorite: boolean) => {
        if (!isFavorite) {
            setList((prev) => prev.filter((item) => item._id !== routeId));
            return;
        }

        setList((prev) =>
            prev.map((item) =>
                item._id === routeId ? { ...item, isFavorite } : item,
            ),
        );
    };

    return (
        <View className="flex-1 bg-background flex flex-col gap-5">
            <View className="bg-alert" style={{ paddingTop: insets.top }}>
                <View className="flex-row items-center gap-2 px-4 py-3">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Quay lại"
                        className="h-10 w-10 items-center justify-center active:opacity-80"
                        hitSlop={8}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft color="#ffffff" size={24} />
                    </Pressable>
                    <Text className="text-lg font-bold text-on-alert">
                        Yêu thích
                    </Text>
                </View>
            </View>

            <View className="border-b border-border pb-5">
                <TabContainer
                    tabs={FAVORITE_TABS.map((tab) => ({
                        key: tab.key,
                        label: tab.label,
                    }))}
                    value={activeTab}
                    onChange={(value) => setActiveTab(value as FavoriteTab)}
                    variant="underline"
                    tabListClassName="gap-10 justify-center"
                />
            </View>

            {activeTab === "routes" ? (
                <FlatList
                    className="flex-1"
                    data={routes}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <RouteCard
                            route={{ ...item, isFavorite: true }}
                            onPress={(route) =>
                                router.push({
                                    pathname: "/routes/[id]",
                                    params: { id: route._id },
                                })
                            }
                            onFavoriteChange={handleFavoriteChange}
                        />
                    )}
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
                            <Text className="px-5 py-10 text-center text-sm text-text-muted">
                                Chưa có tuyến yêu thích
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
            ) : (
                <Text className="px-5 py-10 text-center text-sm text-text-muted">
                    Tính năng trạm yêu thích sắp ra mắt
                </Text>
            )}
        </View>
    );
}
