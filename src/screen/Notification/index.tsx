import { PageHeader } from "@/components/PageHeader";
import TabContainer from "@/components/TabContainer";
import { Card } from "@/components/ui/Card";
import usePaginationList from "@/hooks/usePaginationList";
import type { IPost } from "@/models/post";
import { postService } from "@/services/PostService";
import { Image } from "expo-image";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, SectionList, Text, View } from "react-native";
import { NoticeCard } from "./NoticeCard";

const listTabs = [
    { label: "Mới nhất", key: "newest" },
    { label: "Cũ nhất", key: "oldest" },
] as const;

type PostSort = (typeof listTabs)[number]["key"];

function groupPostsByDate(posts: IPost[]) {
    const today = moment().startOf("day");
    const groups: { title: string; data: IPost[] }[] = [];
    const todayPosts: IPost[] = [];
    const earlierPosts: IPost[] = [];

    posts.forEach((post) => {
        if (moment(post.createdAt).isSameOrAfter(today)) {
            todayPosts.push(post);
        } else {
            earlierPosts.push(post);
        }
    });

    if (todayPosts.length) {
        groups.push({ title: "Hôm nay", data: todayPosts });
    }
    if (earlierPosts.length) {
        groups.push({ title: "Trước đó", data: earlierPosts });
    }

    return groups;
}

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

    const sections = useMemo(() => groupPostsByDate(posts), [posts]);

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title="Thông báo" isIconBack={false} />

            <View className="gap-4 px-5 pt-4">
                <Card padding="none" className="overflow-hidden">
                    <View className="relative h-55 overflow-hidden">
                        <Image
                            source={require("../../../assets/images/banner-news.png")}
                            style={{ width: "100%", height: "100%" }}
                            contentFit="cover"
                        />
                    </View>

                    <View className="px-4 pb-4">
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
                </Card>
            </View>

            <SectionList
                className="flex-1"
                sections={sections}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <NoticeCard item={item} index={index} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text className="bg-app-shell px-5 pb-2 pt-4 text-sm font-bold text-text-muted">
                        {title}
                    </Text>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="px-5 pb-8"
                ListEmptyComponent={
                    isSkeletonLoading ? (
                        <Card className="items-center py-10">
                            <ActivityIndicator color="#005f8b" />
                        </Card>
                    ) : (
                        <Card>
                            <Text className="py-6 text-center text-sm text-text-muted">
                                Chưa có thông báo
                            </Text>
                        </Card>
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
