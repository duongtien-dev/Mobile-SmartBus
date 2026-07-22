import type { IPost } from "@/models/post";
import { Card } from "@/components/ui/Card";
import { router } from "expo-router";
import { Newspaper } from "lucide-react-native";
import moment from "moment";
import { Pressable, Text, View } from "react-native";

type NoticeCardProps = {
    item: IPost;
    index?: number;
};

export function NoticeCard({ item }: NoticeCardProps) {
    return (
        <Pressable
            accessibilityRole="button"
            className="mb-3 active:opacity-90"
            onPress={() =>
                router.push({
                    pathname: "/notice/[id]",
                    params: { id: item._id },
                })
            }
        >
            <Card className="flex-row items-start gap-3" padding="md">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                    <Newspaper color="#005f8b" size={18} strokeWidth={1.8} />
                </View>

                <View className="min-w-0 flex-1 gap-1">
                    <Text
                        className="text-sm font-semibold leading-5 text-text-primary"
                        numberOfLines={2}
                    >
                        {item.title}
                    </Text>
                    <Text className="text-xs text-text-muted">
                        {moment(item.createdAt).format("HH:mm · DD/MM/YYYY")}
                    </Text>
                </View>
            </Card>
        </Pressable>
    );
}
