import InputText from "@/components/Input/InputText";
import { Text, View } from "react-native";

type FormFieldProps = {
    label: string;
    required?: boolean;
    value?: string;
    placeholder?: string;
    onChangeText?: (value: string) => void;
    keyboardType?: "default" | "number-pad" | "email-address" | "phone-pad";
};

export function FormField({
    label,
    required = true,
    value,
    placeholder,
    onChangeText,
    keyboardType = "default",
}: FormFieldProps) {
    return (
        <View className="gap-2">
            <Text className="text-sm font-medium text-primary">
                {label}
                {required ? <Text className="text-alert"> *</Text> : null}
            </Text>
            <InputText
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
            />
        </View>
    );
}
