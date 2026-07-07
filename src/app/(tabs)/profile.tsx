import { router } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { TAB_CONFIG } from "@/constants/tabs";
import useAuthStore from "@/store/auth.store";

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const { user, logout } = useAuthStore();
    const { icon: Icon, label, screenIconColor, screenIconBgClass } =
        TAB_CONFIG.profile;

    return (
        <View
            className="flex-1 bg-background px-6"
            style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom }}
        >
            <View className="items-center py-8">
                <View
                    className={`mb-4 h-20 w-20 items-center justify-center rounded-full ${screenIconBgClass}`}
                >
                    <Icon color={screenIconColor} size={36} />
                </View>
                <Text className="text-lg font-bold text-text-primary">
                    {user?.name ?? "Khách"}
                </Text>
                <Text className="mt-1 text-sm text-text-secondary">
                    {user?.email ?? "Chưa đăng nhập"}
                </Text>
                <Text className="mt-1 text-xs text-text-muted">{label}</Text>
            </View>

            <View className="gap-3">
                <Button
                    type="secondary"
                    variant="outline"
                    className="w-full"
                    onPress={() => router.push("/login")}
                >
                    Đăng nhập
                </Button>
                <Button
                    type="danger"
                    variant="outline"
                    className="w-full"
                    onPress={() => {
                        logout();
                        router.replace("/login");
                    }}
                >
                    Đăng xuất
                </Button>
            </View>
        </View>
    );
}
