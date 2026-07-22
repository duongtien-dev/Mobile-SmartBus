import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { Text, View } from "react-native";

interface Props {
    usageMonth: string;
}

export function TicketInfo({ usageMonth }: Props) {
    return (
        <View className="gap-4">
            <Text className="text-base font-bold text-primary">Thông tin lượt đi</Text>
            <FormField labelText="Trạm đón (Có thể lên tại bất kỳ trạm nào)">
                <InputText
                    value="Không giới hạn"
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>

            <FormField labelText="Tháng sử dụng">
                <InputText
                    value={usageMonth}
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>
        </View>
    );
}
