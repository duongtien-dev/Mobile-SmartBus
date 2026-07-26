import InputText from "@/components/Input/InputText";
import useLocationSuggestions from "@/hooks/useLocationSuggestions";
import type { ISuggestLocation } from "@/models/suggestLocation";
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
    /** Cao hơn các block phía dưới trong ScrollView (Android cần elevation) */
    zIndex?: number;
};

export function SuggestLocationInput({
    label,
    placeholder,
    value,
    onChangeText,
    onSelect,
    zIndex = 30,
}: Props) {
    const {
        setIsFocused,
        handleBlur,
        suggestionList,
        isLoading,
        showSuggestions,
    } = useLocationSuggestions(value);

    const handleSelect = (item: ISuggestLocation) => {
        onChangeText(item.display_name);
        onSelect?.(item);
        setIsFocused(false);
    };

    return (
        <View
            collapsable={false}
            style={{ zIndex, elevation: zIndex, overflow: "visible" }}
        >
            <Text className="text-sm font-semibold text-text-primary">
                {label}
            </Text>

            <View
                className="relative mt-1.5"
                style={{ overflow: "visible", zIndex }}
                collapsable={false}
            >
                <InputText
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    className="w-full"
                />

                {showSuggestions ? (
                    <View
                        className="absolute inset-x-0 top-full mt-1 rounded-lg border border-border bg-white"
                        style={{
                            zIndex: zIndex + 10,
                            elevation: zIndex + 10,
                            maxHeight: 192,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.15,
                            shadowRadius: 8,
                        }}
                        collapsable={false}
                    >
                        {isLoading ? (
                            <View className="items-center py-3">
                                <ActivityIndicator
                                    color="#005f8b"
                                    size="small"
                                />
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
