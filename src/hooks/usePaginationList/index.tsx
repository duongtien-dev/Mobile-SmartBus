import { useRef, useState } from 'react';

type FetchFn<T, P> = (payload: P & { page: number; limit: number }) => Promise<T[]>;

type PaginationListProps<T, P extends object = {}> = {
    fetchFn: FetchFn<T, P>;
    limit: number;
    params: P;
};

export default function usePaginationList<T, P extends object = {}>({
    fetchFn,
    limit,
    params,
}: PaginationListProps<T, P>) {
    const [list, setList] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);

    const isFetchingFirstPage = useRef(false);

    const loadFirstPage = async () => {
        if (isFetchingFirstPage.current) return;

        isFetchingFirstPage.current = true;
        setIsSkeletonLoading(true);
        setPage(1);

        try {
            const data = await fetchFn({
                ...params,
                page: 1,
                limit,
            });

            setList(data);
            setIsLastPage(data.length < limit);

            return data;
        } finally {
            setIsSkeletonLoading(false);
            isFetchingFirstPage.current = false;
        }
    };

    const loadMore = async () => {
        if (isLoadingMore || isLastPage) return;

        const nextPage = page + 1;

        setIsLoadingMore(true);

        try {
            const data = await fetchFn({
                ...params,
                page: nextPage,
                limit,
            });

            setList((prev) => [...prev, ...data]);
            setPage(nextPage);
            setIsLastPage(data.length < limit);

            return data;
        } finally {
            setIsLoadingMore(false);
        }
    };

    return {
        list,
        setList,
        isSkeletonLoading,
        isLoadingMore,
        isLastPage,
        loadFirstPage,
        loadMore,
    };
}
