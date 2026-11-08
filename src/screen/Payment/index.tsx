import { useTranslation } from "@/i18n";
import type { IPaymentMethod } from "@/models/paymentMethod";
import type { ITicket } from "@/models/ticket";
import { ExpenseSection } from "@/screen/Payment/ExpenseSection";
import { PaymentQuickActions } from "@/screen/Payment/PaymentQuickActions";
import { WalletCardStack } from "@/screen/Payment/WalletCardStack";
import usePaymentOverview from "./usePaymentOverview";
import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";

export default function PaymentScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const { methods, tickets, isLoading, hasLoaded, methodsError, ticketsError, refresh } = usePaymentOverview();

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

            {isLoading && !hasLoaded ? (
                <View className="mt-16 items-center">
                    <ActivityIndicator color="#6B4EFF" />
                </View>
            ) : (
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-10"
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} tintColor="#6B4EFF" />}
                >
                    {methodsError || ticketsError ? (
                        <Pressable
                            accessibilityRole="button"
                            onPress={refresh}
                            disabled={isLoading}
                            className="mx-5 mt-3 rounded-xl bg-white p-4"
                        >
                            {methodsError ? <Text className="text-sm text-alert">{t("payment.methodsLoadError")}</Text> : null}
                            {ticketsError ? <Text className="text-sm text-alert">{t("payment.expensesLoadError")}</Text> : null}
                            <Text className="mt-2 text-sm font-bold text-primary">{t("payment.retry")}</Text>
                        </Pressable>
                    ) : null}
                    {!methodsError || methods.length > 0 ? <WalletCardStack
                        methods={methods}
                        onAdd={openAdd}
                        onCardPress={openBank}
                    /> : null}

                    <PaymentQuickActions onAdd={openAdd} />

                    {!ticketsError || tickets.length > 0 ? (
                        <ExpenseSection
                            tickets={tickets}
                            onViewAll={() =>
                                router.push("/profile/my-tickets")
                            }
                            onItemPress={openTicket}
                        />
                    ) : null}
                </ScrollView>
            )}
        </View>
    );
}
