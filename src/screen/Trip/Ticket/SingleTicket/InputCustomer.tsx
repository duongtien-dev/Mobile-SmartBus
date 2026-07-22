import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { Text, View } from "react-native";

interface Props {
    fullName: string;
    phoneNumber: string;
    onChangeName: (value: string) => void;
    onChangePhoneNumber: (value: string) => void;
}

export function InputCustomer({ fullName, phoneNumber, onChangeName, onChangePhoneNumber }: Props) {
    return (
        <View className="gap-4">
            <Text className="text-base font-bold text-primary">Thông tin khách hàng</Text>
            <FormField labelText="Họ và tên">
                <InputText
                    value={fullName}
                    onChangeText={(value) => onChangeName(value)}
                    placeholder="Nhập họ và tên"
                    className="h-12 rounded-xl"
                />
            </FormField>
            <FormField labelText="Số điện thoại">
                <InputText
                    value={phoneNumber}
                    onChangeText={(value) => onChangePhoneNumber(value)}
                    placeholder="Nhập số điện thoại"
                    keyboardType="phone-pad"
                    className="h-12 rounded-xl"
                />
            </FormField>
        </View>
    );
}
