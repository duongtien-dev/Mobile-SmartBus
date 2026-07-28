import usePaginationList from "@/hooks/usePaginationList";
import { useTranslation } from "@/i18n";
import type { IPost } from "@/models/post";
import { postService } from "@/services/PostService";
import { LinearGradient } from "expo-linear-gradient";
import { Bell } from "lucide-react-native";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SectionList,
    Text,
    View,
} from "react-native";
import { NoticeCard } from "./NoticeCard";

type PostSort = "newest" | "oldest";

export default function NotificationsScreen() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<PostSort>("newest");

    const listTabs = useMemo(
        () =>
            [
                { label: t("notice.sortNewest"), key: "newest" as const },
                { label: t("notice.sortOldest"), key: "oldest" as const },
            ] as const,
        [t],
    );

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
        <View className="flex-1 bg-[#F3F2F7]">
            <View className="px-5 pb-2 pt-3">
                <Text className="text-center text-lg font-bold text-text-primary">
                    {t("notice.title")}
                </Text>
            </View>

            <SectionList
                className="flex-1"
                sections={sections}
                keyExtractor={(item) => item._id}
                stickySectionHeadersEnabled={false}
                ListHeaderComponent={
                    <View className="gap-4 pb-1">
                        <LinearGradient
                            colors={["#0B6E99", "#1FA2C5", "#6EE0C5"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="overflow-hidden rounded-[28px] px-5 py-5"
                        >
                            <View className="flex-row items-start justify-between">
                                <View className="mr-3 flex-1">
                                    <Text className="text-xs font-semibold uppercase tracking-wide text-white/75">
                                        DanaBus
                                    </Text>
                                    <Text className="mt-1 text-xl font-extrabold text-white">
                                        {t("notice.newsTitle")}
                                    </Text>
                                    <Text className="mt-2 text-sm leading-5 text-white/90">
                                        {t("notice.heroSubtitle")}
                                    </Text>
                                </View>
                                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                                    <Bell color="#fff" size={22} />
                                </View>
                            </View>
                        </LinearGradient>

                        <View className="flex-row rounded-[28px] bg-white p-1.5">
                            {listTabs.map((tab) => {
                                const isActive = tab.key === activeTab;
                                return (
                                    <Pressable
                                        key={tab.key}
                                        accessibilityRole="tab"
                                        accessibilityState={{
                                            selected: isActive,
                                        }}
                                        onPress={() => setActiveTab(tab.key)}
                                        className={`flex-1 rounded-[22px] px-3 py-3 ${
                                            isActive
                                                ? "bg-[#0B6E99]"
                                                : "bg-transparent"
                                        }`}
                                    >
                                        <Text
                                            className={`text-center text-sm font-semibold ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-text-muted"
                                            }`}
                                        >
                                            {tab.label}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                }
                renderItem={({ item, index, section }) => (
                    <NoticeCard
                        item={item}
                        index={index}
                        isLast={index === section.data.length - 1}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text className="bg-[#F3F2F7] pb-2 pt-4 text-sm font-bold text-text-muted">
                        {title}
                    </Text>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="px-5 pb-10"
                ListEmptyComponent={
                    isSkeletonLoading ? (
                        <View className="items-center rounded-[28px] bg-white py-12">
                            <ActivityIndicator color="#0B6E99" />
                        </View>
                    ) : (
                        <View className="items-center rounded-[28px] bg-white px-5 py-12">
                            <View className="mb-3 h-14 w-14 items-center justify-center rounded-full bg-[#E8F4F8]">
                                <Bell color="#0B6E99" size={24} />
                            </View>
                            <Text className="text-center text-sm font-medium text-text-muted">
                                {t("notice.empty")}
                            </Text>
                        </View>
                    )
                }
                ListFooterComponent={
                    isLoadingMore ? (
                        <View className="items-center py-4">
                            <ActivityIndicator color="#0B6E99" />
                        </View>
                    ) : null
                }
            />
        </View>
    );
}
