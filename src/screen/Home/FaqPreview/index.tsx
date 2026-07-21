import { FAQ_ITEMS } from "@/constants/faq";
import { HOME_FAQ_PREVIEW_COUNT } from "@/constants/homeSections";
import { FAQItem } from "@/screen/Help/FaqItem";
import { useState } from "react";
import { View } from "react-native";

export function FaqPreview() {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const previewItems = FAQ_ITEMS.slice(0, HOME_FAQ_PREVIEW_COUNT);

    return (
        <View className="overflow-hidden rounded-xl border border-border">
            {previewItems.map((item, index) => (
                <FAQItem
                    key={item.id}
                    item={item}
                    index={index}
                    expanded={expandedId === item.id}
                    onToggle={() =>
                        setExpandedId((current) =>
                            current === item.id ? null : item.id,
                        )
                    }
                />
            ))}
        </View>
    );
}
