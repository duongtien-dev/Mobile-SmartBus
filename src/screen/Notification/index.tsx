import { PageHeader } from "@/components/PageHeader";
import TabContainer from "@/components/TabContainer";
import usePaginationList from "@/hooks/usePaginationList";
import type { IPost } from "@/models/post";
import { postService } from "@/services/PostService";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { NoticeCard } from "./NoticeCard";

const listTabs = [
    {
        label: "Mới nhất",
        key: "newest",
    },
    {
        label: "Cũ nhất",
        key: "oldest",
    },
] as const;

type PostSort = (typeof listTabs)[number]["key"];

export default function NotificationsScreen() {
    const [activeTab, setActiveTab] = useState<PostSort>("newest");

    const {
        list: posts,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<IPost, { sort: PostSort }>({
        fetchFn: async (payload) => {
            const response = await postService.listPosts(payload);
            return response.data ?? [];
        },
        limit: 12,
        params: { sort: activeTab },
    });

    useEffect(() => {
        loadFirstPage();
    }, [activeTab]);

    return (
        <View className="flex-1 gap-5 bg-background">
            <PageHeader title="Thông báo" isIconBack={false} />
            <View className="px-5">
                <View className="flex-col gap-5 overflow-hidden bg-surface-elevated">
                    <View className="relative h-48 overflow-hidden rounded-lg">
                        <Image
                            className="absolute inset-0 h-full w-full"
                            contentFit="cover"
                            source={require("../../../assets/images/banner-news.png")}
                        />
                    </View>

                    <TabContainer
                        tabs={listTabs.map((tab) => ({
                            key: tab.key,
                            label: tab.label,
                        }))}
                        value={activeTab}
                        onChange={(value) => setActiveTab(value as PostSort)}
                        variant="underline"
                        tabListClassName="justify-center gap-10"
                    />
                </View>
            </View>

            <FlatList
                className="mt-3 flex-1"
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <NoticeCard item={item} index={index} />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="px-5 pb-8"
                ListEmptyComponent={
                    isSkeletonLoading ? (
                        <View className="items-center bg-surface-elevated py-10">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : (
                        <Text className="bg-surface-elevated py-10 text-center text-sm text-text-muted">
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
