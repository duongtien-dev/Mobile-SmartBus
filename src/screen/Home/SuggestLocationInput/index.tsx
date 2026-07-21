import InputText from "@/components/Input/InputText";
import useFetch from "@/hooks/useFetch";
import type { ISuggestLocation } from "@/models/suggestLocation";
import { tripService } from "@/services/TripService";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

type Props = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    onSelect?: (item: ISuggestLocation) => void;
    zIndex?: number;
};

export function SuggestLocationInput({ ...Props }: Props) {
    // Destructure props
    const { label, placeholder, value, onChangeText, onSelect, zIndex = 10 } = Props;
    // Destructure props

    const [isFocused, setIsFocused] = useState(false);
    const keyword = value.trim();

    const {
        data: suggestions,
        isLoading,
        loadFetchFn,
    } = useFetch<ISuggestLocation[]>({
        fetchFn: async () => {

            const response = await tripService.suggestLocations({
                keyword,
            });
            return response.data ?? [];
        },
    });

    useEffect(() => {
        if (!keyword) return;
        const timer = setTimeout(() => {
            loadFetchFn();
        }, 400);

        return () => clearTimeout(timer);
    }, [keyword]);

    const suggestionList = suggestions ?? [];

    const showSuggestions =
        isFocused &&
        keyword.length > 0 &&
        (isLoading || suggestionList.length > 0);

    const handleSelect = (item: ISuggestLocation) => {
        onChangeText(item.display_name);
        onSelect?.(item);
        setIsFocused(false);
    };

    return (
        <View style={{ zIndex, elevation: zIndex }}>
            <Text className="text-sm font-semibold text-text-primary">{label}</Text>

            <View className="relative mt-1.5">
                <InputText
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setTimeout(() => setIsFocused(false), 200);
                    }}
                    className="w-full"
                />

                {showSuggestions ? (
                    <View
                        className="absolute inset-x-0 top-full mt-1 overflow-hidden rounded-lg border border-border bg-background shadow-sm"
                        style={{ zIndex: zIndex + 1, elevation: zIndex + 1 }}
                    >
                        {isLoading ? (
                            <View className="items-center py-3">
                                <ActivityIndicator color="#005f8b" size="small" />
                            </View>
                        ) : (
                            <ScrollView
                                nestedScrollEnabled
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator
                                style={{ maxHeight: 192 }}
                            >
                                {suggestionList.map((item, index) => (
                                    <Pressable
                                        key={`${item.lat}-${item.lng}-${index}`}
                                        className="border-b border-border px-3 py-3 active:bg-surface"
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
