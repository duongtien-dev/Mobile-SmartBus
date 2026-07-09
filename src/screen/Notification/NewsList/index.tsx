import { Pagination } from "@/components/Pagination";
import {
    NOTICE_CATEGORY_LABELS,
    type NoticeCategory,
    getNewsByCategory,
} from "@/constants/notices";
import { NoticeCard } from "@/screen/Notification/NoticeCard";
import { router } from "expo-router";
import { ArrowLeft, Settings } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PAGE_SIZE = 5;

type NewsSectionProps = {
    category: NoticeCategory;
    page?: number;
    onPageChange?: (page: number) => void;
};

function NewsSection({
    category,
    page = 1,
    onPageChange,
}: NewsSectionProps) {
    const allItems = getNewsByCategory(category);
    const totalPages = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE));

    const items = useMemo(() => {
        if (!onPageChange) {
            return allItems;
        }

        const start = (page - 1) * PAGE_SIZE;
        return allItems.slice(start, start + PAGE_SIZE);
    }, [allItems, onPageChange, page]);

    return (
        <View>
            <Text className="px-4 py-4 text-lg font-bold text-primary">
                {NOTICE_CATEGORY_LABELS[category]}
            </Text>

            <View className="bg-surface-elevated">
                {items.map((item, index) => (
                    <NoticeCard key={item.id} item={item} index={index} />
                ))}
            </View>

            {onPageChange ? (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            ) : null}
        </View>
    );
}

export default function NewsListScreen() {
    const insets = useSafeAreaInsets();
    const [danabusPage, setDanabusPage] = useState(1);

    return (
        <View
            className="flex-1 bg-background"
            style={{ paddingTop: insets.top }}
        >
            <View className="flex-row items-center justify-between px-4 pt-2">
                <Pressable
                    accessibilityRole="button"
                    className="h-10 w-10 items-center justify-center active:opacity-80"
                    onPress={() => router.back()}
                >
                    <ArrowLeft color="#005f8b" size={24} />
                </Pressable>

                <View className="flex-row items-center gap-3">
                    <View className="h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border bg-surface">
                        <Text className="text-base">🇻🇳</Text>
                    </View>
                    <Pressable
                        accessibilityRole="button"
                        className="h-9 w-9 items-center justify-center active:opacity-80"
                    >
                        <Settings color="#005f8b" size={24} />
                    </Pressable>
                </View>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-8"
                showsVerticalScrollIndicator={false}
            >
                <NewsSection
                    category="danabus"
                    page={danabusPage}
                    onPageChange={setDanabusPage}
                />

                <NewsSection category="transport" />
            </ScrollView>
        </View>
    );
}
