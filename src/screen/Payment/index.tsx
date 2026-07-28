import { formatVnd } from "@/constants/ticket";
import useFetch from "@/hooks/useFetch";
import { useTranslation } from "@/i18n";
import type { IPaymentMethod } from "@/models/paymentMethod";
import type { ITicket } from "@/models/ticket";
import { ExpenseSection } from "@/screen/Payment/ExpenseSection";
import { PaymentQuickActions } from "@/screen/Payment/PaymentQuickActions";
import { WalletCardStack } from "@/screen/Payment/WalletCardStack";
import { paymentService } from "@/services/PaymentService";
import { ticketService } from "@/services/TicketService";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function PaymentScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const {
        data: paymentMethods,
        isLoading,
        loadFetchFn,
    } = useFetch<IPaymentMethod[]>({
        fetchFn: async () => {
            const response = await paymentService.getMyPaymentMethods({});
            return response.data ?? [];
        },
    });

    const {
        data: recentTickets,
        isLoading: isTicketsLoading,
        loadFetchFn: loadTickets,
    } = useFetch<ITicket[]>({
        fetchFn: async () => {
            const response = await ticketService.getMyTickets({
                page: 1,
                limit: 6,
            });
            return response.data?.items ?? [];
        },
    });

    useEffect(() => {
        loadFetchFn();
        loadTickets();
    }, []);

    const methods = paymentMethods ?? [];
    const tickets = recentTickets ?? [];

    const balanceValue = useMemo(() => {
        if (tickets.length === 0) return formatVnd(0);
        const total = tickets.reduce((sum, item) => sum + (item.price || 0), 0);
        return formatVnd(total);
    }, [tickets]);

    const openAdd = () => router.push("/payment/add");
    const openBank = (method: IPaymentMethod) =>
        router.push({
            pathname: "/payment/bank",
            params: { id: method._id },
        });
    const openTicket = (ticket: ITicket) =>
        router.push({
            pathname: "/profile/my-tickets/[id]",
            params: { id: ticket._id },
        });

    return (
        <View className="flex-1 bg-[#F3F2F7]">
            <View className="border-b border-black/5 bg-[#F3F2F7] px-5 pb-3 pt-3">
                <Text className="text-center text-lg font-bold text-text-primary">
                    {t("payment.title")}
                </Text>
            </View>

            {isLoading ? (
                <View className="mt-16 items-center">
                    <ActivityIndicator color="#6B4EFF" />
                </View>
            ) : (
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-10"
                >
                    <WalletCardStack
                        methods={methods}
                        balanceValue={balanceValue}
                        onAdd={openAdd}
                        onCardPress={openBank}
                    />

                    <PaymentQuickActions onAdd={openAdd} />

                    {isTicketsLoading && tickets.length === 0 ? (
                        <View className="mt-10 items-center">
                            <ActivityIndicator color="#6B4EFF" />
                        </View>
                    ) : (
                        <ExpenseSection
                            tickets={tickets}
                            onViewAll={() =>
                                router.push("/profile/my-tickets")
                            }
                            onItemPress={openTicket}
                        />
                    )}
                </ScrollView>
            )}
        </View>
    );
}
