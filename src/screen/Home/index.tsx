import { Button } from "@/components/Button";
import { Card } from "@/components/ui/Card";
import { SearchPillContainer } from "@/components/ui/SearchPill";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { QUICK_ACTIONS } from "@/constants/home";
import { HOME_TIPS } from "@/constants/homeSections";
import useFetch from "@/hooks/useFetch";
import usePaginationList from "@/hooks/usePaginationList";
import type { IPost } from "@/models/post";
import type { IRoute } from "@/models/route";
import type { ISuggestLocation } from "@/models/suggestLocation";
import { postService } from "@/services/PostService";
import { routeService } from "@/services/RouteService";
import useAuthStore from "@/store/auth.store";
import useTripBookingStore from "@/store/tripBooking.store";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import { FaqPreview } from "./FaqPreview";
import { FeaturedRouteCard } from "./FeaturedRouteCard";
import { NewsCard } from "./NewCard";
import { QuickActionButton } from "./QuickAction";
import { SuggestLocationInput } from "./SuggestLocationInput";
import { TipCard } from "./TipCard";
import { UserRound } from "lucide-react-native";

const FEATURED_ROUTES_LIMIT = 6;

export default function HomeScreen() {
    const user = useAuthStore((state) => state.user);
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
    const greetingName = user?.full_name?.split(" ")[0] ?? "bạn";

    return (
        <View className="flex-1 bg-app-shell">
            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-5 px-5 pb-10 pt-3"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="w-full flex-row items-start justify-between gap-3">
                    <View className="min-w-0 flex-1 gap-0.5">
                        <Text className="text-xl font-bold text-text-primary">
                            Xin chào, {greetingName}
                        </Text>
                        <Text className="text-sm text-text-muted">
                            Bạn muốn đi đâu hôm nay?
                        </Text>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Tài khoản"
                        className="h-10 w-10 items-center justify-center rounded-full bg-primary-light active:opacity-80"
                        onPress={() => router.push("/profile")}
                    >
                        <UserRound color="#005f8b" size={22} />
                    </Pressable>
                </View>

                <SearchPillContainer>
                    <SuggestLocationInput
                        label="Điểm đi"
                        placeholder="Địa chỉ hiện tại"
                        value={origin}
                        onChangeText={(text) => {
                            setOrigin(text);
                            setOriginLocation(null);
                        }}
                        onSelect={setOriginLocation}
                    />

                    <SuggestLocationInput
                        label="Điểm đến"
                        placeholder="Bạn muốn đến đâu?"
                        value={destination}
                        onChangeText={(text) => {
                            setDestination(text);
                            setDestinationLocation(null);
                        }}
                        onSelect={setDestinationLocation}
                    />

                    <Button
                        type="primary"
                        variant="bold"
                        className="w-full rounded-xl"
                        onPress={handleSearch}
                    >
                        Tìm chuyến
                    </Button>
                </SearchPillContainer>

                <Card padding="md" shadow>
                    <View className="flex-row justify-between">
                        {QUICK_ACTIONS.map((action) => (
                            <QuickActionButton
                                key={action.id}
                                action={action}
                                onPress={() => router.push(action.path as any)}
                            />
                        ))}
                    </View>
                </Card>

                <View className="gap-3">
                    <SectionTitle
                        title="Tuyến xe nổi bật"
                        actionLabel="Xem tất cả"
                        onActionPress={() => router.push("/routes/lookup")}
                    />

                    {isFeaturedRoutesLoading ? (
                        <Card className="h-36 items-center justify-center">
                            <ActivityIndicator color="#005f8b" />
                        </Card>
                    ) : routeList.length > 0 ? (
                        <ScrollView
                            horizontal
                            nestedScrollEnabled
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="gap-3 pr-2"
                        >
                            {routeList.map((route) => (
                                <FeaturedRouteCard
                                    key={route._id}
                                    route={route}
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <Card>
                            <Text className="text-sm text-text-muted">
                                Chưa có tuyến xe
                            </Text>
                        </Card>
                    )}
                </View>

                <View className="gap-3">
                    <SectionTitle title="Mẹo di chuyển" />
                    <ScrollView
                        horizontal
                        nestedScrollEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName="gap-3 pr-2"
                    >
                        {HOME_TIPS.map((tip) => (
                            <TipCard key={tip.id} tip={tip} />
                        ))}
                    </ScrollView>
                </View>

                <View className="gap-3">
                    <SectionTitle
                        title="Khám phá tin tức"
                        actionLabel="Xem tất cả"
                        onActionPress={() => router.push("/notice/list")}
                    />

                    {isSkeletonLoading ? (
                        <Card className="h-40 items-center justify-center">
                            <ActivityIndicator color="#005f8b" />
                        </Card>
                    ) : (
                        <ScrollView
                            horizontal
                            nestedScrollEnabled
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="gap-3 pr-2"
                        >
                            {posts.length > 0 ? (
                                posts.map((item) => (
                                    <NewsCard key={item._id} item={item} />
                                ))
                            ) : (
                                <Card>
                                    <Text className="text-sm text-text-muted">
                                        Chưa có tin tức
                                    </Text>
                                </Card>
                            )}
                        </ScrollView>
                    )}
                </View>

                <View className="gap-3">
                    <SectionTitle
                        title="Hỏi đáp nhanh"
                        actionLabel="Xem thêm"
                        onActionPress={() => router.push("/help")}
                    />
                    <Card padding="none">
                        <FaqPreview />
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
}
