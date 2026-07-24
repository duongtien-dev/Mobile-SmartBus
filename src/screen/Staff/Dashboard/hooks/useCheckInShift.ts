import type { CheckInShiftBody } from "@/models/activeShift";
import type { IRoute } from "@/models/route";
import type { IStaffScheduleItem } from "@/models/staffSchedule";
import { staffShiftService } from "@/services/StaffShiftService";
import { router, type Href } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

type CheckInInput = {
    schedule?: IStaffScheduleItem | null;
    fallbackRoute?: IRoute | null;
    /** true nếu UI đã biết đang có ca active */
    hasActiveShift?: boolean;
    onSuccess?: () => void | Promise<void>;
};

function buildCheckInBody(
    schedule?: IStaffScheduleItem | null,
    fallbackRoute?: IRoute | null,
): CheckInShiftBody {
    if (schedule) {
        return {
            scheduleId: schedule._id,
            routeId: schedule.routeId ?? undefined,
            routeName: schedule.routeName || undefined,
            routeCode: schedule.routeCode || undefined,
        };
    }

    return {
        routeId: fallbackRoute?._id,
        routeName: fallbackRoute
            ? `${fallbackRoute.code} - ${fallbackRoute.name}`
            : undefined,
        routeCode: fallbackRoute?.code,
    };
}

/** Check-in / tiếp tục ca — dùng chung banner + lịch ca. */
export function useCheckInShift() {
    const [isCheckingIn, setIsCheckingIn] = useState(false);

    const checkIn = async ({
        schedule,
        fallbackRoute,
        hasActiveShift = false,
        onSuccess,
    }: CheckInInput = {}) => {
        if (hasActiveShift) {
            router.push("/staff/shift" as Href);
            return;
        }
        if (isCheckingIn) return;

        setIsCheckingIn(true);
        try {
            const response = await staffShiftService.checkIn(
                buildCheckInBody(schedule, fallbackRoute),
            );

            if (!response.data) {
                throw new Error(response.message || "Check-in thất bại");
            }

            const routeLabel =
                schedule?.routeCode || fallbackRoute?.code || null;

            Toast.show({
                type: "success",
                text1: "Đã check-in nhận ca",
                text2: routeLabel
                    ? `Tuyến ${routeLabel}`
                    : "Chưa gán tuyến — vẫn có thể quét vé",
            });

            await onSuccess?.();
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

    return { isCheckingIn, checkIn };
}
