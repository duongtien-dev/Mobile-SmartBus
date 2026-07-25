import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { ListRow } from "@/components/ui/ListRow";
import useFetch from "@/hooks/useFetch";
import { useTranslation } from "@/i18n";
import type { IPaymentMethod } from "@/models/paymentMethod";
import { paymentService } from "@/services/PaymentService";
import { getPaymentSubtitle, getPaymentTitle } from "@/utils/payment";
import { useRouter } from "expo-router";
import { CreditCard } from "lucide-react-native";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function PaymentScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const {
        data: paymentMethods,
        isLoading,
        loadFetchFn,
    } = useFetch<IPaymentMethod[]>({
        fetchFn: async () => {
            const response = await paymentService.getMyPaymentMethods({});
            return response.data ?? [];
        },
    });

    useEffect(() => {
        loadFetchFn();
    }, []);

    const hasPaymentMethods = paymentMethods && paymentMethods.length > 0;

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={t("payment.title")} isIconBack={false} />

            {isLoading ? (
                <View className="mt-10 items-center">
                    <ActivityIndicator color="#005f8b" />
                </View>
            ) : hasPaymentMethods ? (
                <ScrollView
                    className="flex-1 px-5 pt-4"
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="gap-3 pb-28"
                >
                    <Card padding="none" shadow>
                        {paymentMethods.map((method, index) => (
                            <View key={method._id}>
                                <ListRow
                                    label={getPaymentSubtitle(method)}
                                    description={getPaymentTitle(method)}
                                    icon={CreditCard}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/payment/bank",
                                            params: { id: method._id },
                                        })
                                    }
                                />
                                {index < paymentMethods.length - 1 ? (
                                    <View className="mx-4 h-px bg-border" />
                                ) : null}
                            </View>
                        ))}
                    </Card>
                </ScrollView>
            ) : (
                <View className="mx-5 mt-4">
                    <Card>
                        <Text className="text-center text-base font-semibold text-text-primary">
                            {t("payment.emptyTitle")}
                        </Text>
                        <Text className="mt-2 text-center text-sm text-text-muted">
                            {t("payment.emptyDesc")}
                        </Text>
                    </Card>
                </View>
            )}

            <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-card px-5 py-5">
                <Button
                    type="primary"
                    variant="bold"
                    className="w-full rounded-xl"
                    onPress={() => router.push("/payment/add")}
                >
                    {hasPaymentMethods
                        ? t("payment.addMethod")
                        : t("payment.setupNow")}
                </Button>
            </View>
        </View>
    );
}
