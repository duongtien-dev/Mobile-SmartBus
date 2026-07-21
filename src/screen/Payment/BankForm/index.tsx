import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { PageHeader } from "@/components/PageHeader";
import useFetch from "@/hooks/useFetch";
import type { IPaymentMethod } from "@/models/paymentMethod";
import InputCardName from "@/screen/Payment/CardForm/Element/InputCardName";
import InputEmail from "@/screen/Payment/CardForm/Element/InputEmail";
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

type Form = {
    bankName: string;
    accountNumber: string;
    cccd: string;
    cardHolderName: string;
    phoneNumber: string;
    email: string;
};

function InputField({
    label,
    value,
    onChangeText,
    keyboardType,
    autoCapitalize,
}: {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    keyboardType?: "default" | "number-pad" | "email-address" | "phone-pad";
    autoCapitalize?: "none" | "characters" | "sentences" | "words";
}) {
    return (
        <View className="gap-2">
            <Text>
                {label} <Text className="text-alert">*</Text>
            </Text>
            <InputText
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                className="h-12 w-full rounded-lg border-0 bg-surface px-4 shadow-sm"
            />
        </View>
    );
}

export default function BankFormScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEdit = Boolean(id);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Form>({
        bankName: "",
        accountNumber: "",
        cccd: "",
        cardHolderName: "",
        phoneNumber: "",
        email: "",
    });

    const {
        data: method,
        isLoading,
        loadFetchFn,
    } = useFetch<IPaymentMethod | null>({
        fetchFn: async () => {
            const response = await paymentService.getPaymentMethodById({
                id,
            });
            return response.data;
        },
    });

    useEffect(() => {
        if (!isEdit) {
            return;
        }

        loadFetchFn();
    }, [id, isEdit]);

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

    const handleChange = (key: keyof Form, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const isFormValid =
        formData.bankName.trim() &&
        formData.accountNumber.trim() &&
        formData.cccd.trim() &&
        formData.cardHolderName.trim() &&
        formData.phoneNumber.trim() &&
        formData.email.trim();

    const handleSubmit = async () => {
        if (!isFormValid || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        const body = {
            provider: "napas",
            bankName: formData.bankName.trim(),
            accountNumber: formData.accountNumber.trim(),
            cccd: formData.cccd.trim(),
            cardHolderName: formData.cardHolderName.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            email: formData.email.trim(),
        };

        try {
            if (isEdit && id) {
                await paymentService.updatePayment({ id, ...body });
                Toast.show({
                    type: "success",
                    text1: "Cập nhật phương thức thành công",
                });
            } else {
                await paymentService.createPayment(body);
                Toast.show({
                    type: "success",
                    text1: "Thêm phương thức thành công",
                });
            }

            router.replace("/payment");
        } catch {
            Toast.show({
                type: "error",
                text1: isEdit
                    ? "Cập nhật phương thức thất bại"
                    : "Thêm phương thức thất bại",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    return (
        <View className="flex-1 flex-col gap-5 bg-background">
            <PageHeader
                title={
                    isEdit
                        ? "Cập nhật phương thức thanh toán"
                        : "Thêm phương thức thanh toán"
                }
            />

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

                    <View className="gap-4">
                        <InputField
                            label="Tên ngân hàng"
                            value={formData.bankName}
                            onChangeText={(value) =>
                                handleChange("bankName", value)
                            }
                        />
                        <InputField
                            label="Số tài khoản"
                            value={formData.accountNumber}
                            onChangeText={(value) =>
                                handleChange("accountNumber", value)
                            }
                            keyboardType="number-pad"
                        />
                        <InputField
                            label="Số CCCD"
                            value={formData.cccd}
                            onChangeText={(value) =>
                                handleChange("cccd", value)
                            }
                            keyboardType="number-pad"
                        />
                        <InputCardName
                            value={formData.cardHolderName}
                            onChangeText={(value) =>
                                handleChange("cardHolderName", value)
                            }
                        />
                        <InputField
                            label="Số điện thoại"
                            value={formData.phoneNumber}
                            onChangeText={(value) =>
                                handleChange("phoneNumber", value)
                            }
                            keyboardType="phone-pad"
                        />
                        <InputEmail
                            value={formData.email}
                            onChangeText={(value) =>
                                handleChange("email", value)
                            }
                        />
                    </View>

                    <Button
                        type="primary"
                        variant="bold"
                        className="w-full rounded-lg"
                        disabled={!isFormValid || isSubmitting}
                        onPress={handleSubmit}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : isEdit ? (
                            "Cập nhật phương thức"
                        ) : (
                            "Thêm phương thức"
                        )}
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
