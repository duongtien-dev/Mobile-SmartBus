import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { useToastify } from "@/hooks/useToastify";
import { BankFormFields } from "@/screen/Payment/BankForm/BankFormFields";
import {
    INITIAL_BANK_FORM,
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

export default function AddBankFormScreen() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BankFormData>(INITIAL_BANK_FORM);
    const showToast = useToastify();

    const handleChange = (key: keyof BankFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };


    const handleSubmit = async () => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        const payload = parseBankFormData(formData);
        const res = await paymentService.createPayment(payload);

        showToast({
            type: res.success ? "success" : "error",
            content: res.success ? "Thêm phương thức thành công" : "Thêm phương thức thất bại",
        });
        if (res.success) {
            router.replace("/payment");
        }
        setIsSubmitting(false);
    };

    return (
        <View className="flex-1 flex-col gap-5 bg-background">
            <PageHeader title="Thêm phương thức thanh toán" isIconBack />

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
                        disabled={isSubmitting}
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
