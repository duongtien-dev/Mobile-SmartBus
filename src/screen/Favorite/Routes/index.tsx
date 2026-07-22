import { PageHeader } from "@/components/PageHeader";
import TabContainer from "@/components/TabContainer";
import { Card } from "@/components/ui/Card";
import usePaginationList from "@/hooks/usePaginationList";
import type { IRoute } from "@/models/route";
import { RouteCard } from "@/screen/Route/Lookup/RouteCard";
import { favoriteRouteService } from "@/services/FavoriteRouteService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
} from "react-native";

const FAVORITE_TABS = [
    { key: "routes", label: "Tuyến" },
    { key: "stops", label: "Trạm" },
] as const;

type FavoriteTab = (typeof FAVORITE_TABS)[number]["key"];

export default function FavoriteRoutesScreen() {
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
        <View className="flex-1 bg-app-shell">
            <PageHeader title="Yêu thích" isIconBack />

            <View className="border-b border-border bg-card px-5 pb-4">
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
                        <View className="px-5 pt-3">
                            <Card padding="none">
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
                            </Card>
                        </View>
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
                            <Card className="mx-5 mt-4">
                                <Text className="py-4 text-center text-sm text-text-muted">
                                    Chưa có tuyến yêu thích
                                </Text>
                            </Card>
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
                <Card className="mx-5 mt-4">
                    <Text className="py-6 text-center text-sm text-text-muted">
                        Tính năng trạm yêu thích sắp ra mắt
                    </Text>
                </Card>
            )}
        </View>
    );
}
