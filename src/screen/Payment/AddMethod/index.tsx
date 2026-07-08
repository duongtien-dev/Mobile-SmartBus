import { router } from "expo-router";
import { ArrowLeft, Bell, Settings } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PAYMENT_METHODS } from "@/constants/payment";
import { PaymentMethodRow } from "@/screen/Payment/PaymentMethodRow";

export default function AddPaymentMethodScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="flex-1 bg-background"
            style={{ paddingTop: insets.top }}
        >
            <View className="flex-row items-center justify-between px-4 pt-2">
                <Pressable
                    accessibilityRole="button"
                    className="h-10 w-10 items-center justify-center active:opacity-80"
                    onPress={() => router.back()}
                >
                    <ArrowLeft color="#005f8b" size={24} />
                </Pressable>

                <View className="flex-row items-center gap-3">
                    <Pressable
                        accessibilityRole="button"
                        className="h-9 w-9 items-center justify-center active:opacity-80"
                    >
                        <Bell color="#005f8b" size={24} />
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        className="h-9 w-9 items-center justify-center active:opacity-80"
                    >
                        <Settings color="#005f8b" size={24} />
                    </Pressable>
                </View>
            </View>

            <Text className="mt-4 px-5 text-center text-lg font-bold text-primary">
                Thêm phương thức thanh toán
            </Text>

            <ScrollView
                className="mt-6 flex-1"
                showsVerticalScrollIndicator={false}
            >
                {PAYMENT_METHODS.map((method, index) => (
                    <PaymentMethodRow
                        key={method.id}
                        method={method}
                        index={index}
                        onPress={() => {
                            // Hook up PaymentService later
                        }}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
