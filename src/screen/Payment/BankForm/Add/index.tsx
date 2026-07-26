import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { useToastify } from "@/hooks/useToastify";
import { useTranslation } from "@/i18n";
import { BankFormFields } from "@/screen/Payment/BankForm/BankFormFields";
import {
    INITIAL_BANK_FORM,
    parseBankFormData,
    type BankFormData,
} from "@/screen/Payment/BankForm/types";
import { paymentService } from "@/services/PaymentService";
import {
    bankFormSchema,
    validateSchema,
    type FieldErrors,
} from "@/utils/validators";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";

export default function AddBankFormScreen() {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BankFormData>(INITIAL_BANK_FORM);
    const [errors, setErrors] = useState<FieldErrors<keyof BankFormData>>({});
    const showToast = useToastify();

    const isFormValid = useMemo(
        () => validateSchema(bankFormSchema, formData).ok,
        [formData],
    );

    const handleChange = (key: keyof BankFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: undefined }));
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        const validation = validateSchema(bankFormSchema, formData);
        if (!validation.ok) {
            const nextErrors: FieldErrors<keyof BankFormData> = {};
            for (const [key, messageKey] of Object.entries(validation.errors)) {
                if (messageKey) {
                    nextErrors[key as keyof BankFormData] = t(messageKey);
                }
            }
            setErrors(nextErrors);
            showToast({
                type: "error",
                content: t("validation.formInvalid"),
            });
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const payload = parseBankFormData(validation.data);
            const res = await paymentService.createPayment(payload);

            showToast({
                type: res.success ? "success" : "error",
                content: res.success
                    ? t("payment.toastAddSuccess")
                    : t("payment.toastAddFail"),
            });
            if (res.success) {
                router.replace("/payment");
            }
        } catch (error: any) {
            showToast({
                type: "error",
                content:
                    error?.response?.data?.message ?? t("payment.toastAddFail"),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-1 flex-col gap-5 bg-background">
            <PageHeader title={t("payment.addTitle")} isIconBack />

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
                        {t("payment.bankSection")}
                    </Text>

                    <BankFormFields
                        formData={formData}
                        onChange={handleChange}
                        errors={errors}
                    />

                    <Button
                        type="primary"
                        variant="bold"
                        className="w-full rounded-lg"
                        disabled={!isFormValid || isSubmitting}
                        onPress={handleSubmit}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            t("payment.addCta")
                        )}
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
