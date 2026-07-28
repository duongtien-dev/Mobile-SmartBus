import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Select } from "@/components/Select";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import usePaginationList from "@/hooks/usePaginationList";
import { useTranslation } from "@/i18n";
import type { ITicket, TicketType } from "@/models/ticket";
import { MyTicketItem } from "@/screen/Profile/MyTickets/TicketItem";
import { ticketService } from "@/services/TicketService";
import { getTicketTypeLabel } from "@/utils/ticket";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

type TicketFilter = TicketType | "all";

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

    const [activeType, setActiveType] = useState<TicketFilter>("all");

    const filterOptions = useMemo(
        () => [
            { value: "all", label: t("common.all") },
            {
                value: "single",
                label: getTicketTypeLabel("single"),
            },
            {
                value: "monthlySingleRoute",
                label: getTicketTypeLabel("monthlySingleRoute"),
            },
            {
                value: "monthlyInterRoute",
                label: getTicketTypeLabel("monthlyInterRoute"),
            },
        ],
        [t],
    );

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

                        <View className="flex-row items-center gap-3 px-5 pb-2 pt-4">
                            <View className="min-w-0 flex-1">
                                <SectionTitle
                                    title={t("profile.tickets.allPurchased")}
                                    className="mb-0 px-0"
                                />
                            </View>

                            <View className="w-[42%] max-w-[168px] shrink-0">
                                <Select
                                    value={activeType}
                                    onValueChange={(value) =>
                                        setActiveType(value as TicketFilter)
                                    }
                                    options={filterOptions}
                                    className="h-10 rounded-xl bg-card"
                                    contentClassName='w-[200px]'
                                />
                            </View>
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <View className="px-5">
                        <MyTicketItem
                            ticket={item}
                            onPress={handleTicketPress}
                        />
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
