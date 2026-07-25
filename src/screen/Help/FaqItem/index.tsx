import type { FaqItem } from "@/constants/faq";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Props = {
    item: FaqItem;
    index: number;
    expanded: boolean;
    onToggle: () => void;
};

export function FAQItem({ item, index, expanded, onToggle }: Props) {
    const { t } = useTranslation();
    const isAlt = index % 2 === 1;

    return (
        <View className={isAlt ? "bg-surface" : "bg-background"}>
            <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                className="flex-row items-center gap-3 px-5 py-4 active:opacity-80"
                onPress={onToggle}
            >
                <Text className="flex-1 text-sm font-medium leading-5 text-text-primary">
                    {t(item.questionKey)}
                </Text>
                <ChevronDown
                    color="#00a2e8"
                    size={18}
                    strokeWidth={2.5}
                    style={{
                        transform: [{ rotate: expanded ? "180deg" : "0deg" }],
                    }}
                />
            </Pressable>

            {expanded ? (
                <View className={cn("border-t border-border/60 px-5 pb-4 pt-1")}>
                    <Text className="text-sm leading-6 text-text-secondary">
                        {t(item.answerKey)}
                    </Text>
                </View>
            ) : null}
        </View>
    );
}
