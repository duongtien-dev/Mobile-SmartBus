import { router, type Href } from "expo-router";
import { Bus, ChevronRight } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useActiveShiftBanner } from "./hooks/useActiveShiftBanner";

export function ShiftActionBanner() {
    const {
        loading,
        hasActiveShift,
        activeShift,
        scanTotal,
        primaryRoute,
        isCheckingIn,
        handleCheckIn,
    } = useActiveShiftBanner();

    if (loading) {
        return (
            <View className="items-center rounded-2xl bg-card py-5 shadow-sm">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    if (hasActiveShift) {
        return (
            <Pressable
                accessibilityRole="button"
                onPress={() => router.push("/staff/shift" as Href)}
                className="flex-row items-center gap-3 rounded-2xl bg-primary px-4 py-3.5 active:opacity-90"
            >
                <View className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Bus color="#ffffff" size={20} />
                </View>
                <View className="min-w-0 flex-1">
                    <Text className="text-sm font-bold text-on-primary">
                        Ca đang chạy
                    </Text>
                    <Text className="mt-0.5 text-xs text-white/80">
                        Đã quét {scanTotal} vé
                        {activeShift?.routeCode
                            ? ` · ${activeShift.routeCode}`
                            : ""}
                        {" · Chạm để tiếp tục"}
                    </Text>
                </View>
                <ChevronRight color="#ffffff" size={18} />
            </Pressable>
        );
    }

    return (
        <Pressable
            accessibilityRole="button"
            onPress={handleCheckIn}
            disabled={isCheckingIn}
            className="flex-row items-center gap-3 rounded-2xl bg-[#22c55e] px-4 py-3.5 active:opacity-90"
        >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/25">
                {isCheckingIn ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Bus color="#ffffff" size={20} />
                )}
            </View>
            <View className="min-w-0 flex-1">
                <Text className="text-sm font-bold text-white">
                    Nhận ca hôm nay
                </Text>
                <Text className="mt-0.5 text-xs text-white/90">
                    {primaryRoute
                        ? `Tuyến ${primaryRoute.code} · Check-in để bắt đầu`
                        : "Check-in để quét vé và chạy ca"}
                </Text>
            </View>
            <ChevronRight color="#ffffff" size={18} />
        </Pressable>
    );
}
