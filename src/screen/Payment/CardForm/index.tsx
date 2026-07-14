import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { router } from "expo-router";
import { ArrowLeft, Bell, Settings } from "lucide-react-native";
import { useState, type ReactNode } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FieldProps = {
    label: string;
    required?: boolean;
    children: ReactNode;
};

function Field({ label, required = true, children }: FieldProps) {
    return (
        <View className="gap-1.5">
            <Text className="text-sm font-semibold text-primary">
                {label}
                {required ? (
                    <Text className="text-alert"> *</Text>
                ) : null}
            </Text>
            {children}
        </View>
    );
}

const fieldClassName =
    "w-full rounded-lg border-0 bg-surface px-4 py-3.5 shadow-sm";

export default function CardFormScreen() {
    const insets = useSafeAreaInsets();
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [csc, setCsc] = useState("");
    const [cardName, setCardName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <View
            className="flex-1 bg-background"
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
                    contentContainerClassName="px-5 pb-10 pt-6"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text className="mb-6 text-center text-base font-bold text-primary">
                        Thẻ tín dụng / Ghi nợ
                    </Text>

                    <View className="gap-4">
                        <Field label="Số thẻ">
                            <InputText
                                className={fieldClassName}
                                keyboardType="number-pad"
                                maxLength={19}
                                placeholder=""
                                value={cardNumber}
                                onChangeText={setCardNumber}
                            />
                        </Field>

                        <View className="flex-row gap-3">
                            <View className="flex-1">
                                <Field label="Tháng/Năm hết hạn">
                                    <InputText
                                        className={fieldClassName}
                                        keyboardType="number-pad"
                                        maxLength={5}
                                        placeholder="MM/YY"
                                        value={expiry}
                                        onChangeText={setExpiry}
                                    />
                                </Field>
                            </View>
                            <View className="w-28">
                                <Field label="CSC">
                                    <InputText
                                        className={fieldClassName}
                                        keyboardType="number-pad"
                                        maxLength={4}
                                        placeholder=""
                                        secureTextEntry
                                        value={csc}
                                        onChangeText={setCsc}
                                    />
                                </Field>
                            </View>
                        </View>

                        <Field label="Tên in trên thẻ (không dấu)">
                            <InputText
                                autoCapitalize="characters"
                                className={fieldClassName}
                                placeholder=""
                                value={cardName}
                                onChangeText={setCardName}
                            />
                        </Field>

                        <Field label="Email">
                            <InputText
                                autoCapitalize="none"
                                className={fieldClassName}
                                keyboardType="email-address"
                                placeholder=""
                                value={email}
                                onChangeText={setEmail}
                            />
                        </Field>
                    </View>

                    <Button
                        type="primary"
                        variant="bold"
                        className="mt-8 w-full rounded-lg"
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
