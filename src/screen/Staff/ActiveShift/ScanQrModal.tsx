import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Keyboard, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScanMode = "camera" | "manual";

type ScanQrModalProps = {
    open: boolean;
    loading?: boolean;
    onClose: () => void;
    /** Cùng API verify — nhận raw qrCode từ camera hoặc nhập tay */
    onSubmit: (qrCode: string) => void;
};

const MODE_TABS: { key: ScanMode; label: string }[] = [
    { key: "camera", label: "Quét QR" },
    { key: "manual", label: "Nhập mã" },
];

export function ScanQrModal({
    open,
    loading = false,
    onClose,
    onSubmit,
}: ScanQrModalProps) {
    const insets = useSafeAreaInsets();
    const [permission, requestPermission] = useCameraPermissions();
    const [mode, setMode] = useState<ScanMode>("camera");
    const [qrCode, setQrCode] = useState("");
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        if (!open) {
            setQrCode("");
            setLocked(false);
            setMode("camera");
            return;
        }

        if (
            Platform.OS !== "web" &&
            permission &&
            !permission.granted &&
            permission.canAskAgain
        ) {
            requestPermission();
        }
    }, [open]);

    useEffect(() => {
        if (!loading) {
            setLocked(false);
        }
    }, [loading]);

    const handleClose = () => {
        if (loading) return;
        setQrCode("");
        setLocked(false);
        onClose();
    };

    const submitCode = (raw: string) => {
        const value = raw.trim();
        if (!value || loading || locked) return;
        setLocked(true);
        onSubmit(value);
    };

    const handleManualSubmit = () => {
        submitCode(qrCode);
    };

    const cameraSupported = Platform.OS !== "web";

    return (
        <Modal
            visible={open}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={handleClose}
        >
            <View
                className="flex-1 bg-app-shell"
                style={{ paddingTop: insets.top }}
            >
                <View className="flex-row items-center justify-between px-4 py-3">
                    <Text className="text-lg font-bold text-text-primary">
                        Quét vé khách lên
                    </Text>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Đóng"
                        className="h-10 w-10 items-center justify-center rounded-full bg-surface active:opacity-80"
                        disabled={loading}
                        onPress={handleClose}
                        hitSlop={8}
                    >
                        <X color="#0f172a" size={20} />
                    </Pressable>
                </View>

                <View className="mx-4 mb-3 flex-row rounded-xl bg-surface p-1">
                    {MODE_TABS.map((tab) => {
                        const active = mode === tab.key;
                        return (
                            <Pressable
                                key={tab.key}
                                accessibilityRole="button"
                                className={`flex-1 items-center rounded-lg py-2.5 ${
                                    active ? "bg-card shadow-sm" : ""
                                }`}
                                disabled={loading}
                                onPress={() => setMode(tab.key)}
                            >
                                <Text
                                    className={`text-sm font-semibold ${
                                        active
                                            ? "text-primary"
                                            : "text-text-muted"
                                    }`}
                                >
                                    {tab.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <View className="flex-1 px-4 pb-4">
                    {mode === "camera" ? (
                        <View className="flex-1 overflow-hidden rounded-2xl bg-black">
                            {!cameraSupported ? (
                                <View className="flex-1 items-center justify-center gap-3 px-6">
                                    <Keyboard color="#94a3b8" size={36} />
                                    <Text className="text-center text-sm text-white/80">
                                        Camera không hỗ trợ trên web. Dùng tab
                                        Nhập mã.
                                    </Text>
                                    <Button
                                        size="sm"
                                        onPress={() => setMode("manual")}
                                    >
                                        Chuyển nhập mã
                                    </Button>
                                </View>
                            ) : !permission?.granted ? (
                                <View className="flex-1 items-center justify-center gap-3 px-6">
                                    <Text className="text-center text-sm text-white/90">
                                        Cần quyền camera để quét mã QR trên vé.
                                    </Text>
                                    <Button onPress={requestPermission}>
                                        Cấp quyền camera
                                    </Button>
                                    <Pressable
                                        onPress={() => setMode("manual")}
                                    >
                                        <Text className="text-sm text-accent">
                                            Hoặc nhập mã thủ công
                                        </Text>
                                    </Pressable>
                                </View>
                            ) : (
                                <>
                                    <CameraView
                                        style={{ flex: 1 }}
                                        facing="back"
                                        barcodeScannerSettings={{
                                            barcodeTypes: ["qr"],
                                        }}
                                        onBarcodeScanned={
                                            locked || loading
                                                ? undefined
                                                : ({ data }) =>
                                                      submitCode(data)
                                        }
                                    />
                                    <View
                                        pointerEvents="none"
                                        className="absolute inset-0 items-center justify-center"
                                    >
                                        <View className="h-56 w-56 rounded-2xl border-2 border-white/90" />
                                        <Text className="mt-4 px-6 text-center text-sm font-medium text-white">
                                            Đưa mã QR trên vé vào khung
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    ) : (
                        <View className="gap-4 rounded-2xl bg-card p-4 shadow-sm">
                            <Text className="text-sm text-text-secondary">
                                Nhập mã QR in trên vé (TICKET-xxxxxx)
                            </Text>
                            <InputText
                                value={qrCode}
                                onChangeText={setQrCode}
                                placeholder="Nhập mã QR"
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!loading}
                                onSubmitEditing={handleManualSubmit}
                                returnKeyType="done"
                            />
                            <Button
                                disabled={!qrCode.trim() || loading || locked}
                                onPress={handleManualSubmit}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    "Kiểm tra vé"
                                )}
                            </Button>
                        </View>
                    )}
                </View>

                {loading ? (
                    <View className="absolute inset-0 items-center justify-center bg-black/35">
                        <View className="items-center gap-3 rounded-2xl bg-card px-8 py-6">
                            <ActivityIndicator color="#005f8b" size="large" />
                            <Text className="text-sm font-medium text-text-primary">
                                Đang kiểm tra vé...
                            </Text>
                        </View>
                    </View>
                ) : null}
            </View>
        </Modal>
    );
}
