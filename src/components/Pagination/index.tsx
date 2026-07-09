import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

function getPageNumbers(page: number, totalPages: number): (number | "ellipsis")[] {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) {
        return [1, 2, "ellipsis", totalPages - 1, totalPages];
    }

    if (page >= totalPages - 2) {
        return [1, 2, "ellipsis", totalPages - 1, totalPages];
    }

    return [1, "ellipsis", page, "ellipsis", totalPages];
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = getPageNumbers(page, totalPages);

    return (
        <View className="flex-row items-center justify-center gap-1 bg-accent px-3 py-2">
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Trang trước"
                className="h-8 w-8 items-center justify-center active:opacity-80 disabled:opacity-40"
                disabled={page <= 1}
                onPress={() => onPageChange(page - 1)}
            >
                <ChevronLeft color="#ffffff" size={18} />
            </Pressable>

            {pages.map((item, index) =>
                item === "ellipsis" ? (
                    <Text
                        key={`ellipsis-${index}`}
                        className="px-1 text-sm text-white/80"
                    >
                        ...
                    </Text>
                ) : (
                    <Pressable
                        key={item}
                        accessibilityRole="button"
                        accessibilityLabel={`Trang ${item}`}
                        className={`h-8 min-w-8 items-center justify-center rounded px-2 active:opacity-80 ${
                            item === page ? "bg-white" : ""
                        }`}
                        onPress={() => onPageChange(item)}
                    >
                        <Text
                            className={`text-sm font-semibold ${
                                item === page ? "text-accent" : "text-white"
                            }`}
                        >
                            {item}
                        </Text>
                    </Pressable>
                ),
            )}

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Trang sau"
                className="h-8 w-8 items-center justify-center active:opacity-80 disabled:opacity-40"
                disabled={page >= totalPages}
                onPress={() => onPageChange(page + 1)}
            >
                <ChevronRight color="#ffffff" size={18} />
            </Pressable>
        </View>
    );
}
