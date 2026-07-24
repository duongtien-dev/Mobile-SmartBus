import { StaffHeader } from "@/components/StaffHeader";
import useFetch from "@/hooks/useFetch";
import type { IStop } from "@/models/stop";
import type { ShiftReportPreview } from "@/models/shiftReport";
import { shiftReportService } from "@/services/ShiftReportService";
import { stopService } from "@/services/StopService";
import { ticketService } from "@/services/TicketService";
import useStaffShiftStore from "@/store/staffShift.store";
import * as Haptics from "expo-haptics";
import { router, type Href } from "expo-router";
import { CheckCircle2, ScanLine } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import { ActiveShiftMap } from "./ActiveShiftMap";
import { EndShiftModal } from "./EndShiftModal";
import { ScanHistoryList } from "./ScanHistoryList";
import { ScanQrModal } from "./ScanQrModal";

function toLatLng(stopCoordinates?: [number, number]) {
    if (!stopCoordinates || stopCoordinates.length < 2) return null;
    const [lng, lat] = stopCoordinates;
    if (typeof lat !== "number" || typeof lng !== "number") return null;
    return { latitude: lat, longitude: lng };
}

export default function StaffActiveShiftScreen() {
    const session = useStaffShiftStore((state) => state.session);
    const setStops = useStaffShiftStore((state) => state.setStops);
    const advanceStop = useStaffShiftStore((state) => state.advanceStop);
    const addScanLog = useStaffShiftStore((state) => state.addScanLog);
    const endShift = useStaffShiftStore((state) => state.endShift);

    const [scanOpen, setScanOpen] = useState(false);
    const [scanLoading, setScanLoading] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const shiftEndAtRef = useRef("");

    const routeId = session?.routeId;
    const scanCount = session?.scanLogs.length ?? 0;

    const {
        data: fetchedStops,
        error: stopsError,
        loadFetchFn: loadStops,
    } = useFetch<IStop[]>({
        fetchFn: async () => {
            if (!routeId) return [];
            const response = await stopService.listStopsByRoute({
                routeId,
                limit: 200,
            });
            return response.data ?? [];
        },
    });

    const {
        data: preview,
        isLoading: isPreviewLoading,
        error: previewError,
        loadFetchFn: loadPreview,
        reset: resetPreview,
    } = useFetch<ShiftReportPreview>({
        fetchFn: async () => {
            if (!session) {
                throw new Error("Chưa có phiên ca đang chạy");
            }
            const response = await shiftReportService.preview({
                shiftStartAt: session.shiftStartAt,
                shiftEndAt: shiftEndAtRef.current,
            });
            if (!response.data) {
                throw new Error(
                    response.message || "Không nhận được thống kê ca",
                );
            }
            return response.data;
        },
    });

    const currentStop = session?.stops[session.stopIndex];
    const nextStop =
        session?.stops[session.stopIndex + 1] ?? currentStop ?? null;

    const mapCenter = useMemo(() => {
        return (
            toLatLng(currentStop?.location?.coordinates) ??
            toLatLng(nextStop?.location?.coordinates) ?? {
                latitude: 16.0544,
                longitude: 108.2022,
            }
        );
    }, [currentStop, nextStop]);

    const nextStopCoordinate = useMemo(() => {
        return (
            toLatLng(nextStop?.location?.coordinates) ?? {
                latitude: mapCenter.latitude + 0.0015,
                longitude: mapCenter.longitude + 0.002,
            }
        );
    }, [nextStop, mapCenter]);

    useEffect(() => {
        if (!session) {
            router.replace("/staff" as Href);
        }
    }, [session]);

    useEffect(() => {
        if (!routeId) return;
        loadStops();
    }, [routeId]);

    useEffect(() => {
        if (fetchedStops) {
            setStops(fetchedStops);
        }
    }, [fetchedStops, setStops]);

    useEffect(() => {
        if (!stopsError) return;
        Toast.show({
            type: "error",
            text1: "Không tải được điểm dừng",
        });
    }, [stopsError]);

    useEffect(() => {
        if (!previewError) return;
        setEndOpen(false);
        Toast.show({
            type: "error",
            text1: "Không xem trước được báo cáo",
        });
    }, [previewError]);

    const handleBackToDashboard = () => {
        router.replace("/staff" as Href);
    };

    const handleVerifyQr = async (qrCode: string) => {
        const code = qrCode.trim();
        if (!code) return;

        setScanLoading(true);
        try {
            const response = await ticketService.verifyScanQRCode({
                qrCode: code,
            });
            const result = response.data;

            if (!result) {
                throw new Error(response.message || "Không có kết quả quét");
            }

            addScanLog({
                qrCode: code,
                isValid: result.isValid,
                reason: result.reason,
                customerName: result.ticket?.customerName || undefined,
                routeName: result.ticket?.routeName || undefined,
            });

            try {
                await Haptics.notificationAsync(
                    result.isValid
                        ? Haptics.NotificationFeedbackType.Success
                        : Haptics.NotificationFeedbackType.Error,
                );
            } catch {
                // ignore haptics errors (web / unsupported)
            }

            Toast.show({
                type: result.isValid ? "success" : "error",
                text1: result.isValid ? "Vé hợp lệ" : "Vé không hợp lệ",
                text2: result.reason,
            });

            if (result.isValid) {
                setScanOpen(false);
            }
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Quét vé thất bại",
            });
        } finally {
            setScanLoading(false);
        }
    };

    const handleOpenEndShift = () => {
        if (!session) return;

        Alert.alert(
            "Kết thúc ca?",
            "Hệ thống sẽ tổng hợp vé đã quét và gửi báo cáo ca. Bạn không thể tiếp tục quét sau khi gửi.",
            [
                { text: "Ở lại ca", style: "cancel" },
                {
                    text: "Xem báo cáo",
                    onPress: () => {
                        shiftEndAtRef.current = new Date().toISOString();
                        resetPreview();
                        setEndOpen(true);
                        loadPreview();
                    },
                },
            ],
        );
    };

    const handleCloseEndShift = () => {
        if (isPreviewLoading || isSubmitting) return;
        setEndOpen(false);
        resetPreview();
    };

    const handleSubmitReport = async () => {
        if (!session || !preview) return;

        setIsSubmitting(true);
        try {
            const response = await shiftReportService.submit({
                shiftStartAt: session.shiftStartAt,
                shiftEndAt: preview.shiftEndAt,
            });

            if (!response.success) {
                throw new Error(response.message || "Gửi báo cáo thất bại");
            }

            Toast.show({
                type: "success",
                text1: "Đã gửi báo cáo ca",
                text2: "Chờ admin duyệt",
            });

            endShift();
            setEndOpen(false);
            resetPreview();
            router.replace("/staff" as Href);
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Gửi báo cáo thất bại",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmPassStop = () => {
        if (!session?.stops.length) {
            Toast.show({
                type: "error",
                text1: "Chưa có danh sách trạm",
                text2: "Gán tuyến cho staff để tải điểm dừng",
            });
            return;
        }

        if (session.stopIndex >= session.stops.length - 1) {
            Toast.show({
                type: "success",
                text1: "Đã hết trạm trên tuyến",
                text2: "Có thể kết thúc ca để gửi báo cáo",
            });
            return;
        }

        advanceStop();
        Toast.show({
            type: "success",
            text1: "Đã xác nhận qua trạm",
            text2: nextStop?.name,
        });
    };

    if (!session) {
        return null;
    }

    const nextStopName =
        nextStop?.name ||
        session.routeName ||
        "Chưa có trạm — chọn tuyến khi check-in";

    const validCount = session.scanLogs.filter((item) => item.isValid).length;

    return (
        <View className="flex-1 bg-card">
            <StaffHeader
                title="Ca đang chạy"
                showBack
                onBackPress={handleBackToDashboard}
                actions={[
                    {
                        key: "done",
                        icon: CheckCircle2,
                        color: "#ffffff",
                        accessibilityLabel: "Kết thúc ca",
                        onPress: handleOpenEndShift,
                    },
                ]}
            />

            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-6"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="relative h-52">
                    <ActiveShiftMap
                        mapCenter={mapCenter}
                        nextStopCoordinate={nextStopCoordinate}
                    />

                    <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-accent-light px-4 py-3">
                        <View className="flex-row items-start justify-between gap-3">
                            <View className="min-w-0 flex-1">
                                <Text className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                                    Trạm tiếp theo
                                </Text>
                                <Text
                                    className="mt-1 text-[15px] font-bold text-text-primary"
                                    numberOfLines={2}
                                >
                                    {nextStopName}
                                </Text>
                            </View>
                            <View className="items-end">
                                <Text className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                                    Đã quét
                                </Text>
                                <Text className="mt-1 text-xl font-bold text-primary">
                                    {scanCount}
                                </Text>
                                <Text className="text-[10px] text-text-muted">
                                    {validCount} hợp lệ
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="gap-4 px-4 pt-4">
                    {session.routeName ? (
                        <Text className="text-sm text-text-secondary">
                            Tuyến:{" "}
                            <Text className="font-semibold text-primary">
                                {session.routeName}
                            </Text>
                        </Text>
                    ) : null}

                    <Text className="text-xs text-text-muted">
                        Quay lại trang chủ vẫn giữ ca. Kết thúc ca (✓) khi hoàn
                        tất để gửi báo cáo.
                    </Text>

                    <Pressable
                        accessibilityRole="button"
                        className="flex-row items-center justify-center gap-2.5 rounded-2xl bg-primary px-4 py-4 shadow-sm active:opacity-90"
                        onPress={() => setScanOpen(true)}
                    >
                        <ScanLine color="#ffffff" size={22} />
                        <Text className="text-sm font-bold uppercase tracking-wide text-on-primary">
                            Quét vé khách lên
                        </Text>
                    </Pressable>

                    <View className="rounded-2xl border border-border bg-card px-4 py-3">
                        <Text className="mb-1 text-sm font-bold uppercase tracking-wide text-primary">
                            Vé đã quét ({scanCount})
                        </Text>
                        <ScanHistoryList items={session.scanLogs} />
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        className="items-center rounded-2xl border border-primary bg-primary-light px-4 py-3.5 active:opacity-90"
                        onPress={handleConfirmPassStop}
                    >
                        <Text className="text-sm font-bold uppercase tracking-wide text-primary">
                            Xác nhận qua trạm
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>

            <ScanQrModal
                open={scanOpen}
                loading={scanLoading}
                onClose={() => setScanOpen(false)}
                onSubmit={handleVerifyQr}
            />

            <EndShiftModal
                open={endOpen}
                loading={isPreviewLoading || isSubmitting}
                preview={preview}
                onClose={handleCloseEndShift}
                onConfirm={handleSubmitReport}
            />
        </View>
    );
}
