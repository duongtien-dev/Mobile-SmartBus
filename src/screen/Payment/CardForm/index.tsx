import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
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
        <View className="flex-1 flex-col gap-5 bg-background">
            <PageHeader title="Thêm phương thức thanh toán" />

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
                            onChangeText={(value) =>
                                handleChange("cardNumber", value)
                            }
                        />

                        <View className="flex-row gap-3">
                            <InputTimeExpiry
                                value={formData.expiry}
                                onChangeText={(value) =>
                                    handleChange("expiry", value)
                                }
                            />
                            <InputCSC
                                value={formData.csc}
                                onChangeText={(value) =>
                                    handleChange("csc", value)
                                }
                            />
                        </View>

                        <InputCardName
                            value={formData.cardName}
                            onChangeText={(value) =>
                                handleChange("cardName", value)
                            }
                        />
                        <InputEmail
                            value={formData.email}
                            onChangeText={(value) =>
                                handleChange("email", value)
                            }
                        />
                    </View>

                    <Button
                        type="primary"
                        variant="bold"
                        className="w-full rounded-lg"
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
