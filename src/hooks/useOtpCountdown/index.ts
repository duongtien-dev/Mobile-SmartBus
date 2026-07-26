import { useCallback, useEffect, useState } from "react";

export const OTP_LENGTH = 6;

export function formatOtpTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

export function sanitizeOtpInput(text: string, length = OTP_LENGTH) {
    return text.replace(/\D/g, "").slice(0, length);
}

export default function useOtpCountdown(initialSeconds: number) {
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (remainingSeconds <= 0) return;

        const timer = setInterval(() => {
            setRemainingSeconds((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingSeconds]);

    const reset = useCallback(
        (seconds = initialSeconds) => {
            setRemainingSeconds(seconds);
        },
        [initialSeconds],
    );

    return {
        remainingSeconds,
        formatted: formatOtpTime(remainingSeconds),
        isExpired: remainingSeconds <= 0,
        reset,
        setRemainingSeconds,
    };
}
