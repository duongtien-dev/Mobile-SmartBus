import { translate } from "@/i18n/translations";
import type { CheckInShiftBody } from "@/models/activeShift";
import type { IRoute } from "@/models/route";
import type { IStaffScheduleItem } from "@/models/staffSchedule";
import { staffShiftService } from "@/services/StaffShiftService";
import useLocaleStore from "@/store/locale.store";
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
        const locale = useLocaleStore.getState().locale;

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
                throw new Error(
                    response.message || translate(locale, "staff.checkIn.fail"),
                );
            }

            const routeLabel =
                schedule?.routeCode || fallbackRoute?.code || null;

            Toast.show({
                type: "success",
                text1: translate(locale, "staff.checkIn.success"),
                text2: routeLabel
                    ? translate(locale, "staff.routeNamed", {
                          code: routeLabel,
                      })
                    : translate(locale, "staff.checkIn.noRoute"),
            });

            await onSuccess?.();
            router.push("/staff/shift" as Href);
        } catch {
            Toast.show({
                type: "error",
                text1: translate(locale, "staff.checkIn.fail"),
            });
        } finally {
            setIsCheckingIn(false);
        }
    };

    return { isCheckingIn, checkIn };
}
