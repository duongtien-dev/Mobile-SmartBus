import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/i18n";
import type { ITicketProduct } from "@/models/ticketProduct";
import { TicketTypeCard } from "@/screen/Trip/Ticket/TicketTypeCard";
import { ticketProductService } from "@/services";
import useTripBookingStore from "@/store/tripBooking.store";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function TicketTypeListScreen() {
    const { t } = useTranslation();
    const setTicketType = useTripBookingStore((state) => state.setTicketType);
    const [products, setProducts] = useState<ITicketProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await ticketProductService.list();
            setProducts(res.data ?? []);
        } catch {
            setError(t("ticket.type.loadFail"));
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [t]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleSelectTicket = (product: ITicketProduct) => {
        setTicketType(product);

        if (product.code === "single") {
            router.push("/trips/tickets/single" as never);
            return;
        }

        router.push("/trips/tickets/monthly" as never);
    };

    return (
        <View className="flex-1 bg-background">
            <PageHeader title={t("ticket.buy.title")} isIconBack={true} />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-5 px-5 pb-8 pt-2"
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-lg font-bold text-primary">
                    {t("ticket.type.prompt")}
                </Text>

                {loading ? (
                    <View className="items-center py-10">
                        <ActivityIndicator color="#005F8B" />
                    </View>
                ) : error ? (
                    <Text className="text-sm text-alert" onPress={loadProducts}>
                        {t("ticket.type.retryHint", { error })}
                    </Text>
                ) : products.length === 0 ? (
                    <Text className="text-sm text-text-muted">
                        {t("ticket.type.empty")}
                    </Text>
                ) : (
                    products.map((product) => (
                        <TicketTypeCard
                            key={product._id}
                            product={product}
                            onPress={() => handleSelectTicket(product)}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
}
