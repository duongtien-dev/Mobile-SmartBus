import { StaffHeader } from "@/components/StaffHeader";
import {
    STAFF_SCHEDULE_MOCK,
    type StaffScheduleShift,
} from "@/constants/staff";
import useFetch from "@/hooks/useFetch";
import type { IRoute } from "@/models/route";
import { routeService } from "@/services/RouteService";
import useAuthStore from "@/store/auth.store";
import useStaffShiftStore from "@/store/staffShift.store";
import { router, type Href } from "expo-router";
import {
    Bell,
    Bus,
    CalendarDays,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    ClipboardList,
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

function UtilityRow({
    title,
    subtitle,
    iconColor,
    iconBgClass,
    Icon,
    onPress,
    isLast = false,
}: {
    title: string;
    subtitle: string;
    iconColor: string;
    iconBgClass: string;
    Icon: typeof CalendarDays;
    onPress: () => void;
    isLast?: boolean;
}) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            className={`flex-row items-center gap-3 px-4 py-3.5 active:bg-surface ${
                isLast ? "" : "border-b border-border"
            }`}
        >
            <View
                className={`h-11 w-11 items-center justify-center rounded-full ${iconBgClass}`}
            >
                <Icon color={iconColor} size={22} />
            </View>
            <View className="min-w-0 flex-1">
                <Text className="text-[15px] font-semibold text-text-primary">
                    {title}
                </Text>
                <Text
                    className="mt-0.5 text-xs text-text-muted"
                    numberOfLines={1}
                >
                    {subtitle}
                </Text>
            </View>
            <ChevronRight color="#94a3b8" size={18} />
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

    const {
        data: assignedRoutes,
        isLoading: loadingRoutes,
        error: routesError,
        loadFetchFn: loadAssignedRoutes,
    } = useFetch<IRoute[]>({
        fetchFn: async () => {
            const response = await routeService.getRoutes({
                page: 1,
                limit: 20,
                sort: "newest",
                userId: user?._id,
            });
            return response.data ?? [];
        },
    });

    const displayName = user?.full_name?.trim() || "Nhân viên";
    const routes = assignedRoutes ?? [];
    const primaryRoute = useMemo(() => routes[0] ?? null, [routes]);

    useEffect(() => {
        loadAssignedRoutes();
    }, [user?._id]);

    useEffect(() => {
        if (!routesError) return;
        Toast.show({
            type: "error",
            text1: "Không tải được tuyến được giao",
        });
    }, [routesError]);

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
                {session ? (
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => router.push("/staff/shift" as Href)}
                        className="flex-row items-center gap-3 rounded-2xl bg-primary px-4 py-3.5 active:opacity-90"
                    >
                        <View className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
                            <Bus color="#ffffff" size={20} />
                        </View>
                        <View className="min-w-0 flex-1">
                            <Text className="text-sm font-bold text-on-primary">
                                Ca đang chạy
                            </Text>
                            <Text className="mt-0.5 text-xs text-white/80">
                                Đã quét {session.scanLogs.length} vé
                                {session.routeCode
                                    ? ` · ${session.routeCode}`
                                    : ""}
                                {" · Chạm để tiếp tục"}
                            </Text>
                        </View>
                        <ChevronRight color="#ffffff" size={18} />
                    </Pressable>
                ) : (
                    <Pressable
                        accessibilityRole="button"
                        onPress={handleCheckIn}
                        className="flex-row items-center gap-3 rounded-2xl bg-[#22c55e] px-4 py-3.5 active:opacity-90"
                    >
                        <View className="h-10 w-10 items-center justify-center rounded-full bg-white/25">
                            <Bus color="#ffffff" size={20} />
                        </View>
                        <View className="min-w-0 flex-1">
                            <Text className="text-sm font-bold text-white">
                                Nhận ca hôm nay
                            </Text>
                            <Text className="mt-0.5 text-xs text-white/90">
                                {primaryRoute
                                    ? `Tuyến ${primaryRoute.code} · Check-in để bắt đầu`
                                    : "Check-in để quét vé và chạy ca"}
                            </Text>
                        </View>
                        <ChevronRight color="#ffffff" size={18} />
                    </Pressable>
                )}

                <View className="gap-3">
                    <View>
                        <Text className="text-base font-bold text-text-primary">
                            Tiện ích
                        </Text>
                        <Text className="mt-0.5 text-xs text-text-muted">
                            Các chức năng phụ — mở từ trang chủ này
                        </Text>
                    </View>
                    <View className="overflow-hidden rounded-2xl bg-card shadow-sm">
                        <UtilityRow
                            title="Xin nghỉ"
                            subtitle="Gửi yêu cầu nghỉ phép"
                            Icon={CalendarDays}
                            iconColor="#cca010"
                            iconBgClass="bg-highlight-light"
                            onPress={() =>
                                router.push("/staff/leave-request" as Href)
                            }
                        />
                        <UtilityRow
                            title="Lịch sử hoạt động"
                            subtitle="Báo cáo ca và đơn xin nghỉ"
                            Icon={ClipboardList}
                            iconColor="#005f8b"
                            iconBgClass="bg-primary-light"
                            isLast
                            onPress={() =>
                                router.push(
                                    "/staff/activity-history" as Href,
                                )
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
                    ) : routes.length === 0 ? (
                        <View className="rounded-2xl bg-card px-4 py-5 shadow-sm">
                            <Text className="text-sm text-text-muted">
                                Chưa được gán tuyến. Vẫn có thể nhận ca và quét
                                vé; điểm dừng sẽ trống.
                            </Text>
                        </View>
                    ) : (
                        <View className="gap-2">
                            {routes.map((route) => (
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
                    <View>
                        <Text className="text-base font-bold text-text-primary">
                            Lịch tham khảo tuần này
                        </Text>
                        <Text className="mt-0.5 text-xs text-text-muted">
                            Tham khảo nhanh — nhận / tiếp tục ca dùng nút phía
                            trên.
                        </Text>
                    </View>
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
