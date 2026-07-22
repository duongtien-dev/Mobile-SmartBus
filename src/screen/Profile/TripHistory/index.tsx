import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import usePaginationList from "@/hooks/usePaginationList";
import type { ITicket } from "@/models/ticket";
import { TripHistoryItem } from "@/screen/Profile/TripHistory/TripHistoryItem";
import { ticketService } from "@/services/TicketService";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function TripHistoryScreen() {
    const {
        list: trips,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<ITicket>({
        fetchFn: async (payload) => {
            const response = await ticketService.getTripHistory(payload);
            return response.data?.items ?? [];
        },
        limit: 12,
        params: {},
    });

    useEffect(() => {
        loadFirstPage();
    }, []);

    const handleTripPress = (ticket: ITicket) => {
        router.push({
            pathname: "/profile/my-tickets/[id]",
            params: { id: ticket._id },
        });
    };

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title="Lịch sử chuyến đi" isIconBack />

            <FlatList
                className="flex-1"
                data={trips}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                    <View className="px-5 pb-2 pt-4">
                        <SectionTitle title="Các chuyến đã đi gần đây" />
                    </View>
                }
                renderItem={({ item }) => (
                    <View className="px-5">
                        <TripHistoryItem ticket={item} onPress={handleTripPress} />
                    </View>
                )}
                onEndReached={() => {
                    if (trips.length > 0 && !isSkeletonLoading) {
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
                                Chưa có chuyến đi nào
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
