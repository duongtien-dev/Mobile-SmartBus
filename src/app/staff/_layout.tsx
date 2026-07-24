import useAuthStore from "@/store/auth.store";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

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

    return <Stack screenOptions={{ headerShown: false }} />;
}
