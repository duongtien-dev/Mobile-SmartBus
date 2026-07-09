import TabContainer from "@/components/TabContainer";
import {
    NEWS_ITEMS,
    NOTIFICATION_ITEMS,
} from "@/constants/notices";
import { Image } from "expo-image";
import { Settings } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NoticeCard } from "./NoticeCard";

const listTabs = [
    {
        label: "Thông báo",
        key: "notifications",
    },
    {
        label: "Tin tức",
        key: "news",
    },
];

export default function NotificationsScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<string>("notifications");

    const items = useMemo(
        () => (activeTab === "notifications" ? NOTIFICATION_ITEMS : NEWS_ITEMS),
        [activeTab],
    );

    return (
        <View
            className="flex-1 bg-background"
            style={{ paddingTop: insets.top }}
        >
            <ScrollView
                className="flex-1"
                contentContainerClassName="p-5 flex-col gap-3"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row items-center justify-end">
                    <Pressable
                        accessibilityRole="button"
                        className="h-9 w-9 items-center justify-center rounded-full active:opacity-80"
                    >
                        <Settings color="#00a2e8" size={30} />
                    </Pressable>
                </View>

                <View className="flex-col gap-5 overflow-hidden bg-surface-elevated">
                    <View className="relative h-48 overflow-hidden rounded-lg">
                        <Image
                            className="absolute inset-0 h-full w-full"
                            contentFit="cover"
                            source={require("../../../assets/images/banner-news.png")}
                        />
                    </View>

                    <TabContainer
                        tabs={listTabs.map((tab) => ({
                            key: tab.key,
                            label: tab.label,
                        }))}
                        value={activeTab}
                        onChange={(value) => setActiveTab(value)}
                        variant="underline"
                        tabListClassName="justify-center gap-10"
                    />
                </View>

                <View className="mt-2 bg-surface-elevated">
                    {items.map((item, index) => (
                        <NoticeCard key={item.id} item={item} index={index} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
