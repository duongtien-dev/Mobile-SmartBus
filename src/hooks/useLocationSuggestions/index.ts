import useFetch from "@/hooks/useFetch";
import type { ISuggestLocation } from "@/models/suggestLocation";
import { tripService } from "@/services/TripService";
import { useEffect, useState } from "react";

const DEFAULT_DEBOUNCE_MS = 400;
const BLUR_DELAY_MS = 200;

type Options = {
    debounceMs?: number;
};

/**
 * Shared debounce + suggest-locations fetch used by Home and Nearby search.
 */
export default function useLocationSuggestions(
    keyword: string,
    { debounceMs = DEFAULT_DEBOUNCE_MS }: Options = {},
) {
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
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [trimmedKeyword, debounceMs, loadFetchFn]);

    const suggestionList = suggestions ?? [];
    const showSuggestions =
        isFocused &&
        trimmedKeyword.length > 0 &&
        (isLoading || suggestionList.length > 0);

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), BLUR_DELAY_MS);
    };

    return {
        isFocused,
        setIsFocused,
        handleBlur,
        trimmedKeyword,
        suggestionList,
        isLoading,
        showSuggestions,
    };
}
