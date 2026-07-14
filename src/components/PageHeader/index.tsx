import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { ArrowLeft, Bell, Settings } from "lucide-react-native";
import { Pressable, View, ViewProps } from "react-native";

interface Props extends ViewProps {
    showBack?: boolean;
};

export function PageHeader({ showBack = true,className, ...props }: Props) {
    return (
        <View
            className={cn("flex-row items-center justify-between px-4 pt-2", className)}
            {...props}
        >
            {showBack ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Quay lại"
                    className="h-10 w-10 items-center justify-center active:opacity-80"
                    onPress={() => router.back()}
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
                    onPress={() => router.push("/notifications")}
                >
                    <Bell color={"#005f8b"} size={22} />
                </Pressable>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Cài đặt"
                    className="h-9 w-9 items-center justify-center active:opacity-80"
                    onPress={() => router.push("/profile")}
                >
                    <Settings color={"#005f8b"} size={22} />
                </Pressable>
            </View>
        </View>
    );
}
