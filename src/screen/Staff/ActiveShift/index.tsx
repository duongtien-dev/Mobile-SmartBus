import { StaffHeader } from "@/components/StaffHeader";
import { STAFF_ACTIVE_SHIFT_MOCK } from "@/constants/staff";
import { router, type Href } from "expo-router";
import {
    CheckCircle2,
    ScanLine,
    TriangleAlert,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { ActiveShiftMap } from "./ActiveShiftMap";

export default function StaffActiveShiftScreen() {
    const { nextStopName, eta, alightingCount } = STAFF_ACTIVE_SHIFT_MOCK;

    return (
        <View className="flex-1 bg-card">
            <StaffHeader
                title="Ca lái đang diễn ra"
                actions={[
                    {
                        key: "alert",
                        icon: TriangleAlert,
                        color: "#ffc20e",
                        accessibilityLabel: "Cảnh báo",
                        onPress: () => {},
                    },
                    {
                        key: "done",
                        icon: CheckCircle2,
                        color: "#ffffff",
                        accessibilityLabel: "Hoàn thành",
                        onPress: () => router.replace("/staff" as Href),
                    },
                ]}
            />

            <View className="relative h-[38%]">
                <ActiveShiftMap />

                <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-accent-light px-4 py-3.5">
                    <View className="flex-row items-start justify-between gap-3">
                        <View className="min-w-0 flex-1">
                            <Text className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                                Trạm tiếp theo
                            </Text>
                            <Text
                                className="mt-1 text-[15px] font-bold text-text-primary"
                                numberOfLines={2}
                            >
                                {nextStopName}
                            </Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                                Tới sau
                            </Text>
                            <Text className="mt-1 text-xl font-bold text-primary">
                                {eta}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className="flex-1 justify-between px-4 pb-6 pt-5">
                <View className="gap-5">
                    <Pressable
                        accessibilityRole="button"
                        className="flex-row items-center justify-center gap-2.5 rounded-2xl bg-primary px-4 py-4 shadow-sm active:opacity-90"
                        onPress={() => {
                            // API quét vé sẽ gắn sau
                        }}
                    >
                        <ScanLine color="#ffffff" size={22} />
                        <Text className="text-sm font-bold uppercase tracking-wide text-on-primary">
                            Quét vé khách lên
                        </Text>
                    </Pressable>

                    <View className="gap-3">
                        <Text className="text-sm font-bold uppercase tracking-wide text-primary">
                            Khách xuống tại trạm ({alightingCount})
                        </Text>
                        <Text className="py-6 text-center text-sm text-text-muted">
                            Không có khách xuống ở trạm này
                        </Text>
                    </View>
                </View>

                <Pressable
                    accessibilityRole="button"
                    className="items-center rounded-2xl bg-primary px-4 py-4 shadow-sm active:opacity-90"
                    onPress={() => {
                        // API xác nhận qua trạm sẽ gắn sau
                    }}
                >
                    <Text className="text-sm font-bold uppercase tracking-wide text-on-primary">
                        Xác nhận qua trạm
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
