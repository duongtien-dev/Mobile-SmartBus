import InputText from "@/components/Input/InputText";
import type { BankFormData } from "@/screen/Payment/BankForm/types";
import { View } from "react-native";
import { FormField } from "@/components/Form/FormField";


type BankFormFieldsProps = {
    formData: BankFormData;
    onChange: (key: keyof BankFormData, value: string) => void;
};

export function BankFormFields({ formData, onChange }: BankFormFieldsProps) {
    return (
        <View className="gap-4">
            <FormField labelText="Tên ngân hàng" required={true}>
                <InputText
                    value={formData.bankName}
                    onChangeText={(value) => onChange("bankName", value)}
                />
            </FormField>
            <FormField labelText="Số tài khoản" required={true}>
                <InputText
                    value={formData.accountNumber}
                    onChangeText={(value) => onChange("accountNumber", value)}
                    keyboardType="number-pad"
                />
            </FormField>
            <FormField labelText="Số CCCD" required={true}>
                <InputText
                    value={formData.cccd}
                    onChangeText={(value) => onChange("cccd", value)}
                    keyboardType="number-pad"
                />
            </FormField>
            <FormField labelText="Tên in trên thẻ" required={true}>
                <InputText
                    value={formData.cardHolderName}
                    onChangeText={(value) => onChange("cardHolderName", value)}
                />
            </FormField>
            <FormField labelText="Số điện thoại" required={true}>
                <InputText
                    value={formData.phoneNumber}
                    onChangeText={(value) => onChange("phoneNumber", value)}
                    keyboardType="phone-pad"
                />
            </FormField>
            <FormField labelText="Email" required={true}>
                <InputText
                    value={formData.email}
                    onChangeText={(value) => onChange("email", value)}
                    keyboardType="email-address"
                />
            </FormField>
        </View>
    );
}
