import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import usePaginationList from "@/hooks/usePaginationList";
import type { ITicket } from "@/models/ticket";
import { MyTicketItem } from "@/screen/Profile/MyTickets/TicketItem";
import { ticketService } from "@/services/TicketService";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import { UserRound } from "lucide-react-native";
import { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
} from "react-native";

export default function MyTicketsScreen() {
    const user = useAuthStore((state) => state.user);

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
        <View className="flex-1 bg-background">
            <PageHeader title="Vé của bạn" isIconBack />

            <View className="px-5 pt-5">
                <Button
                    type="primary"
                    variant="bold"
                    className="w-full rounded-2xl py-4"
                    onPress={handleOpenQrList}
                >
                    Mã QR khả dụng
                </Button>
            </View>

            <Text className="px-5 pb-3 pt-6 text-base font-bold text-text-primary">
                Tất cả vé đã mua
            </Text>

            <FlatList
                className="flex-1"
                data={tickets}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <MyTicketItem ticket={item} onPress={handleTicketPress} />
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
                        <Text className="px-5 py-10 text-center text-sm text-text-muted">
                            Bạn chưa có vé nào
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
