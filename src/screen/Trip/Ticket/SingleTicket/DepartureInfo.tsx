import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { Text, View } from "react-native";

interface Props {
    displayPickupStop: string;
    departureDate: string;
}

export function DepartureInfo({ displayPickupStop, departureDate }: Props) {
    return (
        <View className="gap-4">
            <Text className="text-base font-bold text-primary">Thông tin lượt đi</Text>
            <FormField labelText="Trạm đón (Trạm lên xe)">
                <InputText
                    value={displayPickupStop}
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>

            <FormField labelText="Ngày đi">
                <InputText
                    value={departureDate}
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>
        </View>
    );
}
