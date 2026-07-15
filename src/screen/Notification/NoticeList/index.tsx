import { PageHeader } from "@/components/PageHeader";
import { Pagination } from "@/components/Pagination";
import {
    NOTICE_CATEGORY_LABELS,
    type NoticeCategory,
    getNewsByCategory,
} from "@/constants/notices";
import { NoticeCard } from "@/screen/Notification/NoticeCard";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const PAGE_SIZE = 5;

type NoticeSectionProps = {
    category: NoticeCategory;
    page?: number;
    onPageChange?: (page: number) => void;
};

function NoticeSection({
    category,
    page = 1,
    onPageChange,
}: NoticeSectionProps) {
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
        <View className="flex-col gap-4">
            <Text className="px-4 py-4 text-lg font-bold text-primary">
                {NOTICE_CATEGORY_LABELS[category]}
            </Text>

            <View className="bg-surface-elevated">
                {items.map((item, index) => (
                    <NoticeCard key={item.id} item={item} index={index} />
                ))}
            </View>

            {onPageChange ? (
                <View className="items-center justify-center">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </View>
            ) : null}
        </View>
    );
}

export default function NoticeListScreen() {
    const [danabusPage, setDanabusPage] = useState(1);

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Tin tức" isIconBack={true} />

            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-8"
                showsVerticalScrollIndicator={false}
            >
                <NoticeSection
                    category="danabus"
                    page={danabusPage}
                    onPageChange={setDanabusPage}
                />

                <NoticeSection category="transport" />
            </ScrollView>
        </View>
    );
}
