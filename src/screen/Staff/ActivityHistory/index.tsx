import { StaffHeader } from "@/components/StaffHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import TabContainer from "@/components/TabContainer";
import {
    STAFF_LEAVE_STATUS_LABEL,
    STAFF_SHIFT_STATUS_LABEL,
} from "@/constants/staff";
import usePaginationList from "@/hooks/usePaginationList";
import type { ILeaveRequest, LeaveRequestStatus } from "@/models/leaveRequest";
import type { IShiftReport, ShiftReportStatus } from "@/models/shiftReport";
import { leaveRequestService } from "@/services/LeaveRequestService";
import { shiftReportService } from "@/services/ShiftReportService";
import moment from "moment";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
} from "react-native";

const ACTIVITY_TABS = [
    { key: "shifts", label: "Lịch sử ca" },
    { key: "activities", label: "Hoạt động" },
] as const;

type ActivityTab = (typeof ACTIVITY_TABS)[number]["key"];

function statusVariant(
    status: ShiftReportStatus | LeaveRequestStatus,
): "warning" | "success" | "danger" {
    if (status === "approved") return "success";
    if (status === "rejected") return "danger";
    return "warning";
}

function formatShiftWindow(start: string, end: string) {
    return `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`;
}

function ShiftHistoryCard({ item }: { item: IShiftReport }) {
    return (
        <View className="border-b border-border px-5 py-4">
            <View className="mb-3 flex-row items-center justify-between gap-3">
                <Text className="text-base font-bold text-text-primary">
                    {moment(item.shiftStartAt).format("DD/MM/YYYY")}
                </Text>
                <StatusPill
                    label={STAFF_SHIFT_STATUS_LABEL[item.status]}
                    variant={statusVariant(item.status)}
                    className="rounded-md"
                />
            </View>

            <View className="mb-3 h-px bg-border" />

            <View className="flex-row">
                <View className="flex-1 gap-1">
                    <Text className="text-xs text-text-muted">Thời gian ca</Text>
                    <Text className="text-sm font-semibold text-primary">
                        {formatShiftWindow(item.shiftStartAt, item.shiftEndAt)}
                    </Text>
                </View>
                <View className="flex-1 items-end gap-1">
                    <Text className="text-xs text-text-muted">Đã phục vụ</Text>
                    <Text className="text-sm font-semibold text-primary">
                        {item.successfulScans} hành khách
                    </Text>
                </View>
            </View>

            <View className="mt-3 flex-row justify-between">
                <Text className="text-xs text-text-muted">
                    Quét: {item.totalScans} (OK {item.successfulScans} / lỗi{" "}
                    {item.failedScans})
                </Text>
                <Text className="text-xs font-medium text-text-secondary">
                    {item.totalRevenue.toLocaleString("vi-VN")} đ
                </Text>
            </View>
        </View>
    );
}

function LeaveActivityCard({ item }: { item: ILeaveRequest }) {
    const dateRange =
        moment(item.startDate).format("DD/MM/YYYY") ===
        moment(item.endDate).format("DD/MM/YYYY")
            ? moment(item.startDate).format("DD/MM/YYYY")
            : `${moment(item.startDate).format("DD/MM/YYYY")} → ${moment(item.endDate).format("DD/MM/YYYY")}`;

    return (
        <View className="border-b border-border px-5 py-4">
            <View className="mb-3 flex-row items-center justify-between gap-3">
                <View className="min-w-0 flex-1">
                    <Text className="text-xs font-semibold uppercase tracking-wide text-accent">
                        Xin nghỉ
                    </Text>
                    <Text className="mt-1 text-base font-bold text-text-primary">
                        {dateRange}
                    </Text>
                </View>
                <StatusPill
                    label={STAFF_LEAVE_STATUS_LABEL[item.status]}
                    variant={statusVariant(item.status)}
                    className="rounded-md"
                />
            </View>

            <View className="mb-3 h-px bg-border" />

            <Text className="text-sm text-text-secondary" numberOfLines={3}>
                {item.reason}
            </Text>
            {item.createdAt ? (
                <Text className="mt-2 text-xs text-text-muted">
                    Gửi lúc {moment(item.createdAt).format("HH:mm DD/MM/YYYY")}
                </Text>
            ) : null}
        </View>
    );
}

function ShiftHistoryTab() {
    const {
        list,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<IShiftReport>({
        limit: 15,
        params: {},
        fetchFn: async (payload) => {
            const response = await shiftReportService.getMyReports({
                page: payload.page,
                limit: payload.limit,
            });
            return response.data?.items ?? [];
        },
    });

    useEffect(() => {
        loadFirstPage();
    }, []);

    return (
        <FlatList
            data={list}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ShiftHistoryCard item={item} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.4}
            ListEmptyComponent={
                isSkeletonLoading ? (
                    <View className="items-center py-12">
                        <ActivityIndicator color="#005f8b" />
                    </View>
                ) : (
                    <Text className="px-5 py-10 text-center text-sm text-text-muted">
                        Chưa có lịch sử ca làm
                    </Text>
                )
            }
            ListFooterComponent={
                isLoadingMore ? (
                    <View className="items-center py-4">
                        <ActivityIndicator color="#005f8b" />
                    </View>
                ) : null
            }
        />
    );
}

function LeaveActivityTab() {
    const {
        list,
        loadFirstPage,
        loadMore,
        isSkeletonLoading,
        isLoadingMore,
    } = usePaginationList<ILeaveRequest>({
        limit: 15,
        params: {},
        fetchFn: async (payload) => {
            const response = await leaveRequestService.getMyRequests({
                page: payload.page,
                limit: payload.limit,
            });
            return response.data?.items ?? [];
        },
    });

    useEffect(() => {
        loadFirstPage();
    }, []);

    return (
        <FlatList
            data={list}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <LeaveActivityCard item={item} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.4}
            ListEmptyComponent={
                isSkeletonLoading ? (
                    <View className="items-center py-12">
                        <ActivityIndicator color="#005f8b" />
                    </View>
                ) : (
                    <Text className="px-5 py-10 text-center text-sm text-text-muted">
                        Chưa có hoạt động xin nghỉ
                    </Text>
                )
            }
            ListFooterComponent={
                isLoadingMore ? (
                    <View className="items-center py-4">
                        <ActivityIndicator color="#005f8b" />
                    </View>
                ) : null
            }
        />
    );
}

export default function StaffActivityHistoryScreen() {
    const [activeTab, setActiveTab] = useState<ActivityTab>("shifts");

    return (
        <View className="flex-1 bg-card">
            <StaffHeader title="Lịch sử hoạt động" showBack />

            <View className="border-b border-border px-4 pt-2">
                <TabContainer
                    tabs={ACTIVITY_TABS.map((tab) => ({
                        key: tab.key,
                        label: tab.label,
                    }))}
                    value={activeTab}
                    onChange={(value) => setActiveTab(value as ActivityTab)}
                    variant="underline"
                    tabListClassName="justify-around"
                    triggerClassName="flex-1 px-2"
                />
            </View>

            <View className="flex-1">
                {activeTab === "shifts" ? (
                    <ShiftHistoryTab />
                ) : (
                    <LeaveActivityTab />
                )}
            </View>
        </View>
    );
}
