import { Select } from "@/components/Select";
import { Text, View } from "react-native";

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export function InputSeat({ value, onChange, options }: Props) {
    return (
        <View className="flex-1 gap-2">
            <Text className="text-sm font-medium text-primary">
                Số lượng ghế <Text className="text-alert">*</Text>
            </Text>
            <Select
                value={value}
                onValueChange={(value) => onChange(value)}
                placeholder="Chọn số lượng ghế"
                options={options}
                triggerClassName="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
            />
        </View>
    );
}
