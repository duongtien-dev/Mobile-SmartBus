import CheckBox from "@/components/Input/CheckBox";
import { Pressable, Text, View } from "react-native";

interface Props {
    value: boolean;
    onChange: (value: boolean) => void;
}
export function InputTerm({ value, onChange }: Props) {
    return (
        <View className="gap-4">
            <Text className="text-base font-bold text-primary">Điều khoản và lưu ý</Text>
            <Text className="text-sm leading-6 text-text-muted">
                (*) Quý khách vui lòng có mặt tại điểm đón trước ít nhất 10 phút so với thời gian đón.
            </Text>
            <Text className="text-sm leading-6 text-text-muted">
                (*) Vé đã mua không thể đổi, trả hoặc hoàn tiền.
            </Text>

            <Pressable
                className="mt-2 flex-row items-center gap-3 active:opacity-80"
                onPress={() => onChange(!value)}
            >
                <View pointerEvents="none">
                    <CheckBox checked={value} />
                </View>

                <Text className="flex-1 text-sm leading-6 text-text-primary">
                    Chấp nhận điều khoản & chính sách bảo mật.
                </Text>
            </Pressable>
        </View>
    );
}
