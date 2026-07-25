import { translate } from "@/i18n/translations";
import useFetch from "@/hooks/useFetch";
import type { IRoute } from "@/models/route";
import { routeService } from "@/services/RouteService";
import useAuthStore from "@/store/auth.store";
import useLocaleStore from "@/store/locale.store";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export function useAssignedRoutes() {
    const userId = useAuthStore((state) => state.user?._id);
    const locale = useLocaleStore((state) => state.locale);

    const {
        data: assignedRoutes,
        isLoading: loading,
        error,
        loadFetchFn: loadRoutes,
    } = useFetch<IRoute[]>({
        fetchFn: async () => {
            const response = await routeService.getRoutes({
                page: 1,
                limit: 20,
                sort: "newest",
                staffId: userId,
            });
            return response.data ?? [];
        },
    });

    useEffect(() => {
        loadRoutes();
    }, [userId]);

    useEffect(() => {
        if (!error) return;
        Toast.show({
            type: "error",
            text1: translate(locale, "staff.routes.loadFail"),
        });
    }, [error, locale]);

    return {
        routes: assignedRoutes ?? [],
        loading,
    };
}
