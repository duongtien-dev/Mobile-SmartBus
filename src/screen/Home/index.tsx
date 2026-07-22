import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { QUICK_ACTIONS } from "@/constants/home";
import { HOME_TIPS } from "@/constants/homeSections";
import useFetch from "@/hooks/useFetch";
import usePaginationList from "@/hooks/usePaginationList";
import type { IPost } from "@/models/post";
import type { IRoute } from "@/models/route";
import type { ISuggestLocation } from "@/models/suggestLocation";
import { postService } from "@/services/PostService";
import { routeService } from "@/services/RouteService";
import useTripBookingStore from "@/store/tripBooking.store";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import { FaqPreview } from "./FaqPreview";
import { FeaturedRouteCard } from "./FeaturedRouteCard";
import { NewsCard } from "./NewCard";
import { QuickActionButton } from "./QuickAction";
import { SectionHeader } from "./SectionHeader";
import { SuggestLocationInput } from "./SuggestLocationInput";
import { TipCard } from "./TipCard";

const FEATURED_ROUTES_LIMIT = 6;

export default function HomeScreen() {
    const setSearchContext = useTripBookingStore(
        (state) => state.setSearchContext,
    );
    const prefillOrigin = useTripBookingStore((state) => state.prefillOrigin);
    const clearPrefillOrigin = useTripBookingStore(
        (state) => state.clearPrefillOrigin,
    );
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [originLocation, setOriginLocation] =
        useState<ISuggestLocation | null>(null);
    const [destinationLocation, setDestinationLocation] =
        useState<ISuggestLocation | null>(null);

    const {
        list: posts,
        loadFirstPage,
        isSkeletonLoading,
    } = usePaginationList<IPost>({
        fetchFn: async (payload) => {
            const response = await postService.listPosts(payload);
            return response.data ?? [];
        },
        limit: 12,
        params: {},
    });

    const {
        data: featuredRoutes,
        isLoading: isFeaturedRoutesLoading,
        loadFetchFn: loadFeaturedRoutes,
    } = useFetch<IRoute[]>({
        fetchFn: async () => {
            const response = await routeService.getRoutes({
                page: 1,
                limit: FEATURED_ROUTES_LIMIT,
                sort: "newest",
            });
            return response.data ?? [];
        },
    });

    useEffect(() => {
        loadFirstPage();
        loadFeaturedRoutes();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (!prefillOrigin) return;

            setOrigin(prefillOrigin.display_name);
            setOriginLocation(prefillOrigin);
            clearPrefillOrigin();
        }, [prefillOrigin, clearPrefillOrigin]),
    );

    const handleSearch = () => {
        if (!originLocation || !destinationLocation) {
            Toast.show({
                type: "error",
                text1: "Vui lòng chọn địa điểm từ gợi ý",
            });
            return;
        }

        setSearchContext({
            originName: origin,
            destinationName: destination,
            origin: {
                lat: originLocation.lat,
                lng: originLocation.lng,
            },
            destination: {
                lat: destinationLocation.lat,
                lng: destinationLocation.lng,
            },
        });

        router.push("/trips/search" as never);
    };

    const routeList = featuredRoutes ?? [];

    return (
        <View className="flex-1 bg-background">
            {/* <PageHeader title="Trang chủ" /> */}

            <View className="z-50 px-5">
                <View className="gap-4">
                    <SuggestLocationInput
                        label="Điểm đi"
                        placeholder="Địa chỉ hiện tại"
                        value={origin}
                        onChangeText={(text) => {
                            setOrigin(text);
                            setOriginLocation(null);
                        }}
                        onSelect={setOriginLocation}
                        zIndex={30}
                    />

                    <SuggestLocationInput
                        label="Điểm đến"
                        placeholder="Điểm đến"
                        value={destination}
                        onChangeText={(text) => {
                            setDestination(text);
                            setDestinationLocation(null);
                        }}
                        onSelect={setDestinationLocation}
                        zIndex={20}
                    />

                    <Button
                        type="accent"
                        variant="bold"
                        className="w-full rounded-xl"
                        onPress={handleSearch}
                    >
                        Tìm
                    </Button>
                </View>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-5 flex-col gap-3 pb-10 pt-3"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="mt-3 flex-row">
                    {QUICK_ACTIONS.map((action) => (
                        <QuickActionButton
                            key={action.id}
                            action={action}
                            onPress={() => router.push(action.path as any)}
                        />
                    ))}
                </View>

                <View className="mt-8">
                    <SectionHeader
                        title="TUYẾN XE NỔI BẬT"
                        actionLabel="Xem tất cả"
                        onActionPress={() => router.push("/routes/lookup")}
                    />

                    {isFeaturedRoutesLoading ? (
                        <View className="h-36 items-center justify-center">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : routeList.length > 0 ? (
                        <ScrollView
                            horizontal
                            nestedScrollEnabled
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="pr-5"
                        >
                            {routeList.map((route) => (
                                <FeaturedRouteCard
                                    key={route._id}
                                    route={route}
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <Text className="text-sm text-text-muted">
                            Chưa có tuyến xe
                        </Text>
                    )}
                </View>

                <View className="mt-8">
                    <SectionHeader title="MẸO DI CHUYỂN" />
                    <ScrollView
                        horizontal
                        nestedScrollEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName="pr-5"
                    >
                        {HOME_TIPS.map((tip) => (
                            <TipCard key={tip.id} tip={tip} />
                        ))}
                    </ScrollView>
                </View>

                <View className="mt-8">
                    <SectionHeader
                        title="KHÁM PHÁ TIN TỨC"
                        actionLabel="Xem tất cả"
                        onActionPress={() => router.push("/notice/list")}
                    />

                    {isSkeletonLoading ? (
                        <View className="h-40 items-center justify-center">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : (
                        <ScrollView
                            horizontal
                            nestedScrollEnabled
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="pr-5"
                        >
                            {posts.length > 0 ? (
                                posts.map((item) => (
                                    <NewsCard key={item._id} item={item} />
                                ))
                            ) : (
                                <Text className="text-sm text-text-muted">
                                    Chưa có tin tức
                                </Text>
                            )}
                        </ScrollView>
                    )}
                </View>

                <View className="mt-8">
                    <SectionHeader
                        title="HỎI ĐÁP NHANH"
                        actionLabel="Xem thêm"
                        onActionPress={() => router.push("/help")}
                    />
                    <FaqPreview />
                </View>
            </ScrollView>
        </View>
    );
}
