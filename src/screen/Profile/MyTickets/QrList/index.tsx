import { PageHeader } from "@/components/PageHeader";
import usePaginationList from "@/hooks/usePaginationList";
import type { ITicket } from "@/models/ticket";
import { QrTicketItem } from "@/screen/Profile/MyTickets/TicketItem";
import { ticketService } from "@/services/TicketService";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MyTicketQrListScreen() {
    const {
        list: tickets,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<ITicket, { includeQr: boolean; onlyAvailableQr: boolean }>({
        fetchFn: async (payload) => {
            const response = await ticketService.getMyTickets(payload);
            return response.data?.items ?? [];
        },
        limit: 12,
        params: {
            includeQr: true,
            onlyAvailableQr: true,
        },
    });

    useEffect(() => {
        loadFirstPage();
    }, []);

    const handleTicketPress = (ticket: ITicket) => {
        router.push({
            pathname: "/profile/my-tickets/[id]",
            params: { id: ticket._id },
        });
    };

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title="Mã QR khả dụng" isIconBack />

            <FlatList
                className="flex-1"
                data={tickets}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View className="px-5">
                        <QrTicketItem ticket={item} onPress={handleTicketPress} />
                    </View>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pt-5 pb-8"
                ListEmptyComponent={
                    isSkeletonLoading ? (
                        <View className="items-center py-10">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : (
                        <Text className="px-5 py-10 text-center text-sm text-text-muted">
                            Không có mã QR khả dụng
                        </Text>
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
