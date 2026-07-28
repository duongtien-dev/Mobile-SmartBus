import type { IPost } from "@/models/post";
import { router } from "expo-router";
import { Newspaper } from "lucide-react-native";
import moment from "moment";
import { Pressable, Text, View } from "react-native";

type NoticeCardProps = {
    item: IPost;
};

export function NoticeCard({ item }: NoticeCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            className="mb-2.5 flex-row items-start gap-3 rounded-2xl bg-card px-4 py-3.5 active:opacity-90"
            onPress={() =>
                router.push({
                    pathname: "/notice/[id]",
                    params: { id: item._id },
                })
            }
        >
            <View className="mt-0.5 h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                <Newspaper color="#005f8b" size={18} strokeWidth={1.8} />
            </View>

            <View className="min-w-0 flex-1">
                <Text
                    className="text-sm font-semibold leading-5 text-text-primary"
                    numberOfLines={2}
                >
                    {item.title}
                </Text>
                {item.summary ? (
                    <Text
                        className="mt-1 text-xs leading-4 text-text-muted"
                        numberOfLines={2}
                    >
                        {item.summary}
                    </Text>
                ) : null}
                <Text className="mt-2 text-xs text-text-muted">
                    {moment(item.createdAt).format("HH:mm · DD/MM/YYYY")}
                </Text>
            </View>
        </Pressable>
    );
}
