import { useTranslation } from "@/i18n";
import { router, type Href } from "expo-router";
import { Bus, ChevronRight } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useActiveShiftBanner } from "./hooks/useActiveShiftBanner";

export function ShiftActionBanner() {
    const { t } = useTranslation();
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
                        {t("staff.banner.activeTitle")}
                    </Text>
                    <Text className="mt-0.5 text-xs text-white/80">
                        {t("staff.banner.scannedTickets", { n: scanTotal })}
                        {activeShift?.routeCode
                            ? ` · ${activeShift.routeCode}`
                            : ""}
                        {" · "}
                        {t("staff.banner.tapContinue")}
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
                    {t("staff.banner.startTitle")}
                </Text>
                <Text className="mt-0.5 text-xs text-white/90">
                    {primaryRoute
                        ? t("staff.banner.startWithRoute", {
                              code: primaryRoute.code,
                          })
                        : t("staff.banner.startGeneric")}
                </Text>
            </View>
            <ChevronRight color="#ffffff" size={18} />
        </Pressable>
    );
}
