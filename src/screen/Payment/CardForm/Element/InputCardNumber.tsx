import InputText from "@/components/Input/InputText";
import { cn } from "@/lib/utils";
import { Text, View, type ViewProps } from "react-native";

interface Props extends ViewProps {
    required?: boolean;
    value: string;
    onChangeText: (value: string) => void;
}

export default function InputCardNumber({ required = true, value, onChangeText, className, ...props }: Props) {
    return (
        <View className={cn("gap-1.5", className)} {...props}>
            <Text>Số thẻ {required ? <Text className="text-alert">*</Text> : null}</Text>
            <InputText
                className={"w-full rounded-lg border-0 bg-surface px-4 h-12 shadow-sm"}
                keyboardType="number-pad"
                maxLength={19}
                placeholder="Nhập số thẻ"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}
