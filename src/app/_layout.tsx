import { usePushNotifications } from "@/hooks/usePushNotifications";
import useLocaleStore from "@/store/locale.store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ChatWidget } from "@/components/Chat/ChatWidget";
import useLocaleStore from "@/store/locale.store";
import "../global.css";

export default function RootLayout() {
    const hydrateLocale = useLocaleStore((state) => state.hydrate);
    usePushNotifications();

    useEffect(() => {
        void hydrateLocale();
    }, [hydrateLocale]);

    return (
        <SafeAreaProvider>
            {/* Dùng style thay className — NativeWind có thể ghi đè padding safe-area */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: "#f5f7fa" }}
                edges={["top", "left", "right"]}
            >
                <StatusBar style="dark" />
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="(pages)" />
                    <Stack.Screen name="staff" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(dev-demo)" />
                </Stack>
                <ChatWidget />
                <Toast />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
