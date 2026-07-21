import InputText from "@/components/Input/InputText";
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

type SuggestLocationInputProps = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    onSelect?: (item: ISuggestLocation) => void;
    zIndex?: number;
};

export function SuggestLocationInput({
    label,
    placeholder,
    value,
    onChangeText,
    onSelect,
    zIndex = 10,
}: SuggestLocationInputProps) {
    const [suggestions, setSuggestions] = useState<ISuggestLocation[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const keyword = value.trim();

        if (!keyword) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);

            try {
                const response = await tripService.suggestLocations({
                    keyword,
                });
                setSuggestions((response.data ?? []) as ISuggestLocation[]);
            } catch {
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [value]);

    const showSuggestions =
        isFocused && value.trim().length > 0 && (isLoading || suggestions.length > 0);

    const handleSelect = (item: ISuggestLocation) => {
        onChangeText(item.display_name);
        onSelect?.(item);
        setSuggestions([]);
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
                                {suggestions.map((item, index) => (
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
