import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import "../global.css";

export default function RootLayout() {
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
