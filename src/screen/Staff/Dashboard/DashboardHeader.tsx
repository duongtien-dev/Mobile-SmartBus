import { useTranslation } from "@/i18n";
import { StaffHeader } from "@/components/StaffHeader";
import { router, type Href } from "expo-router";
import { Bell, LogOut, UserRound } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useDashboardHeader } from "./hooks/useDashboardHeader";

export function DashboardHeader() {
    const { t } = useTranslation();
    const { displayName, handleLogout } = useDashboardHeader();

    return (
        <StaffHeader>
            <View className="flex-row items-center justify-between gap-3">
                <View className="min-w-0 flex-1 flex-row items-center gap-3">
                    <View className="h-11 w-11 items-center justify-center rounded-full bg-white/20">
                        <UserRound color="#ffffff" size={22} />
                    </View>
                    <View className="min-w-0 flex-1">
                        <Text className="text-sm text-white/85">
                            {t("staff.hello")}
                        </Text>
                        <Text
                            className="text-base font-bold text-on-primary"
                            numberOfLines={1}
                        >
                            {displayName}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={t("a11y.notifications")}
                        className="relative h-10 w-10 items-center justify-center active:opacity-80"
                        onPress={() =>
                            router.push("/staff/notifications" as Href)
                        }
                        hitSlop={6}
                    >
                        <Bell color="#ffc20e" size={22} />
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={t("a11y.logout")}
                        className="h-10 w-10 items-center justify-center active:opacity-80"
                        onPress={handleLogout}
                        hitSlop={6}
                    >
                        <LogOut color="#ffffff" size={22} />
                    </Pressable>
                </View>
            </View>
        </StaffHeader>
    );
}
