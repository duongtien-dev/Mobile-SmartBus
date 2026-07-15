import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PageHeader } from "@/components/PageHeader";
import {
    NOTICE_TYPE_LABELS,
    getNoticeById,
} from "@/constants/notices";

type Props = {
    id: string;
};

export default function NoticeDetailScreen({ id }: Props) {
    const insets = useSafeAreaInsets();
    const notice = getNoticeById(id);

    if (!notice) {
        return (
            <View
                className="flex-1 items-center justify-center bg-background px-6"
                style={{ paddingTop: insets.top }}
            >
                <Text className="text-base font-semibold text-text-primary">
                    Không tìm thấy nội dung
                </Text>
                <Pressable
                    className="mt-4 active:opacity-80"
                    onPress={() => router.back()}
                >
                    <Text className="text-sm font-medium text-accent">
                        Quay lại
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Chi tiết" />

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-5 pb-8 pt-4"
                showsVerticalScrollIndicator={false}
            >
                <View className="self-start rounded-full bg-accent-light px-3 py-1">
                    <Text className="text-xs font-semibold text-primary">
                        {NOTICE_TYPE_LABELS[notice.type]}
                    </Text>
                </View>

                <Text className="mt-4 text-xl font-bold leading-7 text-primary">
                    {notice.title}
                </Text>

                <View className="mt-3 flex-row items-center gap-3">
                    <Text className="text-sm text-text-muted">{notice.time}</Text>
                    <Text className="text-sm text-text-muted">{notice.date}</Text>
                </View>

                {notice.image ? (
                    <View className="mt-5 overflow-hidden rounded-xl">
                        <Image
                            className="h-48 w-full"
                            contentFit="cover"
                            source={notice.image}
                        />
                    </View>
                ) : null}

                <Text className="mt-5 text-base leading-7 text-text-primary">
                    {notice.content}
                </Text>
            </ScrollView>
        </View>
    );
}
