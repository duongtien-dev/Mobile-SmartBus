import InputText from "@/components/Input/InputText";
import { cn } from "@/lib/utils";
import { Text, View, type ViewProps } from "react-native";

interface Props extends ViewProps {
    value: string;
    onChangeText: (value: string) => void;
}

export default function InputEmail({ value, onChangeText, className, ...props }: Props) {
    return (
        <View className={cn("gap-2", className)} {...props}>
            <Text>Email <Text className="text-alert">*</Text></Text>
            <InputText
                autoCapitalize="none"
                className={"w-full rounded-lg border-0 bg-surface px-4 h-12 shadow-sm"}
                keyboardType="email-address"
                placeholder=""
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}
