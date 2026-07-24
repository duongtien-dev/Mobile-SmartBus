import type { IPost } from "@/models/post";
import { Image } from "expo-image";
import { router } from "expo-router";
import moment from "moment";
import { Newspaper } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

const DEFAULT_NEWS_IMAGE = require("../../../../assets/images/news.png");

type NewsCardProps = {
    item: IPost;
};

export function NewsCard({ item }: NewsCardProps) {
    const imageUri = item.images?.[0];
    const dateLabel = moment(item.createdAt).format("DD MMM YYYY");

    return (
        <Pressable
            accessibilityRole="button"
            className="w-[170px] active:opacity-90"
            onPress={() =>
                router.push({
                    pathname: "/notice/[id]",
                    params: { id: item._id },
                })
            }
        >
            <View
                className="overflow-hidden rounded-lg bg-card"
                style={{
                    borderWidth: 1,
                    borderColor: "#e2e8f0",
                }}
            >
                <View className="relative">
                    <Image
                        source={
                            imageUri ? { uri: imageUri } : DEFAULT_NEWS_IMAGE
                        }
                        style={{ width: "100%", height: 148 }}
                        contentFit="cover"
                        transition={200}
                    />

                    <View className="absolute left-3 top-3 flex-row items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1">
                        <Newspaper color="#005f8b" size={12} />
                        <Text className="text-[11px] font-semibold text-primary">
                            {item.category?.trim() || "Tin tức"}
                        </Text>
                    </View>
                </View>

                <View className="gap-2 p-3.5">
                    <Text
                        className="text-[15px] font-bold leading-5 text-text-primary"
                        numberOfLines={2}
                    >
                        {item.title}
                    </Text>

                    {item.summary ? (
                        <Text
                            className="text-xs leading-4 text-text-muted"
                            numberOfLines={2}
                        >
                            {item.summary}
                        </Text>
                    ) : null}

                    <Text className="text-[11px] font-medium text-text-secondary">
                        {dateLabel}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}
