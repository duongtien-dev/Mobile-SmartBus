import useFetch from "@/hooks/useFetch";
import { useTranslation } from "@/i18n";
import type { IRoute } from "@/models/route";
import type { IStop } from "@/models/stop";
import type { ITicketProduct } from "@/models/ticketProduct";
import { deriveOperatingHours } from "@/screen/Route/Detail/utils";
import { ticketProductService } from "@/services";
import { useEffect } from "react";
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
    const { t, locale } = useTranslation();
    const allTimes = stops.flatMap((stop) => stop.times ?? []);
    const operatingHours =
        route.operatingHours ?? deriveOperatingHours(allTimes) ?? "—";

    const { data: ticketProducts, loadFetchFn } = useFetch<ITicketProduct[]>({
        fetchFn: async () => {
            const res = await ticketProductService.list();
            return res.data ?? [];
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, []);

    const formatPrice = (amount: number | undefined, kind: "ride" | "month") => {
        if (amount == null) return "—";
        const formatted = amount.toLocaleString(
            locale === "en" ? "en-US" : "vi-VN",
        );
        return kind === "ride"
            ? t("route.info.pricePerRide", { amount: formatted })
            : t("route.info.pricePerMonth", { amount: formatted });
    };

    const single = ticketProducts?.find((item) => item.code === "single")
        ?.unitPrice;
    const monthlySingle = ticketProducts?.find(
        (item) => item.code === "monthlySingleRoute",
    )?.unitPrice;
    const monthlyMulti = ticketProducts?.find(
        (item) => item.code === "monthlyInterRoute",
    )?.unitPrice;

    return (
        <View className="px-5 py-4">
            <InfoRow label={t("route.info.code")} value={route.code} />
            <InfoRow label={t("route.info.name")} value={route.name} />
            <InfoRow label={t("route.info.hours")} value={operatingHours} />
            <InfoRow
                label={t("route.info.singlePrice")}
                value={formatPrice(single, "ride")}
            />
            <InfoRow
                label={t("route.info.monthlySinglePrice")}
                value={formatPrice(monthlySingle, "month")}
            />
            <InfoRow
                label={t("route.info.monthlyInterPrice")}
                value={formatPrice(monthlyMulti, "month")}
            />

            {route.description ? (
                <View className="mt-4 border-t border-border pt-4">
                    <Text className="mb-2 text-sm font-semibold text-text-primary">
                        {t("route.info.description")}
                    </Text>
                    <Text className="text-sm leading-6 text-text-muted">
                        {route.description}
                    </Text>
                </View>
            ) : null}

            <View className="mt-4 border-t border-border pt-4">
                <Text className="text-sm text-text-muted">
                    {t("route.info.outbound")}
                </Text>
                <Text className="mt-1 text-sm text-text-muted">
                    {t("route.info.inbound")}
                </Text>
            </View>
        </View>
    );
}
