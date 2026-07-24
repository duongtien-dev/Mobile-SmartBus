import { cn } from "@/lib/utils";
import { Pressable, Text, View } from "react-native";

export type TabItem = {
    key: string;
    label: string;
};

type TabContainerProps = {
    tabs?: TabItem[];
    value?: string;
    onChange?: (value: string) => void;
    variant?: "default" | "underline";
    className?: string;
    tabListClassName?: string;
    triggerClassName?: string;
};

export default function TabContainer({
    tabs = [],
    value,
    onChange,
    variant = "default",
    className,
    tabListClassName,
    triggerClassName,
}: TabContainerProps) {
    const isUnderline = variant === "underline";

    if (!tabs.length) return null;

    return (
        <View className={cn("w-full", className)}>
            <View
                className={cn(
                    "flex-row items-center",
                    isUnderline
                        ? "gap-1 bg-transparent p-0"
                        : "gap-1 rounded-lg bg-muted p-1",
                    tabListClassName,
                )}
            >
                {tabs.map((tab) => {
                    const isActive = value === tab.key;

                    return (
                        <Pressable
                            key={tab.key}
                            accessibilityRole="tab"
                            accessibilityState={{ selected: isActive }}
                            className={cn(
                                "items-center justify-center px-6 py-2 active:opacity-80",
                                isUnderline
                                    ? cn("rounded-none border-b-2 bg-transparent px-0",
                                        isActive
                                            ? "border-primary"
                                            : "border-transparent",
                                    )
                                    : cn("min-h-9 rounded-md px-10",
                                        isActive
                                            ? "bg-background shadow-sm"
                                            : "bg-transparent",
                                    ),
                                triggerClassName,
                            )}
                            onPress={() => onChange?.(tab.key)}
                        >
                            <Text
                                className={cn(
                                    "text-sm font-medium",
                                    isActive
                                        ? "text-primary"
                                        : "text-text-muted",
                                )}
                            >
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
