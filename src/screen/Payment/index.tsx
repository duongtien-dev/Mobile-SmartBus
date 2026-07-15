import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function PaymentScreen() {

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Thanh toán" isIconRight={false} />

            <View className="mt-4 items-center bg-surface px-4 py-4">
                <Text className="text-center text-base font-bold text-primary">
                    Bạn chưa có phương thức thanh toán!
                </Text>
            </View>

            <View className="items-center px-8 pt-10">
                <Button
                    type="primary"
                    variant="bold"
                    className="min-w-[180px] rounded-lg px-8"
                    onPress={() => router.push("/payment/add")}
                >
                    Thiết lập ngay
                </Button>
            </View>
        </View>
    );
}
