import { useEffect, useRef } from "react";

type UseScrollEndOptions = {
    threshold?: number; // từ 0 đến 1
};

export default function useScrollToEnd<T extends HTMLElement = HTMLDivElement>(
    callback: () => void,
    options: UseScrollEndOptions = {}
) {
    const { threshold = 1 } = options;
    const ref = useRef<T>(null);
    const passedRef = useRef(false);
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            if (scrollHeight <= clientHeight) return;
            const progress = (scrollTop + clientHeight) / scrollHeight;
            if (progress >= threshold && !passedRef.current) {
                passedRef.current = true;
                callbackRef.current();
            }
            if (progress < threshold) {
                passedRef.current = false;
            }
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return ref;
}
