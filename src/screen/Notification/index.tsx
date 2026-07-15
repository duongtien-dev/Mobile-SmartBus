import { PageHeader } from "@/components/PageHeader";
import TabContainer from "@/components/TabContainer";
import {
    NEWS_ITEMS,
    NOTIFICATION_ITEMS,
} from "@/constants/notices";
import { Image } from "expo-image";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
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
    const [activeTab, setActiveTab] = useState<string>("notifications");

    const items = useMemo(
        () => (activeTab === "notifications" ? NOTIFICATION_ITEMS : NEWS_ITEMS),
        [activeTab],
    );

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Thông báo" showBack={false} />

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-5 flex-col gap-3"
                showsVerticalScrollIndicator={false}
            >
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

                <View className="bg-surface-elevated">
                    {items.map((item, index) => (
                        <NoticeCard key={item.id} item={item} index={index} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
