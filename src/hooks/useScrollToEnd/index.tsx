import { useCallback, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

type UseScrollEndOptions = {
    threshold?: number; // từ 0 đến 1
};

export default function useScrollToEnd(
    callback: () => void,
    options: UseScrollEndOptions = {}
) {
    const { threshold = 1 } = options;
    const passedRef = useRef(false);
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    const onScroll = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;

            if (contentSize.height <= layoutMeasurement.height) return;

            const progress =
                (contentOffset.y + layoutMeasurement.height) / contentSize.height;

            if (progress >= threshold && !passedRef.current) {
                passedRef.current = true;
                callbackRef.current();
            }
            if (progress < threshold) {
                passedRef.current = false;
            }
        },
        [threshold]
    );

    return onScroll;
}
