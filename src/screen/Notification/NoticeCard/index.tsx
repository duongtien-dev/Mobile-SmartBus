import { router } from "expo-router";
import { Newspaper } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import type { INotice } from "@/constants/notices";

type NoticeCardProps = {
    item: INotice;
    index?: number;
};

export function NoticeCard({ item, index = 0 }: NoticeCardProps) {
    const isAlt = index % 2 === 0;

    return (
        <Pressable
            accessibilityRole="button"
            className={`flex-row items-start gap-3 px-4 py-3 active:opacity-80 ${
                isAlt ? "bg-surface" : "bg-background"
            }`}
            onPress={() => router.push(`/notice/${item.id}` as any)}
        >
            <View className="pt-0.5">
                <Newspaper color="#005f8b" size={18} strokeWidth={1.8} />
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

            <Text className="pt-0.5 text-xs font-medium text-accent underline">
                Xem chi tiết
            </Text>
        </Pressable>
    );
}
