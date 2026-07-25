import { useTranslation } from "@/i18n";
import { Text, View } from "react-native";
import type { MapPoint } from "./mapTypes";

type ActiveShiftMapProps = {
    mapCenter: MapPoint;
    nextStopCoordinate: MapPoint;
};

/** Web fallback — maps native-only */
export function ActiveShiftMap(_props: ActiveShiftMapProps) {
    const { t } = useTranslation();

    return (
        <View className="flex-1 items-center justify-center bg-surface">
            <Text className="text-sm text-text-muted">
                {t("staff.shift.mapWeb")}
            </Text>
        </View>
    );
}
