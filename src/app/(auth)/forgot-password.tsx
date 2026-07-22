import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { useToastify } from "@/hooks/useToastify";
import { authService } from "@/services/AuthService";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordScreen() {
    const showToast = useToastify();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const trimmedEmail = email.trim();
    const isFormValid = EMAIL_REGEX.test(trimmedEmail);

    const handleContinue = async () => {
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await authService.forgotPassword({
                email: trimmedEmail,
            });

            showToast({
                type: "success",
                content:
                    response.message ??
                    "OTP đã được gửi đến email. Hiệu lực 2 phút.",
            });

            router.push({
                pathname: "/forgot-otp" as never,
                params: { email: trimmedEmail },
            });
        } catch (error: any) {
            showToast({
                type: "error",
                content:
                    error?.response?.data?.message ??
                    "Không thể gửi OTP. Vui lòng thử lại.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-1 bg-background">
            <View
                className="absolute -right-24 -top-16 h-72 w-72 overflow-hidden rounded-full opacity-40"
                style={{ pointerEvents: "none" }}
            >
                <LinearGradient
                    colors={["#00a2e8", "#ffc20e"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </View>

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View className="flex-1 justify-center px-8">
                    <View className="items-center">
                        <Image
                            source={require("../../../assets/images/FAQ.png")}
                            style={{ width: "100%", height: 220 }}
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="mt-6 text-center text-2xl font-bold text-primary">
                        Quên mật khẩu?
                    </Text>
                    <Text className="mt-3 text-center text-base leading-6 text-primary">
                        Vui lòng nhập địa chỉ email, chúng tôi sẽ gửi mã OTP có
                        hiệu lực trong 02:00
                    </Text>

                    <View className="mt-8">
                        <InputText
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Nhập địa chỉ email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            className="h-12 w-full rounded-xl border-0 bg-surface px-4"
                        />
                    </View>

                    <View className="mt-6">
                        <Button
                            type="primary"
                            variant="bold"
                            className="w-full rounded-xl"
                            disabled={!isFormValid || isSubmitting}
                            onPress={handleContinue}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                "Tiếp tục"
                            )}
                        </Button>
                    </View>

                    <Pressable
                        className="mt-6 self-center active:opacity-80"
                        onPress={() => router.back()}
                    >
                        <Text className="text-sm font-medium text-accent">
                            Quay lại đăng nhập
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
