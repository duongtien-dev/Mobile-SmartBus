import type { IPaymentMethod } from "@/models/paymentMethod";
import { FormFooter } from "@/screen/Trip/Ticket/shared/FormFooter";
import { PageHeader } from "@/components/PageHeader";
import { paymentService } from "@/services/PaymentService";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { Image } from "expo-image";
import { cn } from "@/lib/utils";

const PROVIDER_LABELS: Record<IPaymentMethod["provider"], string> = {
    momo: "MoMo",
    zalopay: "ZaloPay",
    shopeepay: "ShopeePay",
    visa: "Thẻ quốc tế",
    napas: "Ngân hàng nội địa",
};

function getPaymentLabel(method: IPaymentMethod) {
    const base = PROVIDER_LABELS[method.provider] ?? method.provider;

    if (method.cardNumber) {
        return `${base} •••• ${method.cardNumber.slice(-4)}`;
    }

    if (method.accountNumber) {
        return `${base} •••• ${method.accountNumber.slice(-4)}`;
    }

    if (method.phoneNumber) {
        return `${base} - ${method.phoneNumber}`;
    }

    return base;
}

export default function TicketPaymentScreen() {
    const params = useLocalSearchParams<{
        ticketLabel?: string;
        price?: string;
    }>();

    const ticketLabel = params.ticketLabel ?? "Vé";
    const priceNumber = Number(params.price ?? 0);

    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
    const [selectedMethodId, setSelectedMethodId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchPaymentMethods = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await paymentService.getMyPaymentMethods({});
            setPaymentMethods(response.data ?? []);
        } catch {
            setPaymentMethods([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchPaymentMethods();
        }, [fetchPaymentMethods]),
    );

    const hasPaymentMethods = paymentMethods.length > 0;

    const handlePay = () => {
        if (!selectedMethodId) {
            Toast.show({
                type: "error",
                text1: "Vui lòng chọn phương thức thanh toán",
            });
            return;
        }

        // UI demo only: thanh toán thật sẽ tích hợp sau.
        Toast.show({
            type: "success",
            text1: "Thanh toán (demo)",
            text2: `${ticketLabel} • ${priceNumber.toLocaleString("vi-VN")} đồng`,
        });
    };

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Chọn phương thức thanh toán" isIconBack={true} />

            {isLoading ? (
                <View className="mt-10 items-center">
                    <ActivityIndicator color="#005f8b" />
                </View>
            ) : hasPaymentMethods ? (
                <>
                    <ScrollView
                        className="mt-4 flex-1"
                        showsVerticalScrollIndicator={false}
                        contentContainerClassName="pb-10"
                    >
                        {paymentMethods.map((method, index) => {
                            const isAlt = index % 2 === 0;
                            const isSelected = selectedMethodId === method._id;

                            return (
                                <Pressable
                                    key={method._id}
                                    accessibilityRole="button"
                                    onPress={() => setSelectedMethodId(method._id)}
                                    className={`flex-row items-center gap-4 px-5 py-4 active:opacity-80 ${
                                        isAlt ? "bg-surface" : "bg-background"
                                    }`}
                                >
                                    <View
                                        className={cn(
                                            "h-11 w-11 items-center justify-center rounded-full bg-surface-elevated",
                                        )}
                                    >
                                        <Image
                                            source={require("../../../../../assets/images/bank.png")}
                                            className="h-6 w-6"
                                        />
                                    </View>

                                    <View className="flex-1">
                                        <Text className="text-base font-medium text-text-primary">
                                            {getPaymentLabel(method)}
                                        </Text>
                                    </View>

                                    <View
                                        className={cn(
                                            "h-5 w-5 items-center justify-center rounded-full border-2",
                                            isSelected
                                                ? "border-primary bg-primary"
                                                : "border-border bg-background",
                                        )}
                                    >
                                        {isSelected ? (
                                            <Text className="text-[10px] font-bold text-on-primary">
                                                ✓
                                            </Text>
                                        ) : null}
                                    </View>
                                </Pressable>
                            );
                        })}
                    </ScrollView>

                    <FormFooter
                        price={priceNumber}
                        buttonLabel="Thanh toán"
                        disabled={!selectedMethodId}
                        onPress={handlePay}
                    />
                </>
            ) : (
                <>
                    <View className="mt-4 flex-1 items-center bg-surface px-6 py-8">
                        <Text className="text-center text-base font-bold text-primary">
                            Bạn chưa có phương thức thanh toán!
                        </Text>
                        <Text className="mt-2 text-center text-sm text-text-muted">
                            Hãy thêm phương thức thanh toán để tiếp tục.
                        </Text>
                    </View>

                    <View className="items-center px-8 py-10">
                        <Pressable
                            className="h-12 w-full items-center justify-center rounded-lg bg-primary active:opacity-90"
                            onPress={() => router.push("/payment/add")}
                        >
                            <Text className="text-base font-bold text-on-primary">
                                Thiết lập ngay
                            </Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    );
}

