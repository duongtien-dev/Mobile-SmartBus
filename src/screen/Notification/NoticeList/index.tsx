import { PageHeader } from "@/components/PageHeader";
import usePaginationList from "@/hooks/usePaginationList";
import type { IPost } from "@/models/post";
import { NoticeCard } from "@/screen/Notification/NoticeCard";
import { postService } from "@/services/PostService";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function NoticeListScreen() {
    const {
        list: posts,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<IPost>({
        fetchFn: async (payload) => {
            const response = await postService.listPosts(payload);
            return response.data ?? [];
        },
        limit: 18,
        params: {},
    });

    useEffect(() => {
        loadFirstPage();
    }, []);

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Tin tức" isIconBack={true} />

            <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <NoticeCard item={item} index={index} />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-8"
                ListEmptyComponent={
                    isSkeletonLoading ? (
                        <View className="items-center py-10">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : (
                        <Text className="px-4 py-10 text-center text-sm text-text-muted">
                            Chưa có tin tức
                        </Text>
                    )
                }
                ListFooterComponent={
                    isLoadingMore ? (
                        <View className="items-center py-4">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : null
                }
            />
        </View>
    );
}
