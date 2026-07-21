import useAuthStore from "@/store/auth.store";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import "../global.css";

export default function RootLayout() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!isAuthenticated && !inAuthGroup) {
            router.replace("/login");
            return;
        }

        if (isAuthenticated && inAuthGroup) {
            router.replace("/");
        }
    }, [isAuthenticated, isLoading, segments, router]);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator color="#005f8b" size="large" />
            </View>
        );
    }

    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(pages)" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(dev-demo)" />
            </Stack>
            <Toast />
        </>
    );
}
