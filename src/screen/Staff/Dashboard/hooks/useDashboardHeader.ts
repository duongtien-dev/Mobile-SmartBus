import useAuthStore from "@/store/auth.store";
import useStaffShiftStore from "@/store/staffShift.store";
import { router } from "expo-router";

export function useDashboardHeader() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const resetUi = useStaffShiftStore((state) => state.resetUi);

    const displayName = user?.full_name?.trim() || "Nhân viên";

    const handleLogout = () => {
        resetUi();
        logout();
        router.replace("/login");
    };

    return { displayName, handleLogout };
}
