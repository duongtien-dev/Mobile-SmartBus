import type { HomeTip } from "@/constants/homeSections";
import { Text, View } from "react-native";

type TipCardProps = {
    tip: HomeTip;
};

export function TipCard({ tip }: TipCardProps) {
    const Icon = tip.icon;
    const iconColor = tip.colorClass === "bg-highlight" ? "#005f8b" : "#ffffff";

    return (
        <View className="mr-3 w-56 rounded-xl border border-border bg-surface-elevated p-4">
            <View
                className={`h-10 w-10 items-center justify-center rounded-full ${tip.colorClass}`}
            >
                <Icon color={iconColor} size={20} />
            </View>
            <Text className="mt-3 text-sm font-semibold text-text-primary">
                {tip.title}
            </Text>
            <Text className="mt-1 text-xs leading-5 text-text-muted">
                {tip.description}
            </Text>
        </View>
    );
}
