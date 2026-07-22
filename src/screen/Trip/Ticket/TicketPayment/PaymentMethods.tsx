import { IPaymentMethod } from "@/models/paymentMethod";
import useTripBookingStore from "@/store/tripBooking.store";
import { cn } from "@/lib/utils";
import { Pressable, Text, View } from "react-native";
import { CreditCard } from "lucide-react-native";
import { getPaymentSubtitle, getPaymentTitle } from "@/utils/payment";
import { Image } from "expo-image";
import useFetch from "@/hooks/useFetch";
import { paymentService } from "@/services/PaymentService";
import { useEffect } from "react";

const PaymentMethods = () => {
    const selectedMethodId = useTripBookingStore((state) => state.selectedPaymentMethodId);
    const setSelectedMethodId = useTripBookingStore((state) => state.setSelectedPaymentMethodId);

    const { data: paymentMethods, loadFetchFn } = useFetch<IPaymentMethod[]>({
        fetchFn: async () => {
            const response = await paymentService.getMyPaymentMethods({});
            return response.data || [];
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, []);

    return (
        <View className="mb-4">
            <View className="mb-3 flex-row items-center gap-2">
                <CreditCard size={20} color="#005f8b" className="text-primary" />
                <Text className="text-lg font-bold text-primary">
                    Phương thức thanh toán
                </Text>
            </View>

            {paymentMethods && paymentMethods.length > 0 ? (
                <View className="gap-3 mt-2">
                    {paymentMethods.map((method) => {
                        const isSelected = selectedMethodId === method._id;
                        return (
                            <Pressable
                                key={method._id}
                                onPress={() => setSelectedMethodId(method._id)}
                                className={cn(
                                    "flex-row items-center gap-4 rounded-2xl border p-4 active:opacity-70",
                                    isSelected
                                        ? "border-primary bg-primary/5"
                                        : "border-border bg-surface"
                                )}
                            >
                                <View className="h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-border/50">
                                    <Image
                                        source={require("../../../../../assets/images/bank.png")}
                                        className="h-6 w-6"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-base font-semibold text-text-primary">
                                        {getPaymentTitle(method)}
                                    </Text>
                                    <Text className="text-xs text-text-muted mt-0.5">
                                        {getPaymentSubtitle(method)}
                                    </Text>
                                </View>

                                <View className={cn(
                                    "h-5 w-5 rounded-full border-2 items-center justify-center",
                                    isSelected ? "border-primary" : "border-border"
                                )}>
                                    {isSelected && <View className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            ) : (
                <View className="rounded-2xl border border-border bg-surface p-4 mt-2">
                    <Text className="text-sm text-text-muted text-center">Bạn chưa có phương thức thanh toán nào. Vui lòng thêm phương thức thanh toán để tiếp tục.</Text>
                </View>
            )}
        </View>
    );
};

export default PaymentMethods;
