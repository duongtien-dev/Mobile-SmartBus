import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { ArrowLeft, Globe, SettingsIcon } from "lucide-react-native";
import { Pressable, Text, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PageHeaderProps = ViewProps & {
    title?: string;
    isIconBack?: boolean;
    isIconRight?: boolean;
};

export function PageHeader({
    title,
    isIconBack = false,
    isIconRight = false,
    className,
    style,
    ...props
}: PageHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            className={cn("relative px-5", className)}
            style={[
                {
                    paddingTop: insets.top + 12,
                    paddingBottom: 12,
                    minHeight: insets.top + 12 + 48,
                },
                style,
            ]}
            {...props}
        >
            {/* Title always centered to full header width */}
            {title ? (
                <View
                    className="absolute inset-x-5 items-center justify-center"
                    style={{
                        top: insets.top + 12,
                        bottom: 12,
                        pointerEvents: "none",
                    }}
                >
                    <Text
                        className="px-12 text-center text-xl font-bold text-primary"
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                </View>
            ) : null}

            <View className="z-10 h-10 flex-row items-center justify-between">
                <View className="min-w-10 flex-row items-center justify-start">
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

                <View className="min-w-10 flex-row items-center justify-end gap-1">
                    {isIconRight ? (
                        <>
                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Ngôn ngữ"
                                className="h-9 w-9 items-center justify-center rounded-full active:opacity-80"
                            >
                                <Globe color="#00a2e8" size={22} />
                            </Pressable>
                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Cài đặt"
                                className="h-9 w-9 items-center justify-center rounded-full active:opacity-80"
                            >
                                <SettingsIcon color="#00a2e8" size={24} />
                            </Pressable>
                        </>
                    ) : null}
                </View>
            </View>
        </View>
    );
}
