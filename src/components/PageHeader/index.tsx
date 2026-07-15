import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PageHeaderProps = ViewProps & {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
    rightAction?: React.ReactNode;
};

export function PageHeader({
    title,
    showBack = true,
    onBack,
    rightAction,
    className,
    style,
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
            <View className="w-10 flex-row items-center justify-start">
                {showBack ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Quay lại"
                        className="h-10 w-10 items-center justify-center active:opacity-80"
                        onPress={onBack ?? (() => router.back())}
                        hitSlop={8}
                    >
                        <ArrowLeft color="#005f8b" size={24} />
                    </Pressable>
                ) : null}
            </View>

            <View className="flex-1 items-center justify-center px-2">
                <Text
                    className="text-xl font-bold text-primary"
                    numberOfLines={1}
                >
                    {title}
                </Text>
            </View>

            <View className="w-10 flex-row items-center justify-end">
                {rightAction}
            </View>
        </View>
    );
}
