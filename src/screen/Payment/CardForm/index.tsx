import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
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
import InputCSC from "./Element/InputCSC";
import InputCardName from "./Element/InputCardName";
import InputCardNumber from "./Element/InputCardNumber";
import InputEmail from "./Element/InputEmail";
import InputTimeExpiry from "./Element/InputTimeExpiry";

type Form = {
    cardNumber: string;
    expiry: string;
    csc: string;
    cardName: string;
    email: string;
};

export default function CardFormScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEdit = Boolean(id);
    const [isLoading, setIsLoading] = useState(isEdit);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Form>({
        cardNumber: "",
        expiry: "",
        csc: "",
        cardName: "",
        email: "",
    });

    useEffect(() => {
        if (!id) {
            return;
        }

        const loadPaymentMethod = async () => {
            setIsLoading(true);

            try {
                const response = await paymentService.getPaymentMethodById({ id });
                const method = response.data;

                if (!method) {
                    Toast.show({
                        type: "error",
                        text1: "Không tìm thấy phương thức thanh toán",
                    });
                    router.back();
                    return;
                }

                if (method.provider !== "visa") {
                    router.replace({
                        pathname: "/payment/bank",
                        params: { id },
                    });
                    return;
                }

                setFormData({
                    cardNumber: method.cardNumber ?? "",
                    expiry: method.expiryDate ?? "",
                    csc: method.csc ?? "",
                    cardName: method.cardHolderName ?? "",
                    email: method.email ?? "",
                });
            } catch {
                Toast.show({
                    type: "error",
                    text1: "Không thể tải phương thức thanh toán",
                });
                router.back();
            } finally {
                setIsLoading(false);
            }
        };

        loadPaymentMethod();
    }, [id]);

    const handleChange = (key: keyof Form, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const isFormValid =
        formData.cardNumber.trim() &&
        formData.expiry.trim() &&
        formData.csc.trim() &&
        formData.cardName.trim() &&
        formData.email.trim();

    const handleSubmit = async () => {
        if (!isFormValid || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        const body = {
            provider: "visa",
            cardNumber: formData.cardNumber.trim(),
            expiryDate: formData.expiry.trim(),
            csc: formData.csc.trim(),
            cardHolderName: formData.cardName.trim(),
            email: formData.email.trim(),
        };

        try {
            if (isEdit && id) {
                await paymentService.updatePayment({
                    id,
                    ...body,
                });

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
                        Thẻ tín dụng / Ghi nợ
                    </Text>

                    <View className="gap-4">
                        <InputCardNumber
                            value={formData.cardNumber}
                            onChangeText={(value) =>
                                handleChange("cardNumber", value)
                            }
                        />

                        <View className="flex-row gap-3">
                            <InputTimeExpiry
                                value={formData.expiry}
                                onChangeText={(value) =>
                                    handleChange("expiry", value)
                                }
                            />
                            <InputCSC
                                value={formData.csc}
                                onChangeText={(value) =>
                                    handleChange("csc", value)
                                }
                            />
                        </View>

                        <InputCardName
                            value={formData.cardName}
                            onChangeText={(value) =>
                                handleChange("cardName", value)
                            }
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
