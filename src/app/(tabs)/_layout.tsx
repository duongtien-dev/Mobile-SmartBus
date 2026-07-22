import useAuthStore from "@/store/auth.store";
import { Redirect, Tabs } from "expo-router";

import { NavigationTabs } from "@/components/navigation";
import { TAB_CONFIG, TAB_ROUTES } from "@/constants/tabs";
import { ActivityIndicator, View } from "react-native";

export default function TabLayout() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-app-shell">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href="/login" />;
    }

    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <NavigationTabs {...props} />}
        >
            {TAB_ROUTES.map((name) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{ title: TAB_CONFIG[name].label }}
                />
            ))}
        </Tabs>
    );
}
