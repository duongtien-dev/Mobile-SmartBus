import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useDebounce from "@/hooks/useDebounce";
import InputText from "../Input/InputText";

type SearchInputProps = {
    delay?: number;
    defaultValue?: string;
    onSearch: (value: string) => void;
    placeholder?: string;
};

export default function SearchInput({
    delay = 1000,
    defaultValue = "",
    onSearch,
    placeholder = "Tìm kiếm...",
}: SearchInputProps) {
    const [keyword, setKeyword] =
        useState(defaultValue);

    const debouncedKeyword =
        useDebounce(keyword, delay);

    const isFirstRender =
        useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        onSearch(
            debouncedKeyword.trim()
        );
    }, [debouncedKeyword, onSearch]);

    return (
        <View className="relative">
            <Ionicons name="search" size={20} color="#9CA3AF" style={{ position: "absolute", left: 16, top: 14, zIndex: 10 }} />
            <InputText
                value={keyword}
                onChangeText={setKeyword}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                className="h-12 rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-base"
            />
        </View>
    );
}
