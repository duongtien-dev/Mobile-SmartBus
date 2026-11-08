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

    const [result, setResult] = useState<{
        keyword: string;
        data: ISuggestLocation[];
        isLoading: boolean;
        hasError: boolean;
    }>({ keyword: "", data: [], isLoading: false, hasError: false });

    useEffect(() => {
        if (!trimmedKeyword || !isFocused) return;

        let active = true;
        const timer = setTimeout(() => {
            setResult({ keyword: trimmedKeyword, data: [], isLoading: true, hasError: false });
            tripService.suggestLocations({ keyword: trimmedKeyword })
                .then((response) => {
                    if (!response.success) throw new Error(response.message);
                    if (active) {
                        setResult({ keyword: trimmedKeyword, data: response.data ?? [], isLoading: false, hasError: false });
                    }
                })
                .catch(() => {
                    if (active) {
                        setResult({ keyword: trimmedKeyword, data: [], isLoading: false, hasError: true });
                    }
                });
        }, debounceMs);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [trimmedKeyword, debounceMs, isFocused]);

    const isCurrent = result.keyword === trimmedKeyword && trimmedKeyword.length > 0;
    const suggestionList = isCurrent ? result.data : [];
    const isLoading = isCurrent && result.isLoading;
    const hasError = isCurrent && result.hasError;
    const showSuggestions =
        isFocused &&
        trimmedKeyword.length > 0 &&
        (isLoading || hasError || suggestionList.length > 0);

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
        hasError,
        showSuggestions,
    };
}
