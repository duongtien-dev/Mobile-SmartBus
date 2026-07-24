import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View, type ViewProps } from "react-native";

type PageHeaderVariant = "default" | "immersive";

type PageHeaderProps = ViewProps & {
    title?: string;
    isIconBack?: boolean;
    variant?: PageHeaderVariant;
    subtitle?: string;
};

export function PageHeader({
    title,
    subtitle,
    isIconBack = false,
    variant = "default",
    className,
    style,
    children,
    ...props
}: PageHeaderProps) {
    const isImmersive = variant === "immersive";

    return (
        <View
            className={cn(
                "relative w-full px-5",
                isImmersive
                    ? "bg-app-shell py-3"
                    : "border-b border-border bg-card py-3 shadow-sm",
                className,
            )}
            style={[{ minHeight: isImmersive ? undefined : 56 }, style]}
            {...props}
        >
            {title && !isImmersive ? (
                <View
                    className="absolute inset-x-5 inset-y-0 items-center justify-center"
                    style={{ pointerEvents: "none" }}
                >
                    <Text
                        className="px-12 text-center text-lg font-bold text-text-primary"
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                </View>
            ) : null}

            <View className="z-10 min-h-10 flex-1 flex-row items-center justify-between">
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

                {isImmersive && title ? (
                    <View className="flex-1 gap-0.5 px-2">
                        <Text className="text-xl font-bold text-text-primary">
                            {title}
                        </Text>
                        {subtitle ? (
                            <Text className="text-sm text-text-muted">
                                {subtitle}
                            </Text>
                        ) : null}
                    </View>
                ) : null}

                {children}
            </View>
        </View>
    );
}
