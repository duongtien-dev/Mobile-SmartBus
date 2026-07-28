import { useTranslation } from "@/i18n";
import { useRouter } from "expo-router";
import {
    ArrowDownLeft,
    ArrowUpRight,
    CreditCard,
    LayoutGrid,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type PaymentQuickActionsProps = {
    onAdd: () => void;
};

export function PaymentQuickActions({ onAdd }: PaymentQuickActionsProps) {
    const { t } = useTranslation();
    const router = useRouter();

    const actions = [
        {
            key: "tickets",
            label: t("payment.actionTickets"),
            icon: ArrowUpRight,
            onPress: () => router.push("/profile/my-tickets"),
        },
        {
            key: "history",
            label: t("payment.actionHistory"),
            icon: ArrowDownLeft,
            onPress: () => router.push("/profile/trip-history"),
        },
        {
            key: "topup",
            label: t("payment.actionTopUp"),
            icon: CreditCard,
            onPress: () => router.push("/trips/tickets" as never),
        },
        {
            key: "more",
            label: t("payment.actionMore"),
            icon: LayoutGrid,
            onPress: onAdd,
        },
    ] as const;

    return (
        <View className="mx-5 mt-5 flex-row items-center justify-between rounded-[28px] bg-white px-3 py-4">
            {actions.map((action) => {
                const Icon = action.icon;
                return (
                    <Pressable
                        key={action.key}
                        accessibilityRole="button"
                        accessibilityLabel={action.label}
                        onPress={action.onPress}
                        className="flex-1 items-center gap-2 active:opacity-70"
                    >
                        <View className="h-14 w-14 items-center justify-center rounded-full bg-[#F0EFF4]">
                            <Icon color="#1A1A1A" size={22} strokeWidth={2} />
                        </View>
                        <Text className="text-xs font-medium text-text-primary">
                            {action.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
