import { useTranslation } from "@/i18n";
import { ActivityIndicator, Text, View } from "react-native";
import { useAssignedRoutes } from "./hooks/useAssignedRoutes";

export function AssignedRoutesSection() {
    const { t } = useTranslation();
    const { routes, loading } = useAssignedRoutes();

    return (
        <View className="gap-3">
            <Text className="text-base font-bold text-text-primary">
                {t("staff.routes.title")}
            </Text>
            {loading ? (
                <View className="items-center rounded-2xl bg-card py-6 shadow-sm">
                    <ActivityIndicator color="#005f8b" />
                </View>
            ) : routes.length === 0 ? (
                <View className="rounded-2xl bg-card px-4 py-5 shadow-sm">
                    <Text className="text-sm text-text-muted">
                        {t("staff.routes.empty")}
                    </Text>
                </View>
            ) : (
                <View className="gap-2">
                    {routes.map((route) => (
                        <View
                            key={route._id}
                            className="rounded-2xl bg-card px-4 py-3.5 shadow-sm"
                        >
                            <Text className="text-sm font-bold text-primary">
                                {route.code}
                            </Text>
                            <Text className="mt-0.5 text-sm text-text-primary">
                                {route.name}
                            </Text>
                            {route.startName || route.endName ? (
                                <Text className="mt-1 text-xs text-text-muted">
                                    {[route.startName, route.endName]
                                        .filter(Boolean)
                                        .join(" → ")}
                                </Text>
                            ) : null}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}
