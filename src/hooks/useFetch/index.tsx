import { useCallback, useEffect, useState } from "react";

type UseFetchProps<T> = {
    fetchFn: () => Promise<T>;
};

export default function useFetch<T>({
    fetchFn,
}: UseFetchProps<T>) {

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleFetchFn = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetchFn();
            if( response)
            setData(response);
            return response;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        handleFetchFn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFn]);


    return {
        data,
        isLoading,
        error,
        refetch: handleFetchFn,
    };
}
