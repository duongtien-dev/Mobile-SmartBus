import { StaffHeader } from "@/components/StaffHeader";
import useFetch from "@/hooks/useFetch";
import type { IActiveShift } from "@/models/activeShift";
import type { IScanLogItem } from "@/models/scanLog";
import type { IStop } from "@/models/stop";
import type { ShiftReportPreview } from "@/models/shiftReport";
import { scanLogService } from "@/services/ScanLogService";
import { shiftReportService } from "@/services/ShiftReportService";
import { staffShiftService } from "@/services/StaffShiftService";
import { stopService } from "@/services/StopService";
import { ticketService } from "@/services/TicketService";
import useStaffShiftStore from "@/store/staffShift.store";
import * as Haptics from "expo-haptics";
import { router, useFocusEffect, type Href } from "expo-router";
import { CheckCircle2, ScanLine } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
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

function getRouteId(shift: IActiveShift): string | undefined {
    if (!shift.routeId) return undefined;
    if (typeof shift.routeId === "string") return shift.routeId;
    return shift.routeId._id;
}

export default function StaffActiveShiftScreen() {
    const ui = useStaffShiftStore((state) => state.ui);
    const setStops = useStaffShiftStore((state) => state.setStops);
    const advanceStop = useStaffShiftStore((state) => state.advanceStop);
    const resetUi = useStaffShiftStore((state) => state.resetUi);

    const [scanOpen, setScanOpen] = useState(false);
    const [scanLoading, setScanLoading] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    /** Chờ load /active xong mới được redirect — tránh null ban đầu đá về Home. */
    const [shiftReady, setShiftReady] = useState(false);
    const shiftEndAtRef = useRef("");

    const {
        data: activeShift,
        isLoading: isShiftLoading,
        error: shiftError,
        loadFetchFn: loadActiveShift,
    } = useFetch<IActiveShift | null>({
        fetchFn: async () => {
            const response = await staffShiftService.getActive();
            return response.data ?? null;
        },
    });

    const shiftStartAt = activeShift?.shiftStartAt;
    const routeId = activeShift ? getRouteId(activeShift) : undefined;

    const {
        data: scanLogs,
        isLoading: isScansLoading,
        error: scansError,
        loadFetchFn: loadScanLogs,
    } = useFetch<IScanLogItem[]>({
        fetchFn: async () => {
            if (!shiftStartAt) return [];
            const response = await scanLogService.getMyScans({
                from: shiftStartAt,
                limit: 100,
            });
            return response.data?.items ?? [];
        },
    });

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
            if (!shiftStartAt) {
                throw new Error("Chưa có phiên ca đang chạy");
            }
            const response = await shiftReportService.preview({
                shiftStartAt,
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

    const currentStop = ui.stops[ui.stopIndex];
    const nextStop = ui.stops[ui.stopIndex + 1] ?? currentStop ?? null;
    const scans = scanLogs ?? [];
    const scanCount = scans.length;
    const validCount = scans.filter((item) => item.isValid).length;

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

    useFocusEffect(
        useCallback(() => {
            let alive = true;
            setShiftReady(false);

            (async () => {
                await loadActiveShift();
                if (alive) setShiftReady(true);
            })();

            return () => {
                alive = false;
            };
        }, [loadActiveShift]),
    );

    useEffect(() => {
        if (!shiftReady || isShiftLoading) return;

        if (shiftError) {
            Toast.show({
                type: "error",
                text1: "Không tải được ca đang chạy",
            });
            router.replace("/staff" as Href);
            return;
        }

        if (activeShift === null) {
            Toast.show({
                type: "error",
                text1: "Không có ca đang chạy",
            });
            router.replace("/staff" as Href);
        }
    }, [shiftReady, isShiftLoading, activeShift, shiftError]);

    useEffect(() => {
        if (!shiftStartAt) return;
        loadScanLogs();
    }, [shiftStartAt]);

    useFocusEffect(
        useCallback(() => {
            if (!shiftReady || !shiftStartAt) return;
            loadScanLogs();
        }, [shiftReady, shiftStartAt, loadScanLogs]),
    );

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
        if (!scansError) return;
        Toast.show({
            type: "error",
            text1: "Không tải được lịch sử quét",
        });
    }, [scansError]);

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

            await loadScanLogs();

            try {
                await Haptics.notificationAsync(
                    result.isValid
                        ? Haptics.NotificationFeedbackType.Success
                        : Haptics.NotificationFeedbackType.Error,
                );
            } catch {
                // ignore
            }

            Toast.show({
                type: result.isValid ? "success" : "error",
                text1: result.isValid ? "Vé hợp lệ" : "Vé không hợp lệ",
                text2: result.reason,
            });

            if (result.isValid) {
                setScanOpen(false);
            }
        } catch {
            Toast.show({
                type: "error",
                text1: "Quét vé thất bại",
            });
        } finally {
            setScanLoading(false);
        }
    };

    const handleOpenEndShift = () => {
        if (!activeShift) return;

        Alert.alert(
            "Kết thúc ca?",
            "Hệ thống sẽ tổng hợp vé đã quét và gửi báo cáo ca.",
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
        if (!activeShift || !preview) return;

        setIsSubmitting(true);
        try {
            const response = await shiftReportService.submit({
                shiftStartAt: activeShift.shiftStartAt,
                shiftEndAt: preview.shiftEndAt,
            });

            if (!response.success) {
                throw new Error(response.message || "Gửi báo cáo thất bại");
            }

            await staffShiftService.end();
            resetUi();

            Toast.show({
                type: "success",
                text1: "Đã gửi báo cáo ca",
                text2: "Chờ admin duyệt",
            });

            setEndOpen(false);
            resetPreview();
            router.replace("/staff" as Href);
        } catch {
            Toast.show({
                type: "error",
                text1: "Gửi báo cáo thất bại",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmPassStop = () => {
        if (!ui.stops.length) {
            Toast.show({
                type: "error",
                text1: "Chưa có danh sách trạm",
                text2: "Gán tuyến cho staff để tải điểm dừng",
            });
            return;
        }

        if (ui.stopIndex >= ui.stops.length - 1) {
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

    if (!shiftReady || isShiftLoading || !activeShift) {
        return (
            <View className="flex-1 items-center justify-center bg-card">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    const nextStopName =
        nextStop?.name ||
        activeShift.routeName ||
        "Chưa có trạm — chọn tuyến khi check-in";

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
                                    {isScansLoading ? "…" : scanCount}
                                </Text>
                                <Text className="text-[10px] text-text-muted">
                                    {validCount} hợp lệ
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="gap-4 px-4 pt-4">
                    {activeShift.routeName ? (
                        <Text className="text-sm text-text-secondary">
                            Tuyến:{" "}
                            <Text className="font-semibold text-primary">
                                {activeShift.routeName}
                            </Text>
                        </Text>
                    ) : null}

                    <Text className="text-xs text-text-muted">
                        Quay lại trang chủ vẫn giữ ca (server). Kết thúc ca (✓)
                        để gửi báo cáo.
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
                        {isScansLoading ? (
                            <View className="items-center py-6">
                                <ActivityIndicator color="#005f8b" />
                            </View>
                        ) : (
                            <ScanHistoryList items={scans} />
                        )}
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
