import InputText from "@/components/Input/InputText";
import InputCardName from "@/screen/Payment/CardForm/Element/InputCardName";
import InputEmail from "@/screen/Payment/CardForm/Element/InputEmail";
import type { BankFormData } from "@/screen/Payment/BankForm/types";
import { Text, View } from "react-native";

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

type BankFormFieldsProps = {
    formData: BankFormData;
    onChange: (key: keyof BankFormData, value: string) => void;
};

export function BankFormFields({ formData, onChange }: BankFormFieldsProps) {
    return (
        <View className="gap-4">
            <InputField
                label="Tên ngân hàng"
                value={formData.bankName}
                onChangeText={(value) => onChange("bankName", value)}
            />
            <InputField
                label="Số tài khoản"
                value={formData.accountNumber}
                onChangeText={(value) => onChange("accountNumber", value)}
                keyboardType="number-pad"
            />
            <InputField
                label="Số CCCD"
                value={formData.cccd}
                onChangeText={(value) => onChange("cccd", value)}
                keyboardType="number-pad"
            />
            <InputCardName
                value={formData.cardHolderName}
                onChangeText={(value) => onChange("cardHolderName", value)}
            />
            <InputField
                label="Số điện thoại"
                value={formData.phoneNumber}
                onChangeText={(value) => onChange("phoneNumber", value)}
                keyboardType="phone-pad"
            />
            <InputEmail
                value={formData.email}
                onChangeText={(value) => onChange("email", value)}
            />
        </View>
    );
}
