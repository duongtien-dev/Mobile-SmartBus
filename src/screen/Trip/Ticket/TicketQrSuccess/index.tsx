import { PageHeader } from "@/components/PageHeader";
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
    const navigation = useNavigation();
    const ticket = useTripBookingStore((state) => state.lastPurchasedTicket);
    const resetBooking = useTripBookingStore((state) => state.resetBooking);
    const displayCode = ticket ? getTicketDisplayCode(ticket) : "—";

    useEffect(() => {
        resetBooking();
    }, [resetBooking]);

    // Header / Android back / iOS swipe → Home, không về form mua vé
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
                    title="Mã QR vé"
                    isIconBack
                    onBackPress={leaveSuccessToHome}
                />
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="text-center text-sm text-text-muted">
                        Không có thông tin vé. Vui lòng mua vé lại.
                    </Text>
                    <Pressable
                        className="mt-6 rounded-xl bg-primary px-6 py-3 active:opacity-80"
                        onPress={leaveSuccessToHome}
                    >
                        <Text className="font-semibold text-white">
                            Về trang chủ
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <PageHeader
                title="Mã QR vé"
                isIconBack
                onBackPress={leaveSuccessToHome}
            />

            <View className="flex-1 items-center justify-center px-8 pb-10">
                <Text className="text-center text-2xl font-bold text-primary">
                    Đưa mã này cho tài xế
                </Text>
                <Text className="mt-2 text-center text-sm text-text-muted">
                    Xin vui lòng chuẩn bị sẵn mã QR khi lên xe
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
                                Không có mã QR
                            </Text>
                        </View>
                    )}
                </View>

                <Text className="mt-6 text-center text-base font-semibold text-primary">
                    Mã vé: {displayCode}
                </Text>
                <Text className="mt-2 text-center text-sm text-text-muted">
                    Quét mã khi lên xe
                </Text>

                <View className="mt-10 w-full gap-3">
                    <Pressable
                        className="rounded-xl bg-primary px-6 py-3 active:opacity-80"
                        onPress={() =>
                            router.replace("/profile/my-tickets" as never)
                        }
                    >
                        <Text className="text-center font-semibold text-white">
                            Xem vé của tôi
                        </Text>
                    </Pressable>
                    <Pressable
                        className="rounded-xl border border-border bg-surface px-6 py-3 active:opacity-80"
                        onPress={leaveSuccessToHome}
                    >
                        <Text className="text-center font-semibold text-primary">
                            Về trang chủ
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
