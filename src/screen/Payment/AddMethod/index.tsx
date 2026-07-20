import { PageHeader } from "@/components/PageHeader";
import { PAYMENT_METHOD_OPTIONS } from "@/constants/payment";
import { PaymentOptionItem } from "@/screen/Payment/PaymentOptionItem";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

export default function AddPaymentMethodScreen() {
    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Thêm phương thức thanh toán" />

            <ScrollView
                className="mt-2 flex-1"
                showsVerticalScrollIndicator={false}
            >
                {PAYMENT_METHOD_OPTIONS.map((method, index) => (
                    <PaymentOptionItem
                        key={method.id}
                        method={method}
                        index={index}
                        onPress={() => router.push(method.route)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
