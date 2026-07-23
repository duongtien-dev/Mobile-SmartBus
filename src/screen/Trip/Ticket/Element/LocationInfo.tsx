import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { Text, View } from "react-native";

interface Props {
    originName?: string;
    destinationName?: string;
};

export function LocationInfo({ originName, destinationName }: Props) {
    return (
        <View className="gap-4">
            <Text className="text-base font-bold text-primary">Điểm đi / đến</Text>
            <FormField labelText="Điểm đi">
                <InputText
                    value={originName ?? ""}
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>
            <FormField labelText="Điểm đến">
                <InputText
                    value={destinationName ?? ""}
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>
        </View>
    );
}
