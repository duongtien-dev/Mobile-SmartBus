import { cn } from "@/lib/utils";
import { Pressable, Text, View } from "react-native";

export type TabItem = {
    key: string;
    label: string;
};

type TabVariant = "default" | "underline";

type TabContainerProps = {
    tabs?: TabItem[];
    value?: string;
    onChange?: (value: string) => void;
    variant?: TabVariant;
    className?: string;
    tabListClassName?: string;
    triggerClassName?: string;
};

const variantStyles = {
    default: {
        list: "gap-1 rounded-lg bg-muted p-1",
        trigger: "min-h-9 rounded-md px-10",
        triggerActive: "bg-background shadow-sm",
        triggerInactive: "bg-transparent",
    },
    underline: {
        list: "gap-1 bg-transparent p-0",
        trigger: "rounded-none border-b-2 bg-transparent px-0",
        triggerActive: "border-primary",
        triggerInactive: "border-transparent",
    },
} as const;

export default function TabContainer({
    tabs = [],
    value,
    onChange,
    variant = "default",
    className,
    tabListClassName,
    triggerClassName,
}: TabContainerProps) {
    if (!tabs.length) return null;

    const styles = variantStyles[variant];

    return (
        <View className={cn("w-full", className)}>
            <View
                className={cn(
                    "flex-row items-center",
                    styles.list,
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
                                styles.trigger,
                                isActive
                                    ? styles.triggerActive
                                    : styles.triggerInactive,
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
