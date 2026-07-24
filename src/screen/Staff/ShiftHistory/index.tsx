import { StaffHeader } from "@/components/StaffHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import {
    STAFF_SHIFT_STATUS_LABEL,
} from "@/constants/staff";
import usePaginationList from "@/hooks/usePaginationList";
import type { IShiftReport, ShiftReportStatus } from "@/models/shiftReport";
import { shiftReportService } from "@/services/ShiftReportService";
import { getApiErrorMessage } from "@/utils/apiError";
import moment from "moment";
import { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

function statusVariant(
    status: ShiftReportStatus,
): "warning" | "success" | "danger" {
    if (status === "approved") return "success";
    if (status === "rejected") return "danger";
    return "warning";
}

function formatShiftDate(iso: string) {
    return moment(iso).format("DD/MM/YYYY");
}

function formatShiftWindow(start: string, end: string) {
    return `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`;
}

function ShiftHistoryCard({ item }: { item: IShiftReport }) {
    return (
        <View className="border-b border-border px-5 py-4">
            <View className="mb-3 flex-row items-center justify-between gap-3">
                <Text className="text-base font-bold text-text-primary">
                    {formatShiftDate(item.shiftStartAt)}
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

export default function StaffShiftHistoryScreen() {
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
            try {
                const response = await shiftReportService.getMyReports({
                    page: payload.page,
                    limit: payload.limit,
                });
                return response.data?.items ?? [];
            } catch (err) {
                Toast.show({
                    type: "error",
                    text1: "Không tải được lịch sử ca",
                    text2: getApiErrorMessage(err),
                });
                return [];
            }
        },
    });

    useEffect(() => {
        loadFirstPage();
    }, []);

    return (
        <View className="flex-1 bg-card">
            <StaffHeader title="Lịch sử ca làm" showBack />

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
        </View>
    );
}
