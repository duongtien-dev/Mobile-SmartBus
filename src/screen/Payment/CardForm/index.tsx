import { Button } from "@/components/Button";
import { router } from "expo-router";
import { ArrowLeft, Bell, Settings } from "lucide-react-native";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputCSC from "./Element/InputCSC";
import InputCardName from "./Element/InputCardName";
import InputCardNumber from "./Element/InputCardNumber";
import InputEmail from "./Element/InputEmail";
import InputTimeExpiry from "./Element/InputTimeExpiry";

type Form = {
    cardNumber: string;
    expiry: string;
    csc: string;
    cardName: string;
    email: string;
};

export default function CardFormScreen() {
    const insets = useSafeAreaInsets();
    const [formData, setFormData] = useState<Form>({
        cardNumber: "",
        expiry: "",
        csc: "",
        cardName: "",
        email: "",
    });

    const handleChange = (key: keyof Form, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <View
            className="flex-1 bg-background flex-col gap-5"
            style={{ paddingTop: insets.top }}
        >
            <View className="flex-row items-center justify-between px-4 pt-2">
                <Pressable
                    accessibilityRole="button"
                    className="h-10 w-10 items-center justify-center active:opacity-80"
                    onPress={() => router.back()}
                >
                    <ArrowLeft color="#005f8b" size={24} />
                </Pressable>

                <Text
                    className="flex-1 px-2 text-center text-base font-bold text-primary"
                    numberOfLines={1}
                >
                    Thêm phương thức thanh toán
                </Text>

                <View className="flex-row items-center gap-2">
                    <Pressable
                        accessibilityRole="button"
                        className="h-9 w-9 items-center justify-center active:opacity-80"
                    >
                        <Bell color="#005f8b" size={22} />
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        className="h-9 w-9 items-center justify-center active:opacity-80"
                    >
                        <Settings color="#005f8b" size={22} />
                    </Pressable>
                </View>
            </View>

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="flex-col gap-5 px-5"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text className="text-center text-base font-bold text-primary">
                        Thẻ tín dụng / Ghi nợ
                    </Text>

                    <View className="gap-4">
                        <InputCardNumber
                            value={formData.cardNumber}
                            onChangeText={(value) => handleChange("cardNumber", value)}
                        />

                        <View className="flex-row gap-3">
                            <InputTimeExpiry
                                value={formData.expiry}
                                onChangeText={(value) => handleChange("expiry", value)}
                            />
                            <InputCSC
                                value={formData.csc}
                                onChangeText={(value) => handleChange("csc", value)}
                            />
                        </View>

                        <InputCardName
                            value={formData.cardName}
                            onChangeText={(value) => handleChange("cardName", value)}
                        />
                        <InputEmail
                            value={formData.email}
                            onChangeText={(value) => handleChange("email", value)}
                        />
                    </View>

                    <Button type="primary" variant="bold" className="w-full rounded-lg"
                        onPress={() => {
                            // Hook up PaymentService later
                            router.back();
                        }}
                    >
                        Thêm phương thức
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
