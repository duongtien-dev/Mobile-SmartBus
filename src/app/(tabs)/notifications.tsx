import { Image } from "expo-image";
import { Bell, Settings } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NoticeTab = "notifications" | "news";

type NoticeItem = {
    id: string;
    title: string;
    time: string;
    date: string;
};

const NOTIFICATION_ITEMS: NoticeItem[] = [
    {
        id: "1",
        title: "Sự kiện: Giờ vàng xe buýt",
        time: "14:00",
        date: "06/11/2025",
    },
    {
        id: "2",
        title: "Cập nhật ứng dụng phiên bản 2.3",
        time: "04:52",
        date: "03/11/2025",
    },
    {
        id: "3",
        title: "Cập nhật ứng dụng phiên bản 2.2",
        time: "10:15",
        date: "31/10/2025",
    },
    {
        id: "4",
        title: "Cập nhật ứng dụng phiên bản 2.1",
        time: "08:41",
        date: "31/10/2025",
    },
    {
        id: "5",
        title: "Cập nhật ứng dụng phiên bản 2.0",
        time: "08:58",
        date: "30/10/2025",
    },
];

const NEWS_ITEMS: NoticeItem[] = [
    {
        id: "6",
        title: "Tin tức: Điều chỉnh lộ trình một số tuyến",
        time: "09:00",
        date: "05/11/2025",
    },
    {
        id: "7",
        title: "Khai trương điểm bán vé tự động mới",
        time: "15:20",
        date: "02/11/2025",
    },
    {
        id: "8",
        title: "Khuyến mãi vé tháng cho sinh viên",
        time: "07:30",
        date: "29/10/2025",
    },
];

function NoticeRow({ item }: { item: NoticeItem }) {
    return (
        <Pressable className="flex-row items-start gap-3 border-b border-border px-4 py-3 active:bg-surface">
            <View className="pt-0.5">
                <Bell color="#0f172a" size={18} strokeWidth={1.8} />
            </View>

            <View className="flex-1 gap-1">
                <Text className="text-sm font-medium leading-5 text-primary">
                    {item.title}
                </Text>
                <View className="flex-row items-center gap-3">
                    <Text className="text-[11px] text-disabled">{item.time}</Text>
                    <Text className="text-[11px] text-disabled">{item.date}</Text>
                </View>
            </View>

            <Text className="pt-0.5 text-xs font-medium text-accent">
                Xem chi tiết
            </Text>
        </Pressable>
    );
}

export default function NotificationsScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<NoticeTab>("notifications");

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
                contentContainerClassName="p-5"
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

                <View className="overflow-hidden bg-surface-elevated flex-col gap-5">
                    <View className="relative h-48 overflow-hidden rounded-lg">
                        <Image
                            className="absolute inset-0 h-full w-full"
                            contentFit="cover"
                            source={require("../../../assets/images/banner-news.png")}
                        />
                    </View>

                    <View className="flex-row bg-surface-elevated">
                        <Pressable
                            className="mr-8 items-center pb-3 active:opacity-80"
                            onPress={() => setActiveTab("notifications")}
                        >
                            <Text
                                className={`text-sm font-semibold ${
                                    activeTab === "notifications"
                                        ? "text-primary"
                                        : "text-text-secondary"
                                }`}
                            >
                                Thông báo
                            </Text>
                            <View
                                className={`mt-2 h-0.5 w-16 rounded-full ${
                                    activeTab === "notifications"
                                        ? "bg-primary"
                                        : "bg-transparent"
                                }`}
                            />
                        </Pressable>

                        <Pressable
                            className="items-center pb-3 active:opacity-80"
                            onPress={() => setActiveTab("news")}
                        >
                            <Text
                                className={`text-sm font-semibold ${
                                    activeTab === "news"
                                        ? "text-primary"
                                        : "text-text-secondary"
                                }`}
                            >
                                Tin tức
                            </Text>
                            <View
                                className={`mt-2 h-0.5 w-12 rounded-full ${
                                    activeTab === "news"
                                        ? "bg-primary"
                                        : "bg-transparent"
                                }`}
                            />
                        </Pressable>
                    </View>
                </View>

                <View className="mt-2 bg-surface-elevated">
                    {items.map((item) => (
                        <NoticeRow key={item.id} item={item} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
