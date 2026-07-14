import { router } from "expo-router";
import { ArrowLeft, Bell, Settings } from "lucide-react-native";
import { Pressable, View } from "react-native";

type PageHeaderProps = {
    showBack?: boolean;
    onBack?: () => void;
    onBellPress?: () => void;
    onSettingsPress?: () => void;
    className?: string;
};

export function PageHeader({
    showBack = true,
    onBack,
    onBellPress,
    onSettingsPress,
    className = "",
}: PageHeaderProps) {
    return (
        <View
            className={`flex-row items-center justify-between px-4 pt-2 ${className}`}
        >
            {showBack ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Quay lại"
                    className="h-10 w-10 items-center justify-center active:opacity-80"
                    onPress={onBack ?? (() => router.back())}
                >
                    <ArrowLeft color={"#005f8b"} size={24} />
                </Pressable>
            ) : (
                <View className="h-10 w-10" />
            )}

            <View className="flex-row items-center gap-2">
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Thông báo"
                    className="h-9 w-9 items-center justify-center active:opacity-80"
                    onPress={onBellPress}
                >
                    <Bell color={"#005f8b"} size={22} />
                </Pressable>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Cài đặt"
                    className="h-9 w-9 items-center justify-center active:opacity-80"
                    onPress={onSettingsPress}
                >
                    <Settings color={"#005f8b"} size={22} />
                </Pressable>
            </View>
        </View>
    );
}
