import { PageHeader } from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import { Card } from "@/components/ui/Card";
import usePaginationList from "@/hooks/usePaginationList";
import { useTranslation } from "@/i18n";
import type { IRoute } from "@/models/route";
import { RouteCard } from "@/screen/Route/Lookup/RouteCard";
import { routeService } from "@/services/RouteService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function RouteLookupScreen() {
    const { t } = useTranslation();
    const [searchInput, setSearchInput] = useState("");
    const {
        list: routes,
        setList,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<IRoute, { sort: string; search: string }>({
        fetchFn: async (payload) => {
            const response = await routeService.getRoutes(payload);
            return response.data ?? [];
        },
        limit: 12,
        params: { sort: "newest", search: searchInput },
    });

    useEffect(() => {
        loadFirstPage();
    }, [searchInput]);

    const handleFavoriteChange = (routeId: string, isFavorite: boolean) => {
        setList((prev) =>
            prev.map((item) =>
                item._id === routeId ? { ...item, isFavorite } : item,
            ),
        );
    };

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={t("route.lookup.title")} isIconBack />

            <View className="px-5 pb-3 pt-4">
                <SearchInput
                    onSearch={setSearchInput}
                    placeholder={t("route.lookup.placeholder")}
                />
            </View>

            <FlatList
                className="flex-1"
                data={routes}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View className="px-5 pb-3">
                        <Card padding="none">
                            <RouteCard
                                route={item}
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
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                    isSkeletonLoading ? (
                        <View className="items-center py-10">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : (
                        <Card className="mx-5">
                            <Text className="py-4 text-center text-sm text-text-muted">
                                {t("route.lookup.empty")}
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
        </View>
    );
}
