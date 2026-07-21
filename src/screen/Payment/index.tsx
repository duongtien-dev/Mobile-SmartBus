import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import useFetch from "@/hooks/useFetch";
import type { IPaymentMethod } from "@/models/paymentMethod";
import { PayMethodItem } from "@/screen/Payment/PayMethodItem";
import { paymentService } from "@/services/PaymentService";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function PaymentScreen() {
    const router = useRouter();
    const { data: paymentMethods, isLoading, loadFetchFn } = useFetch<IPaymentMethod[]>({
        fetchFn: async () => {
        const response = await paymentService.getMyPaymentMethods({});
        return response.data ?? [];
    }});

    useEffect(() => {
        loadFetchFn();
    }, []);

    const hasPaymentMethods = paymentMethods && paymentMethods.length > 0;

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Thanh toán" isIconRight={false} />

            {isLoading ? (
                <View className="mt-10 items-center">
                    <ActivityIndicator color="#005f8b" />
                </View>
            ) : hasPaymentMethods ? (
                <ScrollView
                    className="mt-4 flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    {paymentMethods.map((method, index) => (
                        <PayMethodItem
                            key={method._id}
                            method={method}
                            index={index}
                            onPress={() =>
                                router.push({
                                    pathname: "/payment/bank",
                                    params: { id: method._id },
                                })
                            }
                        />
                    ))}
                </ScrollView>
            ) : (
                <View className="mt-4 items-center bg-surface px-4 py-4">
                    <Text className="text-center text-base font-bold text-primary">
                        Bạn chưa có phương thức thanh toán!
                    </Text>
                </View>
            )}

            <View className="items-center px-8 py-10">
                <Button
                    type="primary"
                    variant="bold"
                    className="min-w-[180px] rounded-lg px-8"
                    onPress={() => router.push("/payment/bank")}
                >
                    {hasPaymentMethods ? "Thêm phương thức" : "Thiết lập ngay"}
                </Button>
            </View>
        </View>
    );
}
