import { useCallback, useState } from "react";

type UseFetchProps<T> = {
    fetchFn: () => Promise<T>;
};

export default function useFetch<T>({ fetchFn }: UseFetchProps<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const loadFetchFn = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            // Lấy dữ liệu từ hàm fetchFn
            const response = await fetchFn();
            setData(response);
        } catch (error) {
            setError(error);
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
