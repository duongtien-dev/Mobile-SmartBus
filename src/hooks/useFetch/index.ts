import { useState } from "react";

type UseFetchProps<T> = {
    fetchFn: () => Promise<T>;
};

export default function useFetch<T>({ fetchFn }: UseFetchProps<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadFetchFn = async () => {
        try {
            setIsLoading(true);
            const response = await fetchFn();
            setData(response);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        isLoading,
        loadFetchFn,
    };
}
