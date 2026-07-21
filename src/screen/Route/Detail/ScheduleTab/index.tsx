import type { IStop } from "@/models/stop";
import { collectScheduleTimes } from "@/screen/Route/Detail/utils";
import { Text, View } from "react-native";

type ScheduleTabProps = {
    stops: IStop[];
};

export function ScheduleTab({ stops }: ScheduleTabProps) {
    const times = collectScheduleTimes(stops.map((stop) => stop.times ?? []));

    if (!times.length) {
        return (
            <Text className="px-5 py-10 text-center text-sm text-text-muted">
                Chưa có biểu đồ giờ cho tuyến này
            </Text>
        );
    }

    return (
        <View className="px-5 py-4">
            <View className="flex-row flex-wrap gap-2">
                {times.map((time) => (
                    <View
                        key={time}
                        className="min-w-[18%] flex-1 items-center rounded-lg bg-accent px-2 py-3"
                    >
                        <Text className="text-sm font-semibold text-on-primary">
                            {time}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
