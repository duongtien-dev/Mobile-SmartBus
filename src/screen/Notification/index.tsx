import { PageHeader } from "@/components/PageHeader";
import TabContainer from "@/components/TabContainer";
import usePaginationList from "@/hooks/usePaginationList";
import { useTranslation } from "@/i18n";
import type { IPost } from "@/models/post";
import { postService } from "@/services/PostService";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, SectionList, Text, View } from "react-native";
import { NoticeCard } from "./NoticeCard";

type PostSort = "newest" | "oldest";

export default function NotificationsScreen() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<PostSort>("newest");

    const listTabs = [
        { label: t("notice.sortNewest"), key: "newest" as const },
        { label: t("notice.sortOldest"), key: "oldest" as const },
    ]

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

    const sections = useMemo(() => {
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
            groups.push({ title: t("notice.groupToday"), data: todayPosts });
        }
        if (earlierPosts.length) {
            groups.push({
                title: t("notice.groupEarlier"),
                data: earlierPosts,
            });
        }

        return groups;
    }, [posts, t]);

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={t("notice.title")} isIconBack={false} />

            <View className="border-b border-border">
                <TabContainer
                    tabs={listTabs}
                    value={activeTab}
                    onChange={(value) => setActiveTab(value as PostSort)}
                    tabListClassName="justify-center"
                />
            </View>

            <SectionList
                className="flex-1"
                sections={sections}
                keyExtractor={(item) => item._id}
                stickySectionHeadersEnabled={false}
                renderItem={({ item }) => <NoticeCard item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text className="bg-app-shell px-5 pb-2 pt-5 text-xs font-semibold uppercase tracking-wide text-text-muted">
                        {title}
                    </Text>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="px-5 pb-8"
                ListEmptyComponent={
                    isSkeletonLoading ? (
                        <View className="items-center py-16">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : (
                        <View className="items-center py-16">
                            <Text className="text-sm text-text-muted">
                                {t("notice.empty")}
                            </Text>
                        </View>
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
