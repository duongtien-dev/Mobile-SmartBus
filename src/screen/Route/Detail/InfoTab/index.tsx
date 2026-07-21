import {
    SINGLE_TICKET_PRICE,
    TICKET_TYPE_OPTIONS,
} from "@/constants/ticket";
import type { IRoute } from "@/models/route";
import { deriveOperatingHours } from "@/screen/Route/Detail/utils";
import type { IStop } from "@/models/stop";
import { Text, View } from "react-native";

type InfoTabProps = {
    route: IRoute;
    stops: IStop[];
};

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row items-start justify-between gap-4 border-b border-border py-3">
            <Text className="flex-1 text-sm text-text-muted">{label}</Text>
            <Text className="max-w-[55%] text-right text-sm font-semibold text-text-primary">
                {value}
            </Text>
        </View>
    );
}

export function InfoTab({ route, stops }: InfoTabProps) {
    const allTimes = stops.flatMap((stop) => stop.times ?? []);
    const operatingHours =
        route.operatingHours ?? deriveOperatingHours(allTimes) ?? "—";
    const monthlySingle = TICKET_TYPE_OPTIONS.find(
        (item) => item.id === "monthly-single",
    )?.price;
    const monthlyMulti = TICKET_TYPE_OPTIONS.find(
        (item) => item.id === "monthly-multi",
    )?.price;

    return (
        <View className="px-5 py-4">
            <InfoRow label="Tuyến số" value={route.code} />
            <InfoRow label="Tên tuyến" value={route.name} />
            <InfoRow label="Thời gian hoạt động" value={operatingHours} />
            <InfoRow
                label="Giá vé lượt"
                value={`${SINGLE_TICKET_PRICE.toLocaleString("vi-VN")} VND/lượt`}
            />
            <InfoRow
                label="Giá vé tháng (đơn tuyến)"
                value={`${monthlySingle?.toLocaleString("vi-VN") ?? "—"} VND/tháng`}
            />
            <InfoRow
                label="Giá vé tháng (liên tuyến)"
                value={`${monthlyMulti?.toLocaleString("vi-VN") ?? "—"} VND/tháng`}
            />

            {route.description ? (
                <View className="mt-4 border-t border-border pt-4">
                    <Text className="mb-2 text-sm font-semibold text-text-primary">
                        Mô tả
                    </Text>
                    <Text className="text-sm leading-6 text-text-muted">
                        {route.description}
                    </Text>
                </View>
            ) : null}

            <View className="mt-4 border-t border-border pt-4">
                <Text className="text-sm text-text-muted">Lượt đi</Text>
                <Text className="mt-1 text-sm text-text-muted">Lượt về</Text>
            </View>
        </View>
    );
}
