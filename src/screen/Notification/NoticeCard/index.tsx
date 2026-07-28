import type { IPost } from "@/models/post";
import { router } from "expo-router";
import { ChevronRight, Newspaper } from "lucide-react-native";
import moment from "moment";
import { Pressable, Text, View } from "react-native";

type NoticeCardProps = {
    item: IPost;
    index?: number;
    isLast?: boolean;
};

const ICON_TONES = [
    { bg: "bg-[#E8F4F8]", icon: "#0B6E99" },
    { bg: "bg-[#EEF0FF]", icon: "#6B4EFF" },
    { bg: "bg-[#FFF0E8]", icon: "#E8895C" },
] as const;

export function NoticeCard({ item, index = 0, isLast }: NoticeCardProps) {
    const tone = ICON_TONES[index % ICON_TONES.length];

    return (
        <Pressable
            accessibilityRole="button"
            className={`flex-row items-center gap-3 bg-white px-4 py-3.5 active:opacity-85 ${
                index === 0 ? "rounded-t-[24px]" : ""
            } ${isLast ? "mb-1 rounded-b-[24px]" : ""}`}
            onPress={() =>
                router.push({
                    pathname: "/notice/[id]",
                    params: { id: item._id },
                })
            }
        >
            <View
                className={`h-12 w-12 items-center justify-center rounded-full ${tone.bg}`}
            >
                <Newspaper color={tone.icon} size={20} strokeWidth={1.8} />
            </View>

            <View className="min-w-0 flex-1 gap-1">
                <Text
                    className="text-[15px] font-semibold leading-5 text-text-primary"
                    numberOfLines={2}
                >
                    {item.title}
                </Text>
                {item.summary ? (
                    <Text
                        className="text-xs leading-4 text-text-muted"
                        numberOfLines={1}
                    >
                        {item.summary}
                    </Text>
                ) : null}
                <Text className="text-xs text-text-muted">
                    {moment(item.createdAt).format("HH:mm · DD/MM/YYYY")}
                </Text>
            </View>

            <ChevronRight color="#9CA3AF" size={18} />

            {!isLast ? (
                <View className="absolute bottom-0 left-16 right-4 h-px bg-[#F0EFF4]" />
            ) : null}
        </Pressable>
    );
}
