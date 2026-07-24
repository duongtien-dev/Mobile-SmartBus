import { useCallback, useRef, useState } from "react";

type UseFetchProps<T> = {
    fetchFn: () => Promise<T>;
};

export default function useFetch<T>({ fetchFn }: UseFetchProps<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const fetchFnRef = useRef(fetchFn);
    fetchFnRef.current = fetchFn;

    const loadFetchFn = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetchFnRef.current();
            setData(response);
        } catch (err) {
            setError(err);
            setData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setIsLoading(false);
    }, []);

    return {
        data,
        isLoading,
        error,
        loadFetchFn,
        reset,
    };
}
