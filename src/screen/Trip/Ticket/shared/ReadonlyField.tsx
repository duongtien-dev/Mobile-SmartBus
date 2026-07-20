import InputText from "@/components/Input/InputText";
import { Text, View } from "react-native";

type ReadonlyFieldProps = {
    label?: string;
    value: string;
};

export function ReadonlyField({ label, value }: ReadonlyFieldProps) {
    return (
        <View className="gap-2">
            {label ? (
                <Text className="text-sm font-medium text-primary">
                    {label} <Text className="text-alert">*</Text>
                </Text>
            ) : null}
            <InputText
                value={value}
                editable={false}
                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
            />
        </View>
    );
}
