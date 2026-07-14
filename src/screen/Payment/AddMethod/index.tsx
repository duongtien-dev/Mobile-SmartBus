import { PageHeader } from "@/components/PageHeader";
import { PAYMENT_METHODS } from "@/constants/payment";
import { PayMethodItem } from "@/screen/Payment/PayMethodItem";
import { router, type Href } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddPaymentMethodScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="flex-1 bg-background"
            style={{ paddingTop: insets.top }}
        >
            <PageHeader />

            <Text className="mt-4 px-5 text-center text-lg font-bold text-primary">
                Thêm phương thức thanh toán
            </Text>

            <ScrollView
                className="mt-6 flex-1"
                showsVerticalScrollIndicator={false}
            >
                {PAYMENT_METHODS.map((method, index) => (
                    <PayMethodItem
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
