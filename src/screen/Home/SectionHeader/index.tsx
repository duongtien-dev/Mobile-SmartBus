import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type SectionHeaderVariant = "hero" | "rail" | "story";

type Props = {
    title: string;
    /** Dòng phụ dưới title — kiểu Grab */
    subtitle?: string;
    actionLabel?: string;
    onActionPress?: () => void;
    /**
     * hero  — title lớn (tuyến nổi bật)
     * rail  — thanh accent trái (mẹo)
     * story — eyebrow nhỏ phía trên (tin tức / FAQ)
     */
    variant?: SectionHeaderVariant;
    className?: string;
};

export function SectionHeader({
    title,
    subtitle,
    actionLabel,
    onActionPress,
    variant = "hero",
    className,
}: Props) {
    const showAction = Boolean(actionLabel && onActionPress);

    return (
        <View
            className={cn(
                "mb-1 flex-row items-end justify-between gap-3",
                className,
            )}
        >
            <View className="min-w-0 flex-1 flex-row items-start gap-2.5">
                {variant === "rail" ? (
                    <View className="mt-1 h-8 w-1 rounded-full bg-accent" />
                ) : null}

                <View className="min-w-0 flex-1 gap-0.5">
                    {variant === "story" ? (
                        <Text className="text-[11px] font-semibold uppercase tracking-[1.2px] text-accent">
                            {subtitle || "Dành cho bạn"}
                        </Text>
                    ) : null}

                    <Text
                        className={cn(
                            "font-bold text-text-primary",
                            variant === "hero" && "text-[22px] leading-7",
                            variant === "rail" && "text-lg leading-6",
                            variant === "story" && "text-xl leading-7",
                        )}
                        numberOfLines={2}
                    >
                        {title}
                    </Text>

                    {variant === "hero" && subtitle ? (
                        <Text className="text-sm text-text-muted" numberOfLines={1}>
                            {subtitle}
                        </Text>
                    ) : null}

                    {variant === "rail" && subtitle ? (
                        <Text className="text-xs text-text-muted" numberOfLines={1}>
                            {subtitle}
                        </Text>
                    ) : null}
                </View>
            </View>

            {showAction ? (
                <Pressable
                    accessibilityRole="button"
                    className="mb-0.5 flex-row items-center gap-0.5 active:opacity-70"
                    onPress={onActionPress}
                    hitSlop={8}
                >
                    <Text className="text-sm font-semibold text-primary">
                        {actionLabel}
                    </Text>
                    <ChevronRight color="#005f8b" size={16} strokeWidth={2.4} />
                </Pressable>
            ) : null}
        </View>
    );
}
