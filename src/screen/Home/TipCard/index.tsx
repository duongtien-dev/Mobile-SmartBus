import type { HomeTip } from "@/constants/homeSections";
import { useTranslation } from "@/i18n";
import { Text, View } from "react-native";

type TipCardProps = {
    tip: HomeTip;
};

export function TipCard({ tip }: TipCardProps) {
    const { t } = useTranslation();
    const Icon = tip.icon;
    const iconColor = tip.colorClass === "bg-highlight" ? "#005f8b" : "#ffffff";

    return (
        <View className="w-[170px] rounded-2xl bg-card p-4">
            <View
                className={`h-11 w-11 items-center justify-center rounded-2xl ${tip.colorClass}`}
            >
                <Icon color={iconColor} size={22} />
            </View>
            <Text className="mt-3.5 text-[15px] font-bold text-text-primary">
                {t(tip.titleKey)}
            </Text>
            <Text className="mt-1.5 text-xs leading-5 text-text-muted">
                {t(tip.descriptionKey)}
            </Text>
        </View>
    );
}
