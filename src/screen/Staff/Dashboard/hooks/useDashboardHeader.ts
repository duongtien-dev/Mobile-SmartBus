import { translate } from "@/i18n/translations";
import useAuthStore from "@/store/auth.store";
import useLocaleStore from "@/store/locale.store";
import useStaffShiftStore from "@/store/staffShift.store";
import { router } from "expo-router";

export function useDashboardHeader() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const resetUi = useStaffShiftStore((state) => state.resetUi);
    const locale = useLocaleStore((state) => state.locale);

    const displayName =
        user?.full_name?.trim() ||
        translate(locale, "staff.roleFallback");

    const handleLogout = () => {
        resetUi();
        logout();
        router.replace("/login");
    };

    return { displayName, handleLogout };
}
