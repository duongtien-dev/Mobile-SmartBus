import { notifyService } from "@/services/NotifyService";
import useAuthStore from "@/store/auth.store";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";

/** SDK 53+: remote push đã bị gỡ khỏi Expo Go — không import module trên Go */
const isExpoGo =
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient ||
    Constants.appOwnership === "expo";

type NotificationsModule = typeof import("expo-notifications");

let notificationsModule: NotificationsModule | null = null;
let handlerConfigured = false;

async function loadNotifications(): Promise<NotificationsModule | null> {
    if (isExpoGo || Platform.OS === "web") return null;
    if (notificationsModule) return notificationsModule;

    notificationsModule = await import("expo-notifications");

    if (!handlerConfigured) {
        notificationsModule.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowBanner: true,
                shouldShowList: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
        handlerConfigured = true;
    }

    return notificationsModule;
}

async function registerExpoPushToken(): Promise<string | null> {
    const Notifications = await loadNotifications();
    if (!Notifications) return null;

    const permissions = await Notifications.getPermissionsAsync();
    let status = permissions.status;
    if (status !== "granted") {
        const requested = await Notifications.requestPermissionsAsync();
        status = requested.status;
    }
    if (status !== "granted") return null;

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.DEFAULT,
        });
    }

    const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;

    const tokenResponse = projectId
        ? await Notifications.getExpoPushTokenAsync({ projectId })
        : await Notifications.getExpoPushTokenAsync();

    return tokenResponse.data || null;
}

/**
 * Đăng ký Expo push token khi đã login.
 * Trên Expo Go: no-op (test live map / ETA / subscription API vẫn OK).
 * Push thật cần development build / production build.
 */
export function usePushNotifications() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const token = useAuthStore((s) => s.token);
    const lastRegistered = useRef<string | null>(null);

    useEffect(() => {
        if (isExpoGo || Platform.OS === "web") return;

        if (!isAuthenticated || !token) {
            lastRegistered.current = null;
            return;
        }

        let cancelled = false;

        const run = async () => {
            try {
                const pushToken = await registerExpoPushToken();
                if (!pushToken || cancelled) return;
                if (lastRegistered.current === pushToken) return;

                await notifyService.registerDevice({
                    token: pushToken,
                    platform: "expo",
                });
                lastRegistered.current = pushToken;
            } catch {
                // Quyền từ chối / thiếu projectId — bỏ qua
            }
        };

        void run();
        return () => {
            cancelled = true;
        };
    }, [isAuthenticated, token]);
}
