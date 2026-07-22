import { PageHeader } from "@/components/PageHeader";
import type { IPaymentMethod } from "@/models/paymentMethod";
import { FormFooter } from "@/screen/Trip/Ticket/shared/FormControls";
import { FormSection } from "@/screen/Trip/Ticket/shared/FormSection";
import { paymentService } from "@/services/PaymentService";
import useTripBookingStore from "@/store/tripBooking.store";
import { cn } from "@/lib/utils";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { Plus } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

const PROVIDER_LABELS: Record<IPaymentMethod["provider"], string> = {
    momo: "MoMo",
    zalopay: "ZaloPay",
    shopeepay: "ShopeePay",
    visa: "Thẻ quốc tế",
    napas: "Tài khoản / Thẻ ngân hàng",
};

function getPaymentTitle(method: IPaymentMethod) {
    return PROVIDER_LABELS[method.provider] ?? method.provider;
}

function getPaymentSubtitle(method: IPaymentMethod) {
    if (method.cardNumber) {
        return `******${method.cardNumber.slice(-4)}`;
    }

    if (method.accountNumber) {
        return `************${method.accountNumber.slice(-4)}`;
    }

    if (method.phoneNumber) {
        return method.phoneNumber;
    }

    return "";
}

interface InfoRowProps {
    label: string;
    value: string;
}

function InfoRow({
    label,
    value,
}: InfoRowProps) {
    return (
        <View className="flex-row items-center gap-4">
            <Text className="w-24 text-sm text-text-muted">
                {label}
            </Text>

            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="flex-1 text-right text-sm font-medium text-text-primary"
            >
                {value}
            </Text>
        </View>
    );
}

export default function TicketPaymentScreen() {
    const searchContext = useTripBookingStore((state) => state.searchContext);
    const pickupStopName = useTripBookingStore(
        (state) => state.pickupStopName,
    );
    const routeCode = useTripBookingStore((state) => state.routeCode);
    const ticketType = useTripBookingStore((state) => state.ticketType);
    const singleForm = useTripBookingStore((state) => state.singleForm);
    const monthlyForm = useTripBookingStore((state) => state.monthlyForm);
    const totalPrice = useTripBookingStore((state) => state.totalPrice);
    const selectedPaymentMethodId = useTripBookingStore(
        (state) => state.selectedPaymentMethodId,
    );
    const setSelectedPaymentMethodId = useTripBookingStore(
        (state) => state.setSelectedPaymentMethodId,
    );
    const getTicketLabel = useTripBookingStore(
        (state) => state.getTicketLabel,
    );

    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const ticketLabel = getTicketLabel();
    const isSingleTicket = ticketType === "single";

    const fetchPaymentMethods = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await paymentService.getMyPaymentMethods({});
            setPaymentMethods(response.data ?? []);
        } catch {
            setPaymentMethods([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchPaymentMethods();
        }, [fetchPaymentMethods]),
    );

    const hasPaymentMethods = paymentMethods.length > 0;

    const handlePay = () => {
        if (!selectedPaymentMethodId) {
            Toast.show({
                type: "error",
                text1: "Vui lòng chọn phương thức thanh toán",
            });
            return;
        }

        Toast.show({
            type: "success",
            text1: "Thanh toán (demo)",
            text2: `${ticketLabel} • ${totalPrice.toLocaleString("vi-VN")} đồng`,
        });
    };

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Thanh toán" isIconBack={true} />

            {isLoading ? (
                <View className="mt-10 items-center">
                    <ActivityIndicator color="#005f8b" />
                </View>
            ) : (
                <>
                    <ScrollView
                        className="flex-1"
                        contentContainerClassName="gap-6 px-5 pb-6 pt-2"
                        showsVerticalScrollIndicator={false}
                    >
                        <FormSection title="Chọn phương thức thanh toán">
                            {hasPaymentMethods ? (
                                <View className="gap-2">
                                    {paymentMethods.map((method, index) => {
                                        const isSelected =
                                            selectedPaymentMethodId ===
                                            method._id;

                                        return (
                                            <Pressable
                                                key={method._id}
                                                accessibilityRole="button"
                                                onPress={() =>
                                                    setSelectedPaymentMethodId(
                                                        method._id,
                                                    )
                                                }
                                                className={`flex-row items-center gap-4 rounded-xl px-4 py-4 active:opacity-80 ${
                                                    index % 2 === 0
                                                        ? "bg-surface"
                                                        : "bg-background"
                                                }`}
                                            >
                                                <View className="h-11 w-11 items-center justify-center rounded-full bg-surface-elevated">
                                                    <Image
                                                        source={require("../../../../../assets/images/bank.png")}
                                                        className="h-6 w-6"
                                                    />
                                                </View>

                                                <View className="flex-1">
                                                    <Text className="text-base font-medium text-text-primary">
                                                        {getPaymentTitle(method)}
                                                    </Text>
                                                    <Text className="text-sm text-text-muted">
                                                        {getPaymentSubtitle(
                                                            method,
                                                        )}
                                                    </Text>
                                                </View>

                                                <View
                                                    className={cn(
                                                        "h-5 w-5 items-center justify-center rounded-full border-2",
                                                        isSelected
                                                            ? "border-primary bg-primary"
                                                            : "border-border bg-background",
                                                    )}
                                                >
                                                    {isSelected ? (
                                                        <Text className="text-[10px] font-bold text-on-primary">
                                                            ✓
                                                        </Text>
                                                    ) : null}
                                                </View>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            ) : (
                                <Text className="text-sm text-text-muted">
                                    Bạn chưa có phương thức thanh toán.
                                </Text>
                            )}

                            <Pressable
                                className="mt-2 flex-row items-center gap-2 active:opacity-80"
                                onPress={() => router.push("/payment/add")}
                            >
                                <Plus color="#005f8b" size={18} />
                                <Text className="text-sm font-medium text-accent">
                                    Thêm phương thức thanh toán khác
                                </Text>
                            </Pressable>
                        </FormSection>


                            <FormSection title="Thông tin hành khách">
                                <InfoRow
                                    label="Họ và tên"
                                    value={singleForm.fullName}
                                />
                                <InfoRow
                                    label="Số điện thoại"
                                    value={singleForm.phoneNumber}
                                />
                                <InfoRow
                                    label="Đối tượng ưu tiên"
                                    value="Không"
                                />
                            </FormSection>


                        <FormSection title="Thông tin lượt đi">
                            {routeCode ? (
                                <InfoRow
                                    label="Tuyến xe"
                                    value={`${routeCode}: ${searchContext?.originName ?? ""} - ${searchContext?.destinationName ?? ""}`}
                                />
                            ) : null}

                            {isSingleTicket ? (
                                <>
                                    <InfoRow
                                        label="Thời gian"
                                        value={`${singleForm.departureTime} ${singleForm.departureDate}`}
                                    />
                                    <InfoRow
                                        label="Số lượng ghế"
                                        value={`${(singleForm.seatCount || "0").padStart(2, "0")} ghế`}
                                    />
                                    <InfoRow
                                        label="Điểm lên"
                                        value={pickupStopName}
                                    />
                                    <InfoRow
                                        label="Điểm xuống"
                                        value={
                                            searchContext?.destinationName ?? ""
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <InfoRow
                                        label="Tháng sử dụng"
                                        value={monthlyForm.usageMonth}
                                    />
                                    <InfoRow
                                        label="Số lượng vé"
                                        value={`${(monthlyForm.ticketCount || "0").padStart(2, "0")} vé`}
                                    />
                                    <InfoRow
                                        label="Điểm lên"
                                        value="Không giới hạn"
                                    />
                                    <InfoRow
                                        label="Điểm xuống"
                                        value={
                                            searchContext?.destinationName ?? ""
                                        }
                                    />
                                </>
                            )}
                        </FormSection>
                    </ScrollView>

                    <FormFooter
                        price={totalPrice}
                        buttonLabel="Thanh toán"
                        disabled={!selectedPaymentMethodId}
                        onPress={handlePay}
                    />
                </>
            )}
        </View>
    );
}
