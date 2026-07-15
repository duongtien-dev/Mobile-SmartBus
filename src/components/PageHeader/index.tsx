import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { ArrowLeft, Globe, SettingsIcon } from "lucide-react-native";
import { Pressable, Text, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PageHeaderProps = ViewProps & {
    title?: string;
    isIconBack?: boolean;
    isIconRight?: boolean;
    onPressGlobal?: () => void;
    onPressSettings?: () => void;
};

export function PageHeader({
    title,
    isIconBack = false,
    className,
    style,
    isIconRight = false,
    onPressGlobal,
    onPressSettings,
    ...props
}: PageHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            className={cn("flex-row items-center px-5", className)}
            style={[
                {
                    paddingTop: insets.top + 12,
                    paddingBottom: 12,
                    height: insets.top + 12 + 48,
                },
                style,
            ]}
            {...props}
        >
            <View className={cn("flex-row items-center justify-start")}>
                {isIconBack ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Quay lại"
                        className="h-10 w-10 items-center justify-center active:opacity-80"
                        onPress={() => router.back()}
                        hitSlop={8}
                    >
                        <ArrowLeft color="#005f8b" size={24} />
                    </Pressable>
                ) : null}
            </View>

            <View className="flex-1 items-center justify-center px-2">
                <Text className="text-xl font-bold text-primary" numberOfLines={1}>
                    {title}
                </Text>
            </View>

            <View className={cn("flex-row items-center justify-end gap-1")}>
                {isIconRight ? (
                    <>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Ngôn ngữ"
                            className="h-9 w-9 items-center justify-center rounded-full active:opacity-80"
                            onPress={onPressGlobal}
                        >
                            <Globe color="#00a2e8" size={22} />
                        </Pressable>

                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Cài đặt"
                            className="h-9 w-9 items-center justify-center rounded-full active:opacity-80"
                            onPress={onPressSettings}
                        >
                            <SettingsIcon color="#00a2e8" size={24} />
                        </Pressable>
                    </>
                ) : null}
            </View>
        </View>
    );
}
