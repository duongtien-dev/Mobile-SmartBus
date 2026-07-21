import type { IPost } from "@/models/post";
import { Image } from "expo-image";
import { router } from "expo-router";
import moment from "moment";
import { Pressable, Text, View } from "react-native";

const DEFAULT_NEWS_IMAGE = require("../../../../assets/images/news.png");

type NewsCardProps = {
    item: IPost;
};

export function NewsCard({ item }: NewsCardProps) {
    const image = item.images?.[0] ?? DEFAULT_NEWS_IMAGE;

    return (
        <Pressable
            accessibilityRole="button"
            className="mr-4 w-40 active:opacity-90"
            onPress={() => router.push({
                pathname: "/notice/[id]",
                params: { id: item._id },
            })}
        >
            <View className="overflow-hidden rounded-xl border border-border bg-surface-elevated">
                <Image
                    className="h-28 w-full"
                    contentFit="cover"
                    source={image}
                />
                <View className="gap-1 p-3">
                    <Text
                        className="text-sm font-semibold text-text-primary"
                        numberOfLines={2}
                    >
                        {item.title}
                    </Text>
                    <Text className="text-xs text-text-muted">
                        {moment(item.createdAt).format("DD/MM/YYYY")}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}
