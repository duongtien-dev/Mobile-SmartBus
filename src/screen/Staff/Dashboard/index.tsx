import { StaffHeader } from "@/components/StaffHeader";
import {
    STAFF_SCHEDULE_MOCK,
    type StaffScheduleShift,
} from "@/constants/staff";
import type { IRoute } from "@/models/route";
import { routeService } from "@/services/RouteService";
import useAuthStore from "@/store/auth.store";
import useStaffShiftStore from "@/store/staffShift.store";
import { getApiErrorMessage } from "@/utils/apiError";
import { router, type Href } from "expo-router";
import {
    Bell,
    BookOpen,
    Bus,
    CalendarDays,
    ChevronDown,
    ChevronUp,
    LogOut,
    UserRound,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

function getRouteStaffId(route: IRoute): string | undefined {
    if (!route.staffId) return undefined;
    if (typeof route.staffId === "string") return route.staffId;
    return route.staffId._id;
}

function UtilityCard({
    label,
    iconColor,
    iconBgClass,
    Icon,
    onPress,
}: {
    label: string;
    iconColor: string;
    iconBgClass: string;
    Icon: typeof CalendarDays;
    onPress: () => void;
}) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            className="flex-1 items-center justify-center rounded-2xl bg-card px-3 py-5 shadow-sm active:opacity-90"
        >
            <View
                className={`mb-3 h-12 w-12 items-center justify-center rounded-xl ${iconBgClass}`}
            >
                <Icon color={iconColor} size={26} />
            </View>
            <Text className="text-center text-sm font-semibold text-text-primary">
                {label}
            </Text>
        </Pressable>
    );
}

function ShiftDetailRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <View className="flex-row items-start justify-between gap-3 py-1.5">
            <Text className="text-sm text-text-muted">{label}</Text>
            <Text className="flex-1 text-right text-sm font-medium text-text-primary">
                {value}
            </Text>
        </View>
    );
}

function ExpandableShiftCard({
    shift,
    expanded,
    onToggle,
    onCheckIn,
    checkInLabel,
}: {
    shift: StaffScheduleShift;
    expanded: boolean;
    onToggle: () => void;
    onCheckIn: () => void;
    checkInLabel: string;
}) {
    const Chevron = expanded ? ChevronUp : ChevronDown;

    return (
        <View className="overflow-hidden rounded-2xl bg-card shadow-sm">
            <Pressable
                accessibilityRole="button"
                onPress={onToggle}
                className="flex-row items-center gap-3 px-4 py-3.5 active:opacity-90"
            >
                <Bus
                    color={shift.isToday ? "#00a2e8" : "#64748b"}
                    size={20}
                />
                <View className="flex-1 flex-row flex-wrap items-center gap-x-2">
                    <Text
                        className={`text-sm font-bold ${
                            shift.isToday
                                ? "text-accent"
                                : "text-text-primary"
                        }`}
                    >
                        {shift.dateLabel}
                    </Text>
                    <Text className="text-sm text-text-secondary">
                        {shift.period} ({shift.timeRange})
                    </Text>
                </View>
                <Chevron color="#64748b" size={18} />
            </Pressable>

            {expanded ? (
                <View className="border-t border-border bg-surface px-4 pb-4 pt-3">
                    <ShiftDetailRow label="Tuyến xe" value={shift.routeName} />
                    <ShiftDetailRow
                        label="Biển số xe"
                        value={shift.plateNumber}
                    />
                    <ShiftDetailRow
                        label="Trạng thái"
                        value={shift.statusLabel}
                    />

                    {shift.isToday ? (
                        <Pressable
                            accessibilityRole="button"
                            onPress={onCheckIn}
                            className="mt-4 items-center rounded-xl bg-[#22c55e] px-4 py-3.5 active:opacity-90"
                        >
                            <Text className="text-sm font-bold uppercase tracking-wide text-white">
                                {checkInLabel}
                            </Text>
                        </Pressable>
                    ) : null}
                </View>
            ) : null}
        </View>
    );
}

export default function StaffDashboardScreen() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const session = useStaffShiftStore((state) => state.session);
    const startShift = useStaffShiftStore((state) => state.startShift);

    const [expandedId, setExpandedId] = useState<string>(
        STAFF_SCHEDULE_MOCK[0]?.id ?? "",
    );
    const [assignedRoutes, setAssignedRoutes] = useState<IRoute[]>([]);
    const [loadingRoutes, setLoadingRoutes] = useState(true);

    const displayName = user?.full_name?.trim() || "Nhân viên";

    const primaryRoute = useMemo(
        () => assignedRoutes[0] ?? null,
        [assignedRoutes],
    );

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoadingRoutes(true);
            try {
                const response = await routeService.getRoutes({
                    page: 1,
                    limit: 20,
                    sort: "newest",
                });
                const routes = Array.isArray(response.data)
                    ? (response.data as IRoute[])
                    : [];
                const mine = routes.filter(
                    (route) => getRouteStaffId(route) === user?._id,
                );
                if (!cancelled) {
                    setAssignedRoutes(mine);
                }
            } catch (err) {
                if (!cancelled) {
                    Toast.show({
                        type: "error",
                        text1: "Không tải được tuyến được giao",
                        text2: getApiErrorMessage(err),
                    });
                }
            } finally {
                if (!cancelled) setLoadingRoutes(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [user?._id]);

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    const handleCheckIn = () => {
        if (session) {
            router.push("/staff/shift" as Href);
            return;
        }

        startShift({
            routeId: primaryRoute?._id,
            routeName: primaryRoute
                ? `${primaryRoute.code} - ${primaryRoute.name}`
                : undefined,
            routeCode: primaryRoute?.code,
        });

        Toast.show({
            type: "success",
            text1: "Đã check-in nhận ca",
            text2: primaryRoute
                ? `Tuyến ${primaryRoute.code}`
                : "Chưa gán tuyến — vẫn có thể quét vé",
        });

        router.push("/staff/shift" as Href);
    };

    return (
        <View className="flex-1 bg-app-shell">
            <StaffHeader>
                <View className="flex-row items-center justify-between gap-3">
                    <View className="min-w-0 flex-1 flex-row items-center gap-3">
                        <View className="h-11 w-11 items-center justify-center rounded-full bg-white/20">
                            <UserRound color="#ffffff" size={22} />
                        </View>
                        <View className="min-w-0 flex-1">
                            <Text className="text-sm text-white/85">
                                Xin chào,
                            </Text>
                            <Text
                                className="text-base font-bold text-on-primary"
                                numberOfLines={1}
                            >
                                {displayName}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-center">
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Thông báo"
                            className="relative h-10 w-10 items-center justify-center active:opacity-80"
                            onPress={() =>
                                router.push("/staff/notifications" as Href)
                            }
                            hitSlop={6}
                        >
                            <Bell color="#ffc20e" size={22} />
                        </Pressable>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Đăng xuất"
                            className="h-10 w-10 items-center justify-center active:opacity-80"
                            onPress={handleLogout}
                            hitSlop={6}
                        >
                            <LogOut color="#ffffff" size={22} />
                        </Pressable>
                    </View>
                </View>
            </StaffHeader>

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-5 px-4 py-5 pb-10"
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-3">
                    <Text className="text-base font-bold text-text-primary">
                        Tiện ích
                    </Text>
                    <View className="flex-row gap-3">
                        <UtilityCard
                            label="Xin nghỉ"
                            Icon={CalendarDays}
                            iconColor="#cca010"
                            iconBgClass="bg-highlight-light"
                            onPress={() =>
                                router.push("/staff/leave-request" as Href)
                            }
                        />
                        <UtilityCard
                            label="Lịch sử ca"
                            Icon={BookOpen}
                            iconColor="#00a2e8"
                            iconBgClass="bg-accent-light"
                            onPress={() =>
                                router.push("/staff/shift-history" as Href)
                            }
                        />
                    </View>
                </View>

                <View className="gap-3">
                    <Text className="text-base font-bold text-text-primary">
                        Tuyến được giao
                    </Text>
                    {loadingRoutes ? (
                        <View className="items-center rounded-2xl bg-card py-6 shadow-sm">
                            <ActivityIndicator color="#005f8b" />
                        </View>
                    ) : assignedRoutes.length === 0 ? (
                        <View className="rounded-2xl bg-card px-4 py-5 shadow-sm">
                            <Text className="text-sm text-text-muted">
                                Chưa được gán tuyến. Vẫn có thể check-in và quét
                                vé; điểm dừng sẽ trống.
                            </Text>
                        </View>
                    ) : (
                        <View className="gap-2">
                            {assignedRoutes.map((route) => (
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

                <View className="gap-3">
                    <Text className="text-base font-bold text-text-primary">
                        Lịch làm việc tuần này
                    </Text>
                    <Text className="text-xs text-text-muted">
                        Lịch ca chưa có API — UI tạm. Check-in lưu phiên local và
                        gọi báo cáo ca khi kết thúc.
                    </Text>
                    <View className="gap-2.5">
                        {STAFF_SCHEDULE_MOCK.map((shift) => (
                            <ExpandableShiftCard
                                key={shift.id}
                                shift={shift}
                                expanded={expandedId === shift.id}
                                onToggle={() =>
                                    setExpandedId((prev) =>
                                        prev === shift.id ? "" : shift.id,
                                    )
                                }
                                onCheckIn={handleCheckIn}
                                checkInLabel={
                                    session
                                        ? "Tiếp tục ca đang chạy"
                                        : "Check-in nhận ca"
                                }
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
