import { Button } from "@/components/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHeader } from "@/components/PageHeader";
import usePaginationList from "@/hooks/usePaginationList";
import { useTranslation } from "@/i18n";
import type { ITicket, TicketType } from "@/models/ticket";
import { MyTicketItem } from "@/screen/Profile/MyTickets/TicketItem";
import { ticketService } from "@/services/TicketService";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { getTicketTypeLabel } from "@/utils/ticket";

export default function MyTicketsScreen() {
    const { t } = useTranslation();
    const {
        list: tickets,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<ITicket>({
        fetchFn: async (payload) => {
            const response = await ticketService.getMyTickets(payload);
            return response.data?.items ?? [];
        },
        limit: 12,
        params: {},
    });

    const [activeType, setActiveType] = useState<TicketType | "all">("all");

    useEffect(() => {
        loadFirstPage();
    }, []);

    const filteredTickets = useMemo(() => {
        if (activeType === "all") return tickets;
        return tickets.filter((ticket) => ticket.ticketType === activeType);
    }, [tickets, activeType]);

    const handleOpenQrList = () => {
        router.push("/profile/my-tickets/qr");
    };

    const handleTicketPress = (ticket: ITicket) => {
        router.push({
            pathname: "/profile/my-tickets/[id]",
            params: { id: ticket._id },
        });
    };

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={t("profile.tickets.title")} isIconBack />

            <FlatList
                className="flex-1"
                data={filteredTickets}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                    <View className="pt-4">
                        <View className="px-5">
                            <Button
                                type="primary"
                                variant="bold"
                                className="w-full rounded-2xl"
                                onPress={handleOpenQrList}
                            >
                                {t("profile.tickets.availableQr")}
                            </Button>
                        </View>

                        <View className="mt-4 px-5">
                            <View className="flex-row items-center rounded-[28px] bg-surface p-1">
                                {(
                                    [
                                        { value: "all" as const, label: t("common.all") },
                                        {
                                            value: "single" as const,
                                            label: getTicketTypeLabel("single"),
                                        },
                                        {
                                            value: "monthlySingleRoute" as const,
                                            label: getTicketTypeLabel(
                                                "monthlySingleRoute",
                                            ),
                                        },
                                        {
                                            value: "monthlyInterRoute" as const,
                                            label: getTicketTypeLabel(
                                                "monthlyInterRoute",
                                            ),
                                        },
                                    ] as const
                                ).map((seg) => {
                                    const isActive = seg.value === activeType;
                                    return (
                                        <Pressable
                                            key={seg.value}
                                            accessibilityRole="button"
                                            onPress={() => setActiveType(seg.value)}
                                            className={`flex-1 rounded-[24px] px-3 py-2.5 ${
                                                isActive
                                                    ? "bg-primary"
                                                    : "bg-transparent"
                                            }`}
                                        >
                                            <Text
                                                className={`text-center text-xs font-semibold ${
                                                    isActive
                                                        ? "text-on-primary"
                                                        : "text-text-muted"
                                                }`}
                                            >
                                                {seg.label}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>

                        <View className="px-5 pb-2 pt-4">
                            <SectionTitle
                                title={t("profile.tickets.allPurchased")}
                            />
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <View className="px-5">
                        <MyTicketItem ticket={item} onPress={handleTicketPress} />
                    </View>
                )}
                onEndReached={() => {
                    if (tickets.length > 0 && !isSkeletonLoading) {
                        loadMore();
                    }
                }}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-8"
                ListEmptyComponent={
                    isSkeletonLoading ? (
                        <View className="items-center py-10">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : (
                        <Card className="mx-5">
                            <Text className="py-4 text-center text-sm text-text-muted">
                                {t("profile.tickets.empty")}
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
