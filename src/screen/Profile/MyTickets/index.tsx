import { Button } from "@/components/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHeader } from "@/components/PageHeader";
import usePaginationList from "@/hooks/usePaginationList";
import { useTranslation } from "@/i18n";
import type { ITicket } from "@/models/ticket";
import { MyTicketItem } from "@/screen/Profile/MyTickets/TicketItem";
import { ticketService } from "@/services/TicketService";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

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

    useEffect(() => {
        loadFirstPage();
    }, []);

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

            <View className="px-5 pt-4">
                <Button
                    type="primary"
                    variant="bold"
                    className="w-full rounded-xl"
                    onPress={handleOpenQrList}
                >
                    {t("profile.tickets.availableQr")}
                </Button>
            </View>

            <FlatList
                className="flex-1"
                data={tickets}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                    <View className="px-5 pb-2 pt-4">
                        <SectionTitle title={t("profile.tickets.allPurchased")} />
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
