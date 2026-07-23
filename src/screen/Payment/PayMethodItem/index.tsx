import type { IPaymentMethod } from "@/models/paymentMethod";
import { cn } from "@/lib/utils";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { getPaymentSubtitle } from "@/utils/payment";

type PayMethodItemProps = {
    method: IPaymentMethod;
    index: number;
    onPress?: () => void;
};

export function PayMethodItem({
    method,
    index,
    onPress,
}: PayMethodItemProps) {
    const isAlt = index % 2 === 0;

    return (
        <Pressable
            accessibilityRole="button"
            className={`flex-row items-center gap-4 px-5 py-4 active:opacity-80 ${
                isAlt ? "bg-surface" : "bg-background"
            }`}
            onPress={onPress}
        >
            <View
                className={cn(
                    "h-11 w-11 items-center justify-center rounded-full",
                    isAlt ? "bg-surface-elevated" : "bg-surface",
                )}
            >
                <Image
                    source={require("../../../../assets/images/bank.png")}
                    className="h-6 w-6"
                />
            </View>
            <Text className="flex-1 text-base font-medium text-text-primary">
                {getPaymentSubtitle(method)}
            </Text>
        </Pressable>
    );
}
