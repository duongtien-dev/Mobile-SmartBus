import { PageHeader } from "@/components/PageHeader";
import useFetch from "@/hooks/useFetch";
import type { IPost } from "@/models/post";
import { postService } from "@/services/PostService";
import { Image } from "expo-image";
import { router } from "expo-router";
import moment from "moment";
import { useEffect } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

type Props = {
    id: string;
};

export default function NoticeDetailScreen({ id }: Props) {
    const { data: post, isLoading, loadFetchFn } = useFetch<IPost>({
        fetchFn: async () => {
            const response = await postService.getPostDetail({ id });
            return response.data;
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, [id]);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    if (!post) {
        return (
            <View className="flex-1 items-center justify-center bg-background px-6">
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
            <PageHeader title="Chi tiết" isIconBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="px-5 pb-8 pt-4"
                showsVerticalScrollIndicator={false}
            >
                {post.category ? (
                    <View className="self-start rounded-full bg-accent-light px-3 py-1">
                        <Text className="text-xs font-semibold text-primary">
                            {post.category}
                        </Text>
                    </View>
                ) : null}

                <Text className="mt-4 text-xl font-bold leading-7 text-primary">
                    {post.title}
                </Text>

                <View className="mt-3 flex-row items-center gap-3">
                    <Text className="text-sm text-text-muted">
                        {moment(post.createdAt).format("HH:mm")}
                    </Text>
                    <Text className="text-sm text-text-muted">
                        {moment(post.createdAt).format("DD/MM/YYYY")}
                    </Text>
                </View>

                {post.images?.[0] ? (
                    <View className="mt-5 overflow-hidden rounded-xl bg-surface">
                        <Image
                            source={{ uri: post.images[0] }}
                            style={{ width: "100%", height: 192 }}
                            contentFit="cover"
                            transition={200}
                        />
                    </View>
                ) : null}

                <Text className="mt-5 text-base leading-7 text-text-primary">
                    {post.content || post.summary}
                </Text>
            </ScrollView>
        </View>
    );
}
