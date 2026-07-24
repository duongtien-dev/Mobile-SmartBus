import type { CheckInShiftBody, IActiveShift } from "@/models/activeShift";
import type { IRoute } from "@/models/route";
import type { IStaffScheduleItem } from "@/models/staffSchedule";
import useFetch from "@/hooks/useFetch";
import { routeService } from "@/services/RouteService";
import { scanLogService } from "@/services/ScanLogService";
import { staffScheduleService } from "@/services/StaffScheduleService";
import { staffShiftService } from "@/services/StaffShiftService";
import useAuthStore from "@/store/auth.store";
import useStaffShiftStore from "@/store/staffShift.store";
import { router, useFocusEffect, type Href } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import Toast from "react-native-toast-message";

export function useStaffDashboard() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const resetUi = useStaffShiftStore((state) => state.resetUi);

    const [expandedId, setExpandedId] = useState("");
    const [isCheckingIn, setIsCheckingIn] = useState(false);

    const {
        data: assignedRoutes,
        isLoading: loadingRoutes,
        error: routesError,
        loadFetchFn: loadAssignedRoutes,
    } = useFetch<IRoute[]>({
        fetchFn: async () => {
            const response = await routeService.getRoutes({
                page: 1,
                limit: 20,
                sort: "newest",
                userId: user?._id,
            });
            return response.data ?? [];
        },
    });

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
        data: scheduleItems,
        isLoading: loadingSchedule,
        error: scheduleError,
        loadFetchFn: loadSchedule,
    } = useFetch<IStaffScheduleItem[]>({
        fetchFn: async () => {
            const response = await staffScheduleService.getMySchedule();
            return response.data?.items ?? [];
        },
    });

    const displayName = user?.full_name?.trim() || "Nhân viên";
    const routes = assignedRoutes ?? [];
    const schedules = scheduleItems ?? [];
    const primaryRoute = useMemo(() => routes[0] ?? null, [routes]);
    const todaySchedule = useMemo(
        () => schedules.find((item) => item.isToday) ?? null,
        [schedules],
    );
    const hasActiveShift = !!activeShift;

    useEffect(() => {
        loadAssignedRoutes();
    }, [user?._id]);

    useFocusEffect(
        useCallback(() => {
            loadActiveShift();
            loadSchedule();
        }, [loadActiveShift, loadSchedule]),
    );

    useEffect(() => {
        if (activeShift?.shiftStartAt) {
            loadActiveScanTotal();
        }
    }, [activeShift?.shiftStartAt, activeShift?._id]);

    useFocusEffect(
        useCallback(() => {
            if (!activeShift?.shiftStartAt) return;
            loadActiveScanTotal();
        }, [activeShift?.shiftStartAt, loadActiveScanTotal]),
    );

    useEffect(() => {
        if (!schedules.length) {
            setExpandedId("");
            return;
        }
        const preferred =
            schedules.find((item) => item.isToday)?._id ?? schedules[0]._id;
        setExpandedId((prev) =>
            prev && schedules.some((item) => item._id === prev)
                ? prev
                : preferred,
        );
    }, [schedules]);

    useEffect(() => {
        if (!routesError) return;
        Toast.show({
            type: "error",
            text1: "Không tải được tuyến được giao",
        });
    }, [routesError]);

    useEffect(() => {
        if (!scheduleError) return;
        Toast.show({
            type: "error",
            text1: "Không tải được lịch ca",
        });
    }, [scheduleError]);

    const handleLogout = () => {
        resetUi();
        logout();
        router.replace("/login");
    };

    const buildCheckInBody = (
        schedule?: IStaffScheduleItem | null,
    ): CheckInShiftBody => {
        if (schedule) {
            return {
                scheduleId: schedule._id,
                routeId: schedule.routeId ?? undefined,
                routeName: schedule.routeName || undefined,
                routeCode: schedule.routeCode || undefined,
            };
        }

        return {
            routeId: primaryRoute?._id,
            routeName: primaryRoute
                ? `${primaryRoute.code} - ${primaryRoute.name}`
                : undefined,
            routeCode: primaryRoute?.code,
        };
    };

    const handleCheckIn = async (schedule?: IStaffScheduleItem | null) => {
        if (hasActiveShift) {
            router.push("/staff/shift" as Href);
            return;
        }
        if (isCheckingIn) return;

        const target = schedule ?? todaySchedule;
        setIsCheckingIn(true);
        try {
            const response = await staffShiftService.checkIn(
                buildCheckInBody(target),
            );

            if (!response.data) {
                throw new Error(response.message || "Check-in thất bại");
            }

            const routeLabel =
                target?.routeCode || primaryRoute?.code || null;

            Toast.show({
                type: "success",
                text1: "Đã check-in nhận ca",
                text2: routeLabel
                    ? `Tuyến ${routeLabel}`
                    : "Chưa gán tuyến — vẫn có thể quét vé",
            });

            await Promise.all([loadActiveShift(), loadSchedule()]);
            router.push("/staff/shift" as Href);
        } catch {
            Toast.show({
                type: "error",
                text1: "Check-in thất bại",
            });
        } finally {
            setIsCheckingIn(false);
        }
    };

    const toggleExpanded = (id: string) => {
        setExpandedId((prev) => (prev === id ? "" : id));
    };

    const checkInLabel = hasActiveShift
        ? "Tiếp tục ca đang chạy"
        : isCheckingIn
          ? "Đang check-in..."
          : "Check-in nhận ca";

    return {
        displayName,
        routes,
        loadingRoutes,
        schedules,
        loadingSchedule,
        activeShift,
        loadingActiveShift,
        activeScanTotal: activeScanTotal ?? 0,
        hasActiveShift,
        primaryRoute,
        isCheckingIn,
        expandedId,
        checkInLabel,
        handleLogout,
        handleCheckIn,
        toggleExpanded,
    };
}
