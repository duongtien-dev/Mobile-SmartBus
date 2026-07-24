import useAuthStore from "@/store/auth.store";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

/**
 * Staff route group — UI-first.
 * Redirect theo role sau login sẽ gắn khi wire auth flow.
 */
export default function StaffLayout() {
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

    return <Stack screenOptions={{ headerShown: false }} />;
}
