import { Button } from "@/components/Button";
import ModalBlank from "@/components/ModalBlank";
import { useTranslation } from "@/i18n";
import type { ShiftReportPreview } from "@/models/shiftReport";
import { ActivityIndicator, Text, View } from "react-native";

type EndShiftModalProps = {
    open: boolean;
    loading?: boolean;
    preview: ShiftReportPreview | null;
    onClose: () => void;
    onConfirm: () => void;
};

function StatRow({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row items-center justify-between py-1.5">
            <Text className="text-sm text-text-muted">{label}</Text>
            <Text className="text-sm font-semibold text-text-primary">
                {value}
            </Text>
        </View>
    );
}

export function EndShiftModal({
    open,
    loading = false,
    preview,
    onClose,
    onConfirm,
}: EndShiftModalProps) {
    const { t, locale } = useTranslation();

    return (
        <ModalBlank
            isOpen={open}
            onClose={loading ? undefined : onClose}
            closeButton={!loading}
            className="gap-4"
        >
            <Text className="text-lg font-bold text-text-primary">
                {t("staff.end.title")}
            </Text>

            {preview ? (
                <View className="rounded-xl bg-surface px-3 py-2">
                    <StatRow
                        label={t("staff.end.total")}
                        value={String(preview.totalScans)}
                    />
                    <StatRow
                        label={t("staff.end.valid")}
                        value={String(preview.successfulScans)}
                    />
                    <StatRow
                        label={t("staff.end.invalid")}
                        value={String(preview.failedScans)}
                    />
                    <StatRow
                        label={t("staff.end.revenue")}
                        value={t("staff.end.currency", {
                            amount: preview.totalRevenue.toLocaleString(
                                locale === "en" ? "en-US" : "vi-VN",
                            ),
                        })}
                    />
                </View>
            ) : (
                <View className="items-center py-6">
                    <ActivityIndicator color="#005f8b" />
                    <Text className="mt-2 text-sm text-text-muted">
                        {t("staff.end.loading")}
                    </Text>
                </View>
            )}

            <View className="flex-row gap-3">
                <Button
                    type="secondary"
                    variant="outline"
                    className="flex-1"
                    disabled={loading}
                    onPress={onClose}
                >
                    {t("common.cancel")}
                </Button>
                <Button
                    className="flex-1"
                    disabled={!preview || loading}
                    onPress={onConfirm}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        t("staff.end.submit")
                    )}
                </Button>
            </View>
        </ModalBlank>
    );
}
