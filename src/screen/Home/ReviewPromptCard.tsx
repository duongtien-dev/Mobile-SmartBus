import { Button } from "@/components/Button";
import useFetch from "@/hooks/useFetch";
import { useTranslation } from "@/i18n";
import type { IRoute } from "@/models/route";
import { routeService } from "@/services/RouteService";
import useAuthStore from "@/store/auth.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const DISMISS_KEY = "DagoBus.reviewPrompt.dismissedAt";
const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;

/**
 * A4 — gợi ý đánh giá tuyến đã đi nhưng chưa review.
 */
export function ReviewPromptCard() {
    const { t } = useTranslation();
    const user = useAuthStore((s) => s.user);
    const [visible, setVisible] = useState(false);

    const { data: routes, loadFetchFn } = useFetch<IRoute[]>({
        fetchFn: async () => {
            const response = await routeService.getRoutes({
                page: 1,
                limit: 1,
                unreviewedOnly: true,
            });
            return response.data ?? [];
        },
    });

    useEffect(() => {
        if (!user) {
            setVisible(false);
            return;
        }

        (async () => {
            try {
                const raw = await AsyncStorage.getItem(DISMISS_KEY);
                if (raw) {
                    const dismissedAt = Number(raw);
                    if (
                        Number.isFinite(dismissedAt) &&
                        Date.now() - dismissedAt < DISMISS_COOLDOWN_MS
                    ) {
                        setVisible(false);
                        return;
                    }
                }
            } catch {
                // ignore
            }
            loadFetchFn();
        })();
    }, [user, loadFetchFn]);

    useEffect(() => {
        setVisible(Boolean(user && routes && routes.length > 0));
    }, [user, routes]);

    const route = routes?.[0];
    if (!visible || !route) return null;

    const dismiss = async () => {
        setVisible(false);
        try {
            await AsyncStorage.setItem(DISMISS_KEY, String(Date.now()));
        } catch {
            // ignore
        }
    };

    return (
        <View className="rounded-2xl border border-border bg-white p-4">
            <View className="flex-row items-start gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-highlight-light">
                    <Star color="#ffc20e" fill="#ffc20e" size={20} />
                </View>
                <View className="min-w-0 flex-1">
                    <Text className="text-base font-bold text-text-primary">
                        {t("live.reviewPrompt.title")}
                    </Text>
                    <Text className="mt-1 text-sm text-text-muted">
                        {t("live.reviewPrompt.body", {
                            route: route.code || route.name,
                        })}
                    </Text>
                    <View className="mt-3 flex-row gap-2">
                        <Button
                            type="primary"
                            variant="bold"
                            size="sm"
                            className="flex-1"
                            onPress={() => {
                                dismiss();
                                router.push("/routes/reviews/create" as never);
                            }}
                        >
                            {t("live.reviewPrompt.cta")}
                        </Button>
                        <Pressable
                            className="flex-1 items-center justify-center rounded-lg border border-border"
                            onPress={dismiss}
                        >
                            <Text className="text-sm text-text-muted">
                                {t("live.reviewPrompt.later")}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}
