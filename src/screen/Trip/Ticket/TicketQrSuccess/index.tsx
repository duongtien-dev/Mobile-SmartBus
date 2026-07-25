import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/i18n";
import useTripBookingStore from "@/store/tripBooking.store";
import { getTicketDisplayCode } from "@/utils/ticket";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { BackHandler, Pressable, Text, View } from "react-native";

function leaveSuccessToHome() {
    if (router.canDismiss()) {
        router.dismissAll();
    }
    setTimeout(() => {
        router.replace("/" as never);
    }, 0);
}

export default function TicketQrSuccessScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const ticket = useTripBookingStore((state) => state.lastPurchasedTicket);
    const resetBooking = useTripBookingStore((state) => state.resetBooking);
    const displayCode = ticket ? getTicketDisplayCode(ticket) : "—";

    useEffect(() => {
        resetBooking();
    }, [resetBooking]);

    useEffect(() => {
        navigation.setOptions?.({ gestureEnabled: false });

        const sub = BackHandler.addEventListener("hardwareBackPress", () => {
            leaveSuccessToHome();
            return true;
        });
        return () => sub.remove();
    }, [navigation]);

    if (!ticket) {
        return (
            <View className="flex-1 bg-white">
                <PageHeader
                    title={t("ticket.qr.title")}
                    isIconBack
                    onBackPress={leaveSuccessToHome}
                />
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="text-center text-sm text-text-muted">
                        {t("ticket.qr.noTicket")}
                    </Text>
                    <Pressable
                        className="mt-6 rounded-xl bg-primary px-6 py-3 active:opacity-80"
                        onPress={leaveSuccessToHome}
                    >
                        <Text className="font-semibold text-white">
                            {t("ticket.qr.goHome")}
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <PageHeader
                title={t("ticket.qr.title")}
                isIconBack
                onBackPress={leaveSuccessToHome}
            />

            <View className="flex-1 items-center justify-center px-8 pb-10">
                <Text className="text-center text-2xl font-bold text-primary">
                    {t("ticket.qr.showToDriver")}
                </Text>
                <Text className="mt-2 text-center text-sm text-text-muted">
                    {t("ticket.qr.prepare")}
                </Text>

                <View className="mt-10 items-center justify-center rounded-2xl bg-white p-4">
                    {ticket.qrCodeImage ? (
                        <Image
                            source={{ uri: ticket.qrCodeImage }}
                            style={{ width: 260, height: 260 }}
                            contentFit="contain"
                        />
                    ) : (
                        <View className="h-[260px] w-[260px] items-center justify-center rounded-xl bg-app-shell">
                            <Text className="text-sm text-text-muted">
                                {t("ticket.qr.empty")}
                            </Text>
                        </View>
                    )}
                </View>

                <Text className="mt-6 text-center text-base font-semibold text-primary">
                    {t("ticket.qr.codeLabel")} {displayCode}
                </Text>
                <Text className="mt-2 text-center text-sm text-text-muted">
                    {t("ticket.qr.scanHint")}
                </Text>

                <View className="mt-10 w-full gap-3">
                    <Pressable
                        className="rounded-xl bg-primary px-6 py-3 active:opacity-80"
                        onPress={() =>
                            router.replace("/profile/my-tickets" as never)
                        }
                    >
                        <Text className="text-center font-semibold text-white">
                            {t("ticket.qr.viewMyTickets")}
                        </Text>
                    </Pressable>
                    <Pressable
                        className="rounded-xl border border-border bg-surface px-6 py-3 active:opacity-80"
                        onPress={leaveSuccessToHome}
                    >
                        <Text className="text-center font-semibold text-primary">
                            {t("ticket.qr.goHome")}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
