import useFetch from "@/hooks/useFetch";
import { useTranslation } from "@/i18n";
import {
    tourPackService,
    type TourPack,
} from "@/services/TourPackService";
import useLocaleStore from "@/store/locale.store";
import { router } from "expo-router";
import { Compass } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useEffect } from "react";

/** A5 — gói du lịch trên Home */
export function TourPackPreview() {
    const { t } = useTranslation();
    const locale = useLocaleStore((s) => s.locale);

    const { data: packs, loadFetchFn } = useFetch<TourPack[]>({
        fetchFn: async () => {
            const response = await tourPackService.list({ locale });
            return response.data ?? [];
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, [locale, loadFetchFn]);

    if (!packs?.length) return null;

    return (
        <View className="gap-3">
            <View className="flex-row items-center gap-2">
                <Compass color="#005f8b" size={18} />
                <Text className="text-base font-bold text-text-primary">
                    {t("live.tour.title")}
                </Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-3"
            >
                {packs.map((pack) => (
                    <Pressable
                        key={pack.id}
                        className="w-64 rounded-2xl border border-border bg-white p-4 active:opacity-90"
                        onPress={() => router.push("/help" as never)}
                    >
                        <Text
                            className="text-base font-bold text-text-primary"
                            numberOfLines={2}
                        >
                            {pack.title}
                        </Text>
                        <Text
                            className="mt-1 text-sm text-text-muted"
                            numberOfLines={3}
                        >
                            {pack.description}
                        </Text>
                        <Text className="mt-3 text-xs font-medium text-accent">
                            {t("live.tour.howToBuy")}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}
