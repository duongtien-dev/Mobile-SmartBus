import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(pages)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(dev-demo)" />
        </Stack>
    );
}
