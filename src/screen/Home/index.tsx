import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { PageHeader } from "@/components/PageHeader";
import { QUICK_ACTIONS } from "@/constants/home";
import usePaginationList from "@/hooks/usePaginationList";
import type { IPost } from "@/models/post";
import { postService } from "@/services/PostService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { NewsCard } from "./NewCard";
import { QuickActionButton } from "./QuickAction";

const NEWS_LIMIT = 10;

export default function HomeScreen() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const {
        list: posts,
        loadFirstPage,
        isSkeletonLoading,
    } = usePaginationList<IPost>({
        fetchFn: async (payload) => {
            const response = await postService.listPosts(payload);
            return response.data ?? [];
        },
        limit: NEWS_LIMIT,
        params: {},
    });

    useEffect(() => {
        loadFirstPage();
    }, []);

    return (
        <View className="flex-1 bg-background">
            <PageHeader isIconRight={true} />
            <ScrollView
                className="flex-1"
                contentContainerClassName="px-5 flex-col gap-3"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-4">
                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Điểm đi
                        </Text>
                        <InputText
                            placeholder="Địa chỉ hiện tại"
                            value={origin}
                            onChangeText={setOrigin}
                            className="w-full"
                        />
                    </View>

                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Điểm đến
                        </Text>
                        <InputText
                            placeholder="Điểm đến"
                            value={destination}
                            onChangeText={setDestination}
                            className="w-full"
                        />
                    </View>

                    <Button
                        type="accent"
                        variant="bold"
                        className="w-full rounded-xl"
                    >
                        Tìm
                    </Button>
                </View>

                <View className="mt-6 flex-row">
                    {QUICK_ACTIONS.map((action) => (
                        <QuickActionButton key={action.id} action={action} />
                    ))}
                </View>

                <View className="mt-8">
                    <View className="mb-4 flex-row items-center justify-between">
                        <Text className="text-sm font-bold tracking-wide text-primary">
                            KHÁM PHÁ TIN TỨC
                        </Text>
                        <Pressable
                            className="active:opacity-80"
                            onPress={() => router.push("/notice/list")}
                        >
                            <Text className="text-sm font-medium text-accent">
                                Xem tất cả
                            </Text>
                        </Pressable>
                    </View>

                    {isSkeletonLoading ? (
                        <View className="h-40 items-center justify-center">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : (
                        <ScrollView
                            horizontal
                            nestedScrollEnabled
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="pr-5"
                        >
                            {posts.length > 0 ? (
                                posts.map((item) => (
                                    <NewsCard
                                        key={item._id}
                                        item={item}
                                        onPress={() =>
                                            router.push({
                                                pathname: "/notice/[id]",
                                                params: { id: item._id },
                                            })
                                        }
                                    />
                                ))
                            ) : (
                                <Text className="text-sm text-text-muted">
                                    Chưa có tin tức
                                </Text>
                            )}
                        </ScrollView>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
