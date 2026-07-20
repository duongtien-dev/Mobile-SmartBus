import { PageHeader } from "@/components/PageHeader";
import type { IPost } from "@/models/post";
import { postService } from "@/services/PostService";
import { Image } from "expo-image";
import { router } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
    id?: string | string[];
};

export default function NoticeDetailScreen({ id }: Props) {
    const insets = useSafeAreaInsets();
    const postId = Array.isArray(id) ? id[0] : id;
    const [post, setPost] = useState<IPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!postId) {
            setPost(null);
            setIsLoading(false);
            return;
        }

        const fetchPostDetail = async () => {
            setIsLoading(true);

            try {
                const response = await postService.getPostDetail({ id: postId });
                setPost(response.data ?? null);
            } catch {
                setPost(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostDetail();
    }, [postId]);

    if (isLoading) {
        return (
            <View
                className="flex-1 items-center justify-center bg-background"
                style={{ paddingTop: insets.top }}
            >
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    if (!post) {
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

    const image = post.images?.[0];

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Chi tiết" isIconRight={true} />

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

                {image ? (
                    <View className="mt-5 overflow-hidden rounded-xl">
                        <Image
                            className="h-48 w-full"
                            contentFit="cover"
                            source={image}
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
