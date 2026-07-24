import { StaffHeader } from "@/components/StaffHeader";
import { router, type Href } from "expo-router";
import { Bell, LogOut, UserRound } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type DashboardHeaderProps = {
    displayName: string;
    onLogout: () => void;
};

export function DashboardHeader({
    displayName,
    onLogout,
}: DashboardHeaderProps) {
    return (
        <StaffHeader>
            <View className="flex-row items-center justify-between gap-3">
                <View className="min-w-0 flex-1 flex-row items-center gap-3">
                    <View className="h-11 w-11 items-center justify-center rounded-full bg-white/20">
                        <UserRound color="#ffffff" size={22} />
                    </View>
                    <View className="min-w-0 flex-1">
                        <Text className="text-sm text-white/85">Xin chào,</Text>
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
                        accessibilityLabel="Thông báo"
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
                        accessibilityLabel="Đăng xuất"
                        className="h-10 w-10 items-center justify-center active:opacity-80"
                        onPress={onLogout}
                        hitSlop={6}
                    >
                        <LogOut color="#ffffff" size={22} />
                    </Pressable>
                </View>
            </View>
        </StaffHeader>
    );
}
