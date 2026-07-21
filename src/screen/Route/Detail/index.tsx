import TabContainer from "@/components/TabContainer";
import type { IRoute } from "@/models/route";
import type { IStop } from "@/models/stop";
import { InfoTab } from "@/screen/Route/Detail/InfoTab";
import { ReviewsTab } from "@/screen/Route/Detail/ReviewsTab";
import { RouteDetailMap } from "@/screen/Route/Detail/RouteDetailMap";
import { ScheduleTab } from "@/screen/Route/Detail/ScheduleTab";
import { StopsTab } from "@/screen/Route/Detail/StopsTab";
import { getRouteTitle } from "@/screen/Route/Detail/utils";
import { routeService } from "@/services/RouteService";
import { stopService } from "@/services/StopService";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DETAIL_TABS = [
    { key: "schedule", label: "Biểu đồ giờ" },
    { key: "stops", label: "Trạm dừng" },
    { key: "info", label: "Thông tin" },
    { key: "reviews", label: "Đánh giá" },
] as const;

type DetailTab = (typeof DETAIL_TABS)[number]["key"];

export default function RouteDetailScreen() {
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams<{ id: string }>();
    const routeId = Array.isArray(id) ? id[0] : id;

    const [activeTab, setActiveTab] = useState<DetailTab>("schedule");
    const [route, setRoute] = useState<IRoute | null>(null);
    const [stops, setStops] = useState<IStop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!routeId) return;

        let mounted = true;

        const fetchDetail = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [routeResponse, stopsResponse] = await Promise.all([
                    routeService.getRouteById({ id: routeId }),
                    stopService.listStopsByRoute({ routeId, page: 1, limit: 200 }),
                ]);

                if (!mounted) return;

                setRoute((routeResponse.data ?? null) as IRoute | null);
                setStops((stopsResponse.data ?? []) as IStop[]);
            } catch {
                if (mounted) {
                    setError("Không thể tải chi tiết tuyến xe");
                }
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        fetchDetail();
        return () => {
            mounted = false;
        };
    }, [routeId]);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator color="#005f8b" size="large" />
            </View>
        );
    }

    if (error || !route) {
        return (
            <View className="flex-1 bg-background">
                <View className="bg-primary" style={{ paddingTop: insets.top }}>
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
                        <Text className="text-lg font-bold text-on-primary">
                            Chi tiết tuyến xe
                        </Text>
                    </View>
                </View>
                <Text className="px-5 py-10 text-center text-sm text-text-muted">
                    {error ?? "Không tìm thấy tuyến xe"}
                </Text>
            </View>
        );
    }

    const title = getRouteTitle(route);

    return (
        <View className="flex-1 bg-background">
            <View className="bg-primary" style={{ paddingTop: insets.top }}>
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
                    <Text className="text-lg font-bold text-on-primary">
                        Chi tiết tuyến xe
                    </Text>
                </View>
            </View>

            <View className="h-48">
                <RouteDetailMap stops={stops} />
            </View>

            <View className="flex-row items-center gap-3 border-b border-border px-5 py-4">
                <View className="rounded-md bg-accent px-2.5 py-1">
                    <Text className="text-sm font-bold text-on-primary">
                        {route.code}
                    </Text>
                </View>
                <Text
                    className="min-w-0 flex-1 text-base font-bold text-text-primary"
                    numberOfLines={1}
                >
                    {title}
                </Text>
                <View className="rounded-full bg-accent-light px-3 py-1">
                    <Text className="text-xs font-semibold text-accent">
                        Lượt đi
                    </Text>
                </View>
            </View>

            <View className="border-b border-border px-5">
                <TabContainer
                    tabs={DETAIL_TABS.map((tab) => ({
                        key: tab.key,
                        label: tab.label,
                    }))}
                    value={activeTab}
                    onChange={(value) => setActiveTab(value as DetailTab)}
                    variant="underline"
                    tabListClassName="gap-5 justify-between"
                    triggerClassName="px-0"
                />
            </View>

            {activeTab === "reviews" ? (
                <ReviewsTab routeId={route._id} />
            ) : (
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-8"
                >
                    {activeTab === "schedule" ? (
                        <ScheduleTab stops={stops} />
                    ) : null}
                    {activeTab === "stops" ? <StopsTab stops={stops} /> : null}
                    {activeTab === "info" ? (
                        <InfoTab route={route} stops={stops} />
                    ) : null}
                </ScrollView>
            )}
        </View>
    );
}
