import { PageHeader } from "@/components/PageHeader";
import { FAQ_ITEMS } from "@/constants/faq";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { FAQItem } from "./FaqItem";

export default function HelpScreen() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Trợ giúp" isIconBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-10"
                showsVerticalScrollIndicator={false}
            >
                <View className="items-center px-6 pb-4 pt-2">
                    <Image
                        source={require("../../../assets/images/FAQ.png")}
                        className="h-48 w-full"
                        contentFit="contain"
                    />
                </View>

                <View className="overflow-hidden">
                    {FAQ_ITEMS.map((item, index) => (
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
            </ScrollView>
        </View>
    );
}
