import { Button } from "@/components/Button";
import { ROUTES } from "@/constants/routes";
import { router } from "expo-router";
import { Bell, Settings } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PaymentScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="flex-1 bg-background"
            style={{ paddingTop: insets.top }}
        >
            <View className="flex-row items-center justify-end gap-3 px-5 pt-2">
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
                    onPress={() => router.push(ROUTES.pages.paymentAdd)}
                >
                    Thiết lập ngay
                </Button>
            </View>
        </View>
    );
}
