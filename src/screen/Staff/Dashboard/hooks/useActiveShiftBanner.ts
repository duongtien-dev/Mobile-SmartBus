import useFetch from "@/hooks/useFetch";
import type { IActiveShift } from "@/models/activeShift";
import type { IRoute } from "@/models/route";
import { routeService } from "@/services/RouteService";
import { scanLogService } from "@/services/ScanLogService";
import { staffScheduleService } from "@/services/StaffScheduleService";
import { staffShiftService } from "@/services/StaffShiftService";
import useAuthStore from "@/store/auth.store";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { useCheckInShift } from "./useCheckInShift";

export function useActiveShiftBanner() {
    const userId = useAuthStore((state) => state.user?._id);
    const { isCheckingIn, checkIn } = useCheckInShift();

    const {
        data: activeShift,
        isLoading: loadingActiveShift,
        loadFetchFn: loadActiveShift,
    } = useFetch<IActiveShift | null>({
        fetchFn: async () => {
            const response = await staffShiftService.getActive();
            return response.data ?? null;
        },
    });

    const {
        data: activeScanTotal,
        loadFetchFn: loadActiveScanTotal,
    } = useFetch<number>({
        fetchFn: async () => {
            if (!activeShift?.shiftStartAt) return 0;
            const response = await scanLogService.getMyScans({
                from: activeShift.shiftStartAt,
                limit: 1,
            });
            return response.data?.total ?? 0;
        },
    });

    const {
        data: routes,
        loadFetchFn: loadRoutes,
    } = useFetch<IRoute[]>({
        fetchFn: async () => {
            const response = await routeService.getRoutes({
                page: 1,
                limit: 1,
                sort: "newest",
                staffId: userId,
            });
            return response.data ?? [];
        },
    });

    const primaryRoute = useMemo(() => routes?.[0] ?? null, [routes]);
    const hasActiveShift = !!activeShift;

    useFocusEffect(
        useCallback(() => {
            loadActiveShift();
            loadRoutes();
        }, [loadActiveShift, loadRoutes]),
    );

    useEffect(() => {
        if (!activeShift?.shiftStartAt) return;
        loadActiveScanTotal();
    }, [activeShift?.shiftStartAt, activeShift?._id]);

    useFocusEffect(
        useCallback(() => {
            if (!activeShift?.shiftStartAt) return;
            loadActiveScanTotal();
        }, [activeShift?.shiftStartAt, loadActiveScanTotal]),
    );

    const handleCheckIn = async () => {
        if (hasActiveShift) {
            await checkIn({ hasActiveShift: true });
            return;
        }

        const scheduleRes = await staffScheduleService.getMySchedule();
        const todaySchedule =
            scheduleRes.data?.items.find((item: any) => item.isToday) ?? null;

        await checkIn({
            schedule: todaySchedule,
            fallbackRoute: primaryRoute,
            onSuccess: loadActiveShift,
        });
    };

    return {
        loading: loadingActiveShift,
        hasActiveShift,
        activeShift,
        scanTotal: activeScanTotal ?? 0,
        primaryRoute,
        isCheckingIn,
        handleCheckIn,
    };
}
