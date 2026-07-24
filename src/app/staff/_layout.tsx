import useAuthStore from "@/store/auth.store";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

/**
 * Staff = Hub + Stack (không bottom tabs).
 * Home `/staff` là hub; các màn phụ push: shift, leave-request,
 * activity-history, notifications. Ca đang chạy full-screen, không tab bar.
 */
export default function StaffLayout() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    const user = useAuthStore((state) => state.user);

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

    if (user?.role && user.role !== "staff") {
        return <Redirect href="/" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="shift" />
            <Stack.Screen name="leave-request" />
            <Stack.Screen name="activity-history" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="shift-history" />
        </Stack>
    );
}
