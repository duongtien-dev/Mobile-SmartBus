import InputText from "@/components/Input/InputText";
import useFetch from "@/hooks/useFetch";
import { useTranslation } from "@/i18n";
import type { ISuggestLocation } from "@/models/suggestLocation";
import { tripService } from "@/services/TripService";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

type NearbySearchBarProps = {
    topInset: number;
    onSelectLocation: (location: ISuggestLocation) => void;
};

export function NearbySearchBar({
    topInset,
    onSelectLocation,
}: NearbySearchBarProps) {
    const { t } = useTranslation();
    const [keyword, setKeyword] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const trimmedKeyword = keyword.trim();

    const {
        data: suggestions,
        isLoading,
        loadFetchFn,
    } = useFetch<ISuggestLocation[]>({
        fetchFn: async () => {
            const response = await tripService.suggestLocations({
                keyword: trimmedKeyword,
            });
            return response.data ?? [];
        },
    });

    useEffect(() => {
        if (!trimmedKeyword) return;

        const timer = setTimeout(() => {
            loadFetchFn();
        }, 400);

        return () => clearTimeout(timer);
    }, [trimmedKeyword]);

    const suggestionList = suggestions ?? [];
    const showSuggestions =
        isFocused &&
        trimmedKeyword.length > 0 &&
        (isLoading || suggestionList.length > 0);

    const handleSelect = (item: ISuggestLocation) => {
        setKeyword(item.display_name);
        onSelectLocation(item);
        setIsFocused(false);
    };

    return (
        <View
            className="absolute inset-x-0 z-20 px-4"
            style={{ top: topInset + 8 }}
        >
            <View className="relative">
                <Ionicons
                    name="search"
                    size={20}
                    color="#9CA3AF"
                    style={{
                        position: "absolute",
                        left: 16,
                        top: 14,
                        zIndex: 10,
                    }}
                />
                <InputText
                    placeholder={t("route.nearby.searchPlaceholder")}
                    placeholderTextColor="#9CA3AF"
                    value={keyword}
                    onChangeText={setKeyword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setTimeout(() => setIsFocused(false), 200);
                    }}
                    className="h-12 rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-base shadow-sm"
                />

                {showSuggestions ? (
                    <View className="absolute inset-x-0 top-full mt-1 overflow-hidden rounded-xl border border-border bg-white shadow-md">
                        {isLoading ? (
                            <View className="items-center py-3">
                                <ActivityIndicator
                                    color="#005f8b"
                                    size="small"
                                />
                            </View>
                        ) : (
                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled
                                style={{ maxHeight: 220 }}
                            >
                                {suggestionList.map((item, index) => (
                                    <Pressable
                                        key={`${item.lat}-${item.lng}-${index}`}
                                        className="border-b border-border px-4 py-3 active:bg-surface"
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text className="text-sm text-text-primary">
                                            {item.display_name}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                ) : null}
            </View>
        </View>
    );
}
