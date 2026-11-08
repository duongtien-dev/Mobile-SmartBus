import useFetch from "@/hooks/useFetch";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import type { IPaymentMethod } from "@/models/paymentMethod";
import { paymentService } from "@/services/PaymentService";
import useTripBookingStore from "@/store/tripBooking.store";
import { getPaymentSubtitle, getPaymentTitle } from "@/utils/payment";
import { Image } from "expo-image";
import { CreditCard } from "lucide-react-native";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { formatVnd } from "@/constants/ticket";
import { Pressable, Text, View } from "react-native";

interface ItemProps {
    method: IPaymentMethod;
    isSelected: boolean;
    onSelect: () => void;
}

const PaymentMethodItem = ({ method, isSelected, onSelect }: ItemProps) => (
    <Pressable
        onPress={onSelect}
        className={cn(
            "flex-row items-center gap-4 rounded-2xl border p-4 active:opacity-70",
            isSelected
                ? "border-primary bg-primary/5"
                : "border-border bg-surface",
        )}
    >
        <View className="h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-white shadow-sm">
            <Image
                source={require("../../../../../assets/images/bank.png")}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
            />
        </View>

        <View className="flex-1">
            <Text className="text-base font-semibold text-text-primary">
                {getPaymentTitle(method)}
            </Text>
            <Text className="mt-0.5 text-xs text-text-muted">
                {getPaymentSubtitle(method)}
            </Text>
            <Text className="mt-0.5 text-xs text-text-muted">
                {formatVnd(method.balance ?? 0)}
            </Text>
        </View>

        <View
            className={cn(
                "h-5 w-5 items-center justify-center rounded-full border-2",
                isSelected ? "border-primary" : "border-border",
            )}
        >
            {isSelected ? (
                <View className="h-2.5 w-2.5 rounded-full bg-primary" />
            ) : null}
        </View>
    </Pressable>
);

const PaymentMethods = () => {
    const { t } = useTranslation();
    const selectedMethodId = useTripBookingStore(
        (state) => state.selectedPaymentMethodId,
    );
    const setSelectedMethodId = useTripBookingStore(
        (state) => state.setSelectedPaymentMethodId,
    );

    const { data: paymentMethods, loadFetchFn } = useFetch<IPaymentMethod[]>({
        fetchFn: async () => {
            const response = await paymentService.getMyPaymentMethods({});
            return response.data || [];
        },
    });

    useFocusEffect(useCallback(() => {
        void loadFetchFn();
    }, [loadFetchFn]));

    const hasMethods = paymentMethods && paymentMethods.length > 0;

    return (
        <View className="mb-4">
            <View className="mb-3 flex-row items-center gap-2">
                <CreditCard size={20} color="#005f8b" />
                <Text className="text-lg font-bold text-primary">
                    {t("ticket.payment.methodTitle")}
                </Text>
            </View>

            {!hasMethods ? (
                <View className="mt-2 rounded-2xl border border-border bg-surface p-4">
                    <Text className="text-center text-sm text-text-muted">
                        {t("ticket.payment.methodEmptyLong")}
                    </Text>
                </View>
            ) : (
                <View className="mt-2 gap-3">
                    {paymentMethods.map((method) => (
                        <PaymentMethodItem
                            key={method._id}
                            method={method}
                            isSelected={selectedMethodId === method._id}
                            onSelect={() => setSelectedMethodId(method._id)}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

export default PaymentMethods;
