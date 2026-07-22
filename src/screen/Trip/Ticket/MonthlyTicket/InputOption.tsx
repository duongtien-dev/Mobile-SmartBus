import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { Select } from "@/components/Select";
import { Text, View } from "react-native";

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export function InputOption({ value, onChange, options }: Props) {
    return (
        <View className="flex-row gap-3">
            <View className="flex-1">
                <FormField labelText="Giờ đi">
                    <InputText
                        value="Không giới hạn"
                        editable={false}
                        className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                    />
                </FormField>
            </View>

            <View className="flex-1 gap-2">
                <Text className="text-sm font-medium text-primary">
                    Số lượng vé <Text className="text-alert">*</Text>
                </Text>
                <Select
                    value={value}
                    onValueChange={(value) => onChange(value)}
                    placeholder="Chọn"
                    options={options}
                    triggerClassName="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </View>
        </View>
    );
}
