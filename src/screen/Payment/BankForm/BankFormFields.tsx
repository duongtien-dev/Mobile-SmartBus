import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { useTranslation } from "@/i18n";
import type { BankFormData } from "@/screen/Payment/BankForm/types";
import { View } from "react-native";

type BankFormFieldsProps = {
    formData: BankFormData;
    onChange: (key: keyof BankFormData, value: string) => void;
};

export function BankFormFields({ formData, onChange }: BankFormFieldsProps) {
    const { t } = useTranslation();

    return (
        <View className="gap-4">
            <FormField labelText={t("payment.bankName")} required>
                <InputText
                    value={formData.bankName}
                    onChangeText={(value) => onChange("bankName", value)}
                />
            </FormField>
            <FormField labelText={t("payment.accountNumber")} required>
                <InputText
                    value={formData.accountNumber}
                    onChangeText={(value) => onChange("accountNumber", value)}
                    keyboardType="number-pad"
                />
            </FormField>
            <FormField labelText={t("payment.idNumber")} required>
                <InputText
                    value={formData.cccd}
                    onChangeText={(value) => onChange("cccd", value)}
                    keyboardType="number-pad"
                />
            </FormField>
            <FormField labelText={t("payment.cardName")} required>
                <InputText
                    value={formData.cardHolderName}
                    onChangeText={(value) => onChange("cardHolderName", value)}
                />
            </FormField>
            <FormField labelText={t("payment.phone")} required>
                <InputText
                    value={formData.phoneNumber}
                    onChangeText={(value) => onChange("phoneNumber", value)}
                    keyboardType="phone-pad"
                />
            </FormField>
            <FormField labelText={t("payment.email")} required>
                <InputText
                    value={formData.email}
                    onChangeText={(value) => onChange("email", value)}
                    keyboardType="email-address"
                />
            </FormField>
        </View>
    );
}
