import { router } from "expo-router";
import { ArrowLeft, Bell, Settings } from "lucide-react-native";
import { Pressable, View } from "react-native";

const ICON_COLOR = "#005f8b";

type PageHeaderProps = {
    title?: string;
    showBack?: boolean;
    showBell?: boolean;
    showSettings?: boolean;
    onBack?: () => void;
    onBellPress?: () => void;
    onSettingsPress?: () => void;
    className?: string;
};

export function PageHeader({
    showBack = true,
    showBell = true,
    showSettings = true,
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
                    <ArrowLeft color={ICON_COLOR} size={24} />
                </Pressable>
            ) : (
                <View className="h-10 w-10" />
            )}

            <View className="flex-row items-center gap-2">
                {showBell ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Thông báo"
                        className="h-9 w-9 items-center justify-center active:opacity-80"
                        onPress={onBellPress}
                    >
                        <Bell color={ICON_COLOR} size={22} />
                    </Pressable>
                ) : null}
                {showSettings ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Cài đặt"
                        className="h-9 w-9 items-center justify-center active:opacity-80"
                        onPress={onSettingsPress}
                    >
                        <Settings color={ICON_COLOR} size={22} />
                    </Pressable>
                ) : null}
                {!showBell && !showSettings ? (
                    <View className="h-9 w-9" />
                ) : null}
            </View>
        </View>
    );
}
