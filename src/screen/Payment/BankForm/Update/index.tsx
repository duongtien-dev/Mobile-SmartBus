import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import useFetch from "@/hooks/useFetch";
import type { IPaymentMethod } from "@/models/paymentMethod";
import { BankFormFields } from "@/screen/Payment/BankForm/BankFormFields";
import {
    INITIAL_BANK_FORM,
    isBankFormValid,
    parseBankFormData,
    type BankFormData,
} from "@/screen/Payment/BankForm/types";
import { paymentService } from "@/services/PaymentService";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function UpdateBankFormScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BankFormData>(INITIAL_BANK_FORM);

    const {
        data: method,
        isLoading,
        loadFetchFn,
    } = useFetch<IPaymentMethod | null>({
        fetchFn: async () => {
            const response = await paymentService.getPaymentMethodById({ id });
            return response.data;
        },
    });

    useEffect(() => {
        if (!id) {
            router.back();
            return;
        }

        loadFetchFn();
    }, [id]);

    useEffect(() => {
        if (!method) {
            return;
        }

        setFormData({
            bankName: method.bankName ?? "",
            accountNumber: method.accountNumber ?? "",
            cccd: method.cccd ?? "",
            cardHolderName: method.cardHolderName ?? "",
            phoneNumber: method.phoneNumber ?? "",
            email: method.email ?? "",
        });
    }, [method]);

    const handleChange = (key: keyof BankFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const canSubmit = isBankFormValid(formData);

    const handleSubmit = async () => {
        if (!canSubmit || isSubmitting || !id) {
            return;
        }
        setIsSubmitting(true);

        try {
            const payload = parseBankFormData(formData);
            await paymentService.updatePayment({ id, ...payload });

            Toast.show({
                type: "success",
                text1: "Cập nhật phương thức thành công",
            });

            router.replace("/payment");
        } catch {
            Toast.show({
                type: "error",
                text1: "Cập nhật phương thức thất bại",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || !method) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    return (
        <View className="flex-1 flex-col gap-5 bg-background">
            <PageHeader title="Cập nhật phương thức thanh toán" />

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="flex-col gap-5 px-5 pb-8"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text className="text-center text-base font-bold text-primary">
                        Tài khoản / Thẻ ngân hàng
                    </Text>

                    <BankFormFields
                        formData={formData}
                        onChange={handleChange}
                    />

                    <Button
                        type="primary"
                        variant="bold"
                        className="w-full rounded-lg"
                        disabled={!canSubmit || isSubmitting}
                        onPress={handleSubmit}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            "Cập nhật phương thức"
                        )}
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
