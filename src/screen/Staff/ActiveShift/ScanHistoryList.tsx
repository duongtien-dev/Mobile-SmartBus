import type { StaffScanLogItem } from "@/store/staffShift.store";
import { CheckCircle2, XCircle } from "lucide-react-native";
import moment from "moment";
import { FlatList, Text, View } from "react-native";

type ScanHistoryListProps = {
    items: StaffScanLogItem[];
};

function ScanHistoryRow({ item }: { item: StaffScanLogItem }) {
    const Icon = item.isValid ? CheckCircle2 : XCircle;
    const iconColor = item.isValid ? "#16a34a" : "#e50049";

    return (
        <View className="flex-row gap-3 border-b border-border py-3">
            <View className="mt-0.5">
                <Icon color={iconColor} size={20} />
            </View>
            <View className="min-w-0 flex-1 gap-0.5">
                <Text
                    className="text-sm font-semibold text-text-primary"
                    numberOfLines={1}
                >
                    {item.qrCode}
                </Text>
                <Text className="text-xs text-text-muted" numberOfLines={2}>
                    {item.reason}
                    {item.customerName ? ` · ${item.customerName}` : ""}
                </Text>
                <Text className="text-[11px] text-text-muted">
                    {moment(item.scannedAt).format("HH:mm:ss")}
                </Text>
            </View>
            <Text
                className={`text-xs font-semibold ${
                    item.isValid ? "text-green-600" : "text-alert"
                }`}
            >
                {item.isValid ? "Hợp lệ" : "Lỗi"}
            </Text>
        </View>
    );
}

export function ScanHistoryList({ items }: ScanHistoryListProps) {
    if (!items.length) {
        return (
            <Text className="py-6 text-center text-sm text-text-muted">
                Chưa quét vé nào trong ca này
            </Text>
        );
    }

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ScanHistoryRow item={item} />}
            scrollEnabled={false}
        />
    );
}
