import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { FAQ_ITEMS } from "@/constants/faq";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { FAQItem } from "./FaqItem";

export default function HelpScreen() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title="Trợ giúp" isIconBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-4 px-5 pb-10 pt-4"
                showsVerticalScrollIndicator={false}
            >
                <Card className="items-center" padding="md">
                    <Image
                        source={require("../../../assets/images/FAQ.png")}
                        className="h-40 w-full"
                        contentFit="contain"
                    />
                </Card>

                <Card padding="none">
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
                </Card>
            </ScrollView>
        </View>
    );
}
