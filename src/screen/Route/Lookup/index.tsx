import InputText from "@/components/Input/InputText";
import usePaginationList from "@/hooks/usePaginationList";
import type { IRoute } from "@/models/route";
import { RouteCard } from "@/screen/Route/Lookup/RouteCard";
import { routeService } from "@/services/RouteService";
import { router } from "expo-router";
import { ArrowLeft, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PAGE_SIZE = 10;

export default function RouteLookupScreen() {
    const insets = useSafeAreaInsets();
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    const {
        list: routes,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<IRoute, { sort: "newest"; search: string }>({
        fetchFn: async (payload) => {
            const response = await routeService.getRoutes(payload);
            return response.data ?? [];
        },
        limit: PAGE_SIZE,
        params: { sort: "newest", search },
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput.trim());
        }, 400);

        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => {
        loadFirstPage();
    }, [search]);

    return (
        <View className="flex-1 bg-background">
            <View className="bg-primary" style={{ paddingTop: insets.top }}>
                <View className="h-12 flex-row items-center gap-2 px-4">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Quay lại"
                        className="h-10 w-10 items-center justify-center active:opacity-80"
                        hitSlop={8}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft color="#ffffff" size={24} />
                    </Pressable>
                    <Text className="text-lg font-bold text-on-primary">
                        Tra cứu tuyến xe
                    </Text>
                </View>
            </View>

            <View className="px-5 pb-3 pt-4">
                <View className="relative justify-center">
                    <View
                        pointerEvents="none"
                        className="absolute left-3.5 z-10"
                    >
                        <Search color="#94a3b8" size={18} />
                    </View>
                    <InputText
                        value={searchInput}
                        onChangeText={setSearchInput}
                        placeholder="Nhập số hiệu hoặc tên tuyến..."
                        returnKeyType="search"
                        className="rounded-full border-0 bg-surface py-3 pl-11 pr-4"
                    />
                </View>
            </View>

            <FlatList
                className="flex-1"
                data={routes}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <RouteCard route={item} />}
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
                        <Text className="px-5 py-10 text-center text-sm text-text-muted">
                            Không tìm thấy tuyến xe
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
        </View>
    );
}
