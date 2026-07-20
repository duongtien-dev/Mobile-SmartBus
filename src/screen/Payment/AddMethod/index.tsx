import { PageHeader } from "@/components/PageHeader";
import { PAYMENT_METHODS } from "@/constants/payment";
import { PaymentOptionItem } from "@/screen/Payment/PaymentOptionItem";
import { router, type Href } from "expo-router";
import { ScrollView, View } from "react-native";

export default function AddPaymentMethodScreen() {
    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Thêm phương thức thanh toán" />

            <ScrollView
                className="mt-2 flex-1"
                showsVerticalScrollIndicator={false}
            >
                {PAYMENT_METHODS.map((method, index) => (
                    <PaymentOptionItem
                        key={method.id}
                        method={method}
                        index={index}
                        onPress={() => router.push("/payment/visa" as Href)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
