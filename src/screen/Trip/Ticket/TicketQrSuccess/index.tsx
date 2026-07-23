import { PageHeader } from "@/components/PageHeader";
import useTripBookingStore from "@/store/tripBooking.store";
import { getTicketDisplayCode } from "@/utils/createTicketPayload";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function TicketQrSuccessScreen() {
    const ticket = useTripBookingStore((state) => state.lastPurchasedTicket);
    const resetBooking = useTripBookingStore((state) => state.resetBooking);
    const displayCode = ticket ? getTicketDisplayCode(ticket) : "—";

    useEffect(() => {
        // Dọn form booking sau khi đã vào màn QR (không đụng lastPurchasedTicket)
        resetBooking();
    }, [resetBooking]);

    if (!ticket) {
        return (
            <View className="flex-1 bg-white">
                <PageHeader title="Mã QR vé" isIconBack={true} />
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="text-center text-sm text-text-muted">
                        Không có thông tin vé. Vui lòng mua vé lại.
                    </Text>
                    <Pressable
                        className="mt-6 rounded-xl bg-primary px-6 py-3 active:opacity-80"
                        onPress={() => router.replace("/" as never)}
                    >
                        <Text className="font-semibold text-white">Về trang chủ</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <PageHeader title="Mã QR vé" isIconBack={true} />

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
                            <Text className="text-sm text-text-muted">Không có mã QR</Text>
                        </View>
                    )}
                </View>

                <Text className="mt-6 text-center text-base font-semibold text-primary">
                    Mã vé: {displayCode}
                </Text>
                <Text className="mt-2 text-center text-sm text-text-muted">
                    Quét mã khi lên xe
                </Text>

                <Pressable
                    className="mt-10 rounded-xl bg-primary px-6 py-3 active:opacity-80"
                    onPress={() => router.replace("/profile/my-tickets" as never)}
                >
                    <Text className="font-semibold text-white">Xem vé của tôi</Text>
                </Pressable>
            </View>
        </View>
    );
}
