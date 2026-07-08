import { Pressable, Text, View } from "react-native";

import type { PaymentMethod } from "@/constants/payment";

type PaymentMethodRowProps = {
    method: PaymentMethod;
    index: number;
    onPress?: () => void;
};

export function PaymentMethodRow({
    method,
    index,
    onPress,
}: PaymentMethodRowProps) {
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
                className="h-11 w-11 items-center justify-center rounded-full"
                style={{ backgroundColor: method.badgeBg }}
            >
                <Text
                    className="text-xs font-bold"
                    style={{ color: method.badgeText }}
                >
                    {method.badgeLabel}
                </Text>
            </View>
            <Text className="flex-1 text-base font-medium text-text-primary">
                {method.label}
            </Text>
        </Pressable>
    );
}
