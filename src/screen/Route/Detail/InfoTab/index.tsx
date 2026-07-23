import type { IRoute } from "@/models/route";
import type { IStop } from "@/models/stop";
import type { ITicketProduct } from "@/models/ticketProduct";
import { ticketProductService } from "@/services";
import { deriveOperatingHours } from "@/screen/Route/Detail/utils";
import { useEffect } from "react";
import { Text, View } from "react-native";
import useFetch from "@/hooks/useFetch";

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

function formatPrice(amount?: number, suffix = "") {
    if (amount == null) return "—";
    return `${amount.toLocaleString("vi-VN")} VND${suffix}`;
}

export function InfoTab({ route, stops }: InfoTabProps) {
    const allTimes = stops.flatMap((stop) => stop.times ?? []);
    const operatingHours = route.operatingHours ?? deriveOperatingHours(allTimes) ?? "—";

    const { data: ticketProducts, loadFetchFn } = useFetch<ITicketProduct[]>({
        fetchFn: async () => {
            const res = await ticketProductService.list();
            return res.data ?? [];
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, []);

    const single = ticketProducts?.find((item) => item.code === "single")?.unitPrice;
    const monthlySingle = ticketProducts?.find(
        (item) => item.code === "monthlySingleRoute",
    )?.unitPrice;
    const monthlyMulti = ticketProducts?.find(
        (item) => item.code === "monthlyInterRoute",
    )?.unitPrice;

    return (
        <View className="px-5 py-4">
            <InfoRow label="Tuyến số" value={route.code} />
            <InfoRow label="Tên tuyến" value={route.name} />
            <InfoRow label="Thời gian hoạt động" value={operatingHours} />
            <InfoRow label="Giá vé lượt" value={formatPrice(single, "/lượt")} />
            <InfoRow
                label="Giá vé tháng (đơn tuyến)"
                value={formatPrice(monthlySingle, "/tháng")}
            />
            <InfoRow
                label="Giá vé tháng (liên tuyến)"
                value={formatPrice(monthlyMulti, "/tháng")}
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
