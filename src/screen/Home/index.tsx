import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
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
import { UserRound } from "lucide-react-native";
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
            <PageHeader
                variant="immersive"
                title={`Xin chào, ${greetingName}`}
                subtitle="Bạn muốn đi đâu hôm nay?"
            >
                <Pressable
                    accessibilityRole="button"
                    className="absolute right-0 top-0 h-10 w-10 items-center justify-center rounded-full bg-primary-light active:opacity-80"
                    onPress={() => router.push("/profile")}
                >
                    <UserRound color="#005f8b" size={22} />
                </Pressable>
            </PageHeader>

            <View className="z-50 px-5 pb-2">
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
                        zIndex={30}
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
                        zIndex={20}
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
            </View>

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-6 px-5 pb-10 pt-4"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
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

                <View>
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

                <View>
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

                <View>
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

                <View>
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
