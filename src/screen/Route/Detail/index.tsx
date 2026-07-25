import TabContainer from "@/components/TabContainer";
import { useTranslation } from "@/i18n";
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
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

const DETAIL_TAB_KEYS = ["schedule", "stops", "info", "reviews"] as const;

type DetailTab = (typeof DETAIL_TAB_KEYS)[number];

export default function RouteDetailScreen() {
    const { t } = useTranslation();
    const { id } = useLocalSearchParams<{ id: string }>();
    const routeId = Array.isArray(id) ? id[0] : id;

    const [activeTab, setActiveTab] = useState<DetailTab>("schedule");
    const [route, setRoute] = useState<IRoute | null>(null);
    const [stops, setStops] = useState<IStop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const detailTabs = useMemo(
        () =>
            DETAIL_TAB_KEYS.map((key) => ({
                key,
                label: t(`route.detail.tab.${key}`),
            })),
        [t],
    );

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
                    setError(t("route.detail.loadFail"));
                }
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        fetchDetail();
        return () => {
            mounted = false;
        };
    }, [routeId, t]);

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
                <View className="bg-primary">
                    <View className="flex-row items-center gap-2 px-4 py-3">
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel={t("a11y.back")}
                            className="h-10 w-10 items-center justify-center active:opacity-80"
                            hitSlop={8}
                            onPress={() => router.back()}
                        >
                            <ArrowLeft color="#ffffff" size={24} />
                        </Pressable>
                        <Text className="text-lg font-bold text-on-primary">
                            {t("route.detail.title")}
                        </Text>
                    </View>
                </View>
                <Text className="px-5 py-10 text-center text-sm text-text-muted">
                    {error ?? t("route.detail.notFound")}
                </Text>
            </View>
        );
    }

    const title = getRouteTitle(route);

    return (
        <View className="flex-1 bg-background">
            <View className="bg-primary">
                <View className="flex-row items-center gap-2 px-4 py-3">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={t("a11y.back")}
                        className="h-10 w-10 items-center justify-center active:opacity-80"
                        hitSlop={8}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft color="#ffffff" size={24} />
                    </Pressable>
                    <Text className="text-lg font-bold text-on-primary">
                        {t("route.detail.title")}
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
                        {t("route.detail.outbound")}
                    </Text>
                </View>
            </View>

            <View className="border-b border-border px-5">
                <TabContainer
                    tabs={detailTabs}
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
