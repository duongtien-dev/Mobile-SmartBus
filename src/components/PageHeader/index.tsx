import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View, type ViewProps } from "react-native";

type PageHeaderProps = ViewProps & {
    title?: string;
    isIconBack?: boolean;
};

export function PageHeader({
    title,
    isIconBack = false,
    className,
    style,
    ...props
}: PageHeaderProps) {
    return (
        <View
            className={cn(
                "relative w-full border-b border-border bg-background px-5 py-3",
                className,
            )}
            style={[{ minHeight: 56 }, style]}
            {...props}
        >
            {title ? (
                <View
                    className="absolute inset-x-5 inset-y-0 items-center justify-center"
                    style={{ pointerEvents: "none" }}
                >
                    <Text
                        className="px-12 text-center text-xl font-bold text-primary"
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                </View>
            ) : null}

            <View className="z-10 h-10 flex-row items-center">
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
            </View>
        </View>
    );
}
