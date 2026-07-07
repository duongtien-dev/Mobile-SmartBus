import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import type { NewsItem } from "@/constants/home";

type NewsCardProps = {
    item: NewsItem;
    onPress?: () => void;
};

export function NewsCard({ item, onPress }: NewsCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            className="mr-4 w-64 active:opacity-90"
            onPress={onPress}
        >
            <View className="overflow-hidden rounded-xl border border-border bg-surface-elevated">
                <Image
                    className="h-28 w-full"
                    contentFit="cover"
                    source={item.image}
                />
                <View className="gap-1 p-3">
                    <Text
                        className="text-sm font-semibold text-text-primary"
                        numberOfLines={2}
                    >
                        {item.title}
                    </Text>
                    <Text className="text-xs text-text-muted">{item.date}</Text>
                </View>
            </View>
        </Pressable>
    );
}
