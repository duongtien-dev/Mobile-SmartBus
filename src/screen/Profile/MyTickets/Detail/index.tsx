import { Button } from "@/components/Button";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { formatVnd } from "@/constants/ticket";
import useFetch from "@/hooks/useFetch";
import type { ITicket } from "@/models/ticket";
import { ticketService } from "@/services/TicketService";
import {
    getTicketDisplayCode,
    getTicketRouteTitle,
    getTicketStatusConfig,
    getTicketTypeLabel,
    getTicketValidityLabel,
} from "@/utils/ticket";
import { Image } from "expo-image";
import { ArrowLeft } from "lucide-react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useTranslation } from "@/i18n";

export default function MyTicketDetailScreen() {
    const { t } = useTranslation();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: ticket, isLoading, loadFetchFn, } = useFetch<ITicket>({
        fetchFn: async () => {
            const response = await ticketService.getTicketDetail({ id });
            return response.data ?? null;
        },
    });

    useEffect(() => {
        if (!id) return;
        loadFetchFn();
    }, [id]);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-app-shell">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    if (!ticket) {
        return (
            <View className="flex-1 bg-app-shell">
                <View className="flex-row items-center justify-between bg-primary px-5 py-3">
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => router.back()}
                        className="h-10 w-10 items-center justify-center"
                    >
                        <ArrowLeft color="#fff" size={24} />
                    </Pressable>
                    <Text className="text-lg font-bold text-on-primary">
                        {t("ticket.qr.title")}
                    </Text>
                    <View className="h-10 w-10" />
                </View>

                <Text className="px-5 py-10 text-center text-sm text-text-muted">
                    {t("profile.ticketDetail.notFound")}
                </Text>
            </View>
        );
    }

    const status = getTicketStatusConfig(ticket.status);
    const displayCode = getTicketDisplayCode(ticket);

    function statusToVariant(
        s: ITicket["status"],
    ): "success" | "warning" | "muted" | "danger" {
        if (s === "paid" || s === "active") return "success";
        if (s === "pending") return "warning";
        if (s === "cancelled") return "danger";
        return "muted";
    }

    const qrEmpty = !ticket.qrCodeImage && !ticket.qrCode;

    return (
        <View className="flex-1 bg-app-shell">
            <View className="flex-row items-center justify-between bg-primary px-5 py-3">
                <Pressable
                    accessibilityRole="button"
                    onPress={() => router.back()}
                    className="h-10 w-10 items-center justify-center"
                >
                    <ArrowLeft color="#fff" size={24} />
                </Pressable>
                <Text className="text-lg font-bold text-on-primary">
                    {t("ticket.qr.title")}
                </Text>
                <View className="h-10 w-10" />
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    gap: 16,
                    paddingHorizontal: 20,
                    paddingTop: 24,
                    paddingBottom: 24,
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="items-center">
                    <Text className="text-center text-[18px] font-extrabold text-text-primary">
                        {t("ticket.qr.showToDriver")}
                    </Text>
                    <Text className="mt-2 text-center text-sm font-medium text-text-muted">
                        {t("ticket.qr.prepare")}
                    </Text>
                </View>

                <Card className="items-center border-border/60 bg-white" padding="lg" shadow={true}>
                    <View className="items-center justify-center">
                        {ticket.qrCodeImage ? (
                            <Image
                                source={{ uri: ticket.qrCodeImage }}
                                style={{ width: 250, height: 250 }}
                                contentFit="contain"
                            />
                        ) : (
                            <View className="h-[250px] w-[250px] items-center justify-center rounded-2xl border border-border bg-surface">
                                {qrEmpty ? (
                                    <Text className="text-sm font-semibold text-text-muted">
                                        {t("ticket.qr.empty")}
                                    </Text>
                                ) : (
                                    <Text className="px-4 text-center text-sm font-semibold text-text-muted">
                                        {ticket.qrCode}
                                    </Text>
                                )}
                            </View>
                        )}

                        <Text className="mt-5 text-center text-sm font-semibold text-text-primary">
                            {t("ticket.qr.codeLabel")} {displayCode}
                        </Text>
                        <Text className="mt-2 text-center text-sm text-text-muted">
                            {t("ticket.qr.scanHint")}
                        </Text>
                    </View>
                </Card>

                <Card className="gap-3" padding="lg">
                    <View className="flex-row items-start justify-between gap-3">
                        <Text className="flex-1 text-lg font-bold text-text-primary">
                            Tuyến {getTicketRouteTitle(ticket)}
                        </Text>
                        <StatusPill
                            label={status.label}
                            variant={statusToVariant(ticket.status)}
                        />
                    </View>

                    <View className="rounded-2xl bg-surface px-4 py-3">
                        <Text className="text-xs font-semibold text-text-muted">
                            {getTicketTypeLabel(ticket.ticketType)}
                        </Text>
                        <Text className="mt-1 text-sm text-text-muted">
                            {ticket.startStopName}
                        </Text>
                        <Text className="mt-1 text-sm font-semibold text-text-primary">
                            {getTicketValidityLabel(ticket)}
                        </Text>
                    </View>

                    <Text className="text-xs text-text-muted">
                        Giá: {formatVnd(ticket.price)}
                    </Text>
                </Card>
            </ScrollView>

            <View className="border-t border-border bg-card px-5 py-5">
                <Button
                    type="primary"
                    variant="bold"
                    className="w-full rounded-2xl"
                    onPress={() => router.push("/profile/my-tickets")}
                >
                    {t("ticket.qr.viewMyTickets")}
                </Button>
                <View className="h-3" />
                <Button
                    type="primary"
                    variant="outline"
                    className="w-full rounded-2xl"
                    onPress={() => router.push("/(tabs)")}
                >
                    {t("ticket.qr.goHome")}
                </Button>
            </View>
        </View>
    );
}
