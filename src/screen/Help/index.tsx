import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { FAQ_ITEMS } from "@/constants/faq";
import { useTranslation } from "@/i18n";
import useChatStore from "@/store/chat.store";
import { Image } from "expo-image";
import { MessageCircle } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { FAQItem } from "./FaqItem";

export default function HelpScreen() {
    const { t } = useTranslation();
    const openChat = useChatStore((state) => state.open);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={t("help.title")} isIconBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-4 px-5 pb-10 pt-4"
                showsVerticalScrollIndicator={false}
            >
                <Card className="items-center" padding="md">
                    <Image
                        source={require("../../../assets/images/FAQ.png")}
                        style={{ width: "100%", height: 160 }}
                        contentFit="contain"
                    />
                </Card>

                <Pressable
                    accessibilityRole="button"
                    className="flex-row items-center gap-3 rounded-2xl bg-primary px-4 py-4 active:bg-primary-dark"
                    onPress={openChat}
                >
                    <View className="h-10 w-10 items-center justify-center rounded-xl bg-accent">
                        <MessageCircle color="#ffffff" size={20} />
                    </View>
                    <View className="min-w-0 flex-1">
                        <Text className="text-base font-bold text-on-primary">
                            {t("chat.askCta")}
                        </Text>
                        <Text className="text-sm text-on-primary/80">
                            {t("chat.widget.subtitle")}
                        </Text>
                    </View>
                </Pressable>

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
