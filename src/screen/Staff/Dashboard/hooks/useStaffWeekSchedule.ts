import useFetch from "@/hooks/useFetch";
import type { IActiveShift } from "@/models/activeShift";
import type { IStaffScheduleItem } from "@/models/staffSchedule";
import { staffScheduleService } from "@/services/StaffScheduleService";
import { staffShiftService } from "@/services/StaffShiftService";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { useCheckInShift } from "./useCheckInShift";

export function useStaffWeekSchedule() {
    const { isCheckingIn, checkIn } = useCheckInShift();
    const [expandedId, setExpandedId] = useState("");

    const {
        data: scheduleItems,
        isLoading: loading,
        error,
        loadFetchFn: loadSchedule,
    } = useFetch<IStaffScheduleItem[]>({
        fetchFn: async () => {
            const response = await staffScheduleService.getMySchedule();
            return response.data?.items ?? [];
        },
    });

    const {
        data: activeShift,
        loadFetchFn: loadActiveShift,
    } = useFetch<IActiveShift | null>({
        fetchFn: async () => {
            const response = await staffShiftService.getActive();
            return response.data ?? null;
        },
    });

    const items = scheduleItems ?? [];
    const hasActiveShift = !!activeShift;

    const checkInLabel = useMemo(() => {
        if (hasActiveShift) return "Tiếp tục ca đang chạy";
        if (isCheckingIn) return "Đang check-in...";
        return "Check-in nhận ca";
    }, [hasActiveShift, isCheckingIn]);

    useFocusEffect(
        useCallback(() => {
            loadSchedule();
            loadActiveShift();
        }, [loadSchedule, loadActiveShift]),
    );

    useEffect(() => {
        if (!items.length) {
            setExpandedId("");
            return;
        }
        const preferred =
            items.find((item) => item.isToday)?._id ?? items[0]._id;
        setExpandedId((prev) =>
            prev && items.some((item) => item._id === prev) ? prev : preferred,
        );
    }, [items]);

    useEffect(() => {
        if (!error) return;
        Toast.show({
            type: "error",
            text1: "Không tải được lịch ca",
        });
    }, [error]);

    const toggleExpanded = (id: string) => {
        setExpandedId((prev) => (prev === id ? "" : id));
    };

    const handleCheckIn = (item: IStaffScheduleItem) =>
        checkIn({
            schedule: item,
            hasActiveShift,
            onSuccess: async () => {
                await Promise.all([loadSchedule(), loadActiveShift()]);
            },
        });

    return {
        items,
        loading,
        expandedId,
        checkInLabel,
        isCheckingIn,
        toggleExpanded,
        handleCheckIn,
    };
}
