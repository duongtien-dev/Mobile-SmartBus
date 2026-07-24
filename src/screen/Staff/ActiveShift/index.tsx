import { StaffHeader } from "@/components/StaffHeader";
import type { ShiftReportPreview } from "@/models/shiftReport";
import { shiftReportService } from "@/services/ShiftReportService";
import { stopService } from "@/services/StopService";
import { ticketService } from "@/services/TicketService";
import useStaffShiftStore from "@/store/staffShift.store";
import { getApiErrorMessage } from "@/utils/apiError";
import * as Haptics from "expo-haptics";
import { router, type Href } from "expo-router";
import {
    CheckCircle2,
    ScanLine,
    TriangleAlert,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { ActiveShiftMap } from "./ActiveShiftMap";
import { EndShiftModal } from "./EndShiftModal";
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
    const incrementScanCount = useStaffShiftStore(
        (state) => state.incrementScanCount,
    );
    const endShift = useStaffShiftStore((state) => state.endShift);

    const [scanOpen, setScanOpen] = useState(false);
    const [scanLoading, setScanLoading] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const [endLoading, setEndLoading] = useState(false);
    const [preview, setPreview] = useState<ShiftReportPreview | null>(null);

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
        const routeId = session?.routeId;
        if (!routeId) return;

        let cancelled = false;

        (async () => {
            try {
                const response = await stopService.listStopsByRoute({
                    routeId,
                    limit: 200,
                });
                if (cancelled) return;
                const stops = Array.isArray(response.data)
                    ? response.data
                    : [];
                setStops(stops);
            } catch (err) {
                Toast.show({
                    type: "error",
                    text1: "Không tải được điểm dừng",
                    text2: getApiErrorMessage(err),
                });
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [session?.routeId]);

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

            incrementScanCount();

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
                text2: getApiErrorMessage(err),
            });
        } finally {
            setScanLoading(false);
        }
    };

    const handleOpenEndShift = async () => {
        if (!session) return;

        setEndOpen(true);
        setPreview(null);
        setEndLoading(true);

        try {
            const shiftEndAt = new Date().toISOString();
            const response = await shiftReportService.preview({
                shiftStartAt: session.shiftStartAt,
                shiftEndAt,
            });
            setPreview(response.data ?? null);
        } catch (err) {
            setEndOpen(false);
            Toast.show({
                type: "error",
                text1: "Không xem trước được báo cáo",
                text2: getApiErrorMessage(err),
            });
        } finally {
            setEndLoading(false);
        }
    };

    const handleSubmitReport = async () => {
        if (!session || !preview) return;

        setEndLoading(true);
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
            router.replace("/staff" as Href);
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Gửi báo cáo thất bại",
                text2: getApiErrorMessage(err),
            });
        } finally {
            setEndLoading(false);
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

    return (
        <View className="flex-1 bg-card">
            <StaffHeader
                title="Ca lái đang diễn ra"
                actions={[
                    {
                        key: "alert",
                        icon: TriangleAlert,
                        color: "#ffc20e",
                        accessibilityLabel: "Cảnh báo",
                        onPress: () =>
                            Toast.show({
                                type: "success",
                                text1: "Cảnh báo ca",
                                text2: `Đã quét ${session.scanCount} vé trong ca`,
                            }),
                    },
                    {
                        key: "done",
                        icon: CheckCircle2,
                        color: "#ffffff",
                        accessibilityLabel: "Kết thúc ca",
                        onPress: handleOpenEndShift,
                    },
                ]}
            />

            <View className="relative h-[38%]">
                <ActiveShiftMap
                    mapCenter={mapCenter}
                    nextStopCoordinate={nextStopCoordinate}
                />

                <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-accent-light px-4 py-3.5">
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
                                {session.scanCount}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className="flex-1 justify-between px-4 pb-6 pt-5">
                <View className="gap-5">
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

                    <View className="gap-3">
                        <Text className="text-sm font-bold uppercase tracking-wide text-primary">
                            Khách xuống tại trạm (0)
                        </Text>
                        <Text className="py-6 text-center text-sm text-text-muted">
                            Không có khách xuống ở trạm này
                        </Text>
                    </View>
                </View>

                <Pressable
                    accessibilityRole="button"
                    className="items-center rounded-2xl bg-primary px-4 py-4 shadow-sm active:opacity-90"
                    onPress={handleConfirmPassStop}
                >
                    <Text className="text-sm font-bold uppercase tracking-wide text-on-primary">
                        Xác nhận qua trạm
                    </Text>
                </Pressable>
            </View>

            <ScanQrModal
                open={scanOpen}
                loading={scanLoading}
                onClose={() => setScanOpen(false)}
                onSubmit={handleVerifyQr}
            />

            <EndShiftModal
                open={endOpen}
                loading={endLoading}
                preview={preview}
                onClose={() => setEndOpen(false)}
                onConfirm={handleSubmitReport}
            />
        </View>
    );
}
