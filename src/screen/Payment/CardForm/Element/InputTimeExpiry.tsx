import InputText from "@/components/Input/InputText";
import { cn } from "@/lib/utils";
import { Text, View, type ViewProps } from "react-native";

interface Props extends ViewProps {
    value: string;
    onChangeText: (value: string) => void;
}

export default function InputTimeExpiry({ value, onChangeText, className, ...props }: Props) {
    return (
        <View className={cn("gap-2 flex-1", className)} {...props}>
            <Text>Tháng/Năm hết hạn <Text className="text-alert">*</Text></Text>
            <InputText
                className={"w-full rounded-lg border-0 bg-surface px-4 h-12 shadow-sm"}
                keyboardType="number-pad"
                maxLength={5}
                placeholder="MM/YY"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}
