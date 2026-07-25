import { useTranslation } from "@/i18n";
import type { IStop } from "@/models/stop";
import { MapPin } from "lucide-react-native";
import { Text, View } from "react-native";

type StopsTabProps = {
    stops: IStop[];
};

export function StopsTab({ stops }: StopsTabProps) {
    const { t } = useTranslation();

    if (!stops.length) {
        return (
            <Text className="px-5 py-10 text-center text-sm text-text-muted">
                {t("route.stops.emptyDetail")}
            </Text>
        );
    }

    return (
        <View className="px-5 py-4">
            {stops.map((stop, index) => (
                <View key={stop._id} className="flex-row gap-3">
                    <View className="items-center">
                        <View className="h-3 w-3 rounded-full bg-accent" />
                        {index < stops.length - 1 ? (
                            <View className="my-1 w-0.5 flex-1 bg-accent/30" />
                        ) : null}
                    </View>

                    <View className="mb-5 min-w-0 flex-1 flex-row items-start justify-between gap-3">
                        <View className="min-w-0 flex-1">
                            <Text className="text-base font-semibold text-text-primary">
                                {stop.name}
                            </Text>
                            <Text className="mt-0.5 text-sm text-text-muted">
                                {t("route.stops.code", { code: stop.stopCode })}
                            </Text>
                        </View>
                        <MapPin color="#00a2e8" size={20} />
                    </View>
                </View>
            ))}
        </View>
    );
}
