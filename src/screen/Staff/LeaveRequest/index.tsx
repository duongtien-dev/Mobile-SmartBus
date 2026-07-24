import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import TextArea from "@/components/Input/TextArea";
import { StaffHeader } from "@/components/StaffHeader";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function StaffLeaveRequestScreen() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        Toast.show({
            type: "success",
            text1: "Xin nghỉ",
            text2: "UI tạm — API sẽ gắn sau",
        });
    };

    return (
        <View className="flex-1 bg-app-shell">
            <StaffHeader title="Xin nghỉ" showBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-4 px-4 py-5 pb-10"
                keyboardShouldPersistTaps="handled"
            >
                <Text className="text-sm text-text-secondary">
                    Gửi yêu cầu nghỉ phép. Form UI tạm, chưa gọi API.
                </Text>

                <View className="gap-3 rounded-2xl bg-card p-4 shadow-sm">
                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Từ ngày
                        </Text>
                        <InputText
                            value={fromDate}
                            onChangeText={setFromDate}
                            placeholder="DD/MM/YYYY"
                        />
                    </View>

                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Đến ngày
                        </Text>
                        <InputText
                            value={toDate}
                            onChangeText={setToDate}
                            placeholder="DD/MM/YYYY"
                        />
                    </View>

                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Lý do
                        </Text>
                        <TextArea
                            value={reason}
                            onChangeText={setReason}
                            placeholder="Nhập lý do xin nghỉ"
                        />
                    </View>

                    <Button className="mt-2" onPress={handleSubmit}>
                        Gửi yêu cầu
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
