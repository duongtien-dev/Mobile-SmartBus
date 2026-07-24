import type { HomeTip } from "@/constants/homeSections";
import { Text, View } from "react-native";

type TipCardProps = {
    tip: HomeTip;
};

export function TipCard({ tip }: TipCardProps) {
    const Icon = tip.icon;
    const iconColor = tip.colorClass === "bg-highlight" ? "#005f8b" : "#ffffff";

    return (
        <View
            className="w-[220px] rounded-2xl bg-card p-4"
            style={{
                shadowColor: "#0f172a",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.06,
                shadowRadius: 10,
                elevation: 2,
            }}
        >
            <View
                className={`h-11 w-11 items-center justify-center rounded-2xl ${tip.colorClass}`}
            >
                <Icon color={iconColor} size={22} />
            </View>
            <Text className="mt-3.5 text-[15px] font-bold text-text-primary">
                {tip.title}
            </Text>
            <Text className="mt-1.5 text-xs leading-5 text-text-muted">
                {tip.description}
            </Text>
        </View>
    );
}
