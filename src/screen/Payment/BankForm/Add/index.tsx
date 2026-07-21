import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { BankFormFields } from "@/screen/Payment/BankForm/BankFormFields";
import {
    INITIAL_BANK_FORM,
    isBankFormValid,
    parseBankFormData,
    type BankFormData,
} from "@/screen/Payment/BankForm/types";
import { paymentService } from "@/services/PaymentService";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function AddBankFormScreen() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BankFormData>(INITIAL_BANK_FORM);

    const handleChange = (key: keyof BankFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const canSubmit = isBankFormValid(formData);

    const handleSubmit = async () => {
        if (!canSubmit || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = parseBankFormData(formData);
            await paymentService.createPayment(payload);

            Toast.show({
                type: "success",
                text1: "Thêm phương thức thành công",
            });

            router.replace("/payment");
        } catch {
            Toast.show({
                type: "error",
                text1: "Thêm phương thức thất bại",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-1 flex-col gap-5 bg-background">
            <PageHeader title="Thêm phương thức thanh toán" />

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
                            "Thêm phương thức"
                        )}
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
