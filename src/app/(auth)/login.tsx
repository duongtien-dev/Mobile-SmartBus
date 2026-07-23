import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { useToastify } from "@/hooks/useToastify";
import { authService } from "@/services/AuthService";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
    const { setIsAuthenticated, setUser, setToken } = useAuthStore();
    const showToast = useToastify();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const response = await authService.login({ email, password });
        const { user, token } = response.data;

        setUser(user);
        setToken(token);
        setIsAuthenticated(true);

        showToast({
            type: response.success ? "success" : "error",
            content: response.success
                ? "Đăng nhập thành công"
                : "Đăng nhập thất bại",
        });
        if (response.success) {
            router.replace("/");
        }
        setIsSubmitting(false);
    };

    const isFormValid = email.trim() && password.trim();

    return (
        <LinearGradient
            colors={["#004a6e", "#0082ba", "#ffe082"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1"
        >
            <View className="flex-1 justify-center px-5">
                <View className="items-center">
                    <Image
                        source={require("../../../assets/images/logo.png")}
                        style={{ width: 255, height: 290 }}
                        resizeMode="contain"
                    />
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView
                        className="flex-1"
                        contentContainerClassName="px-5 pb-10"
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="gap-4">
                            <View className="gap-2">
                                <Text className="text-sm font-medium text-on-primary">
                                    Họ và tên
                                </Text>
                                <InputText
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Email"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    className="w-full rounded-xl border-0 bg-surface"
                                />
                            </View>

                            <View className="gap-2">
                                <Text className="text-sm font-medium text-on-primary">
                                    Mật khẩu
                                </Text>
                                <View className="relative">
                                    <InputText
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="Mật khẩu"
                                        secureTextEntry={!showPassword}
                                        className="w-full rounded-xl border-0 bg-surface pr-10"
                                    />
                                    <Pressable
                                        onPress={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} color="#64748b" />
                                        ) : (
                                            <Eye size={18} color="#64748b" />
                                        )}
                                    </Pressable>
                                </View>
                            </View>

                            <Pressable
                                className="self-end active:opacity-80"
                                onPress={() =>
                                    router.push("/forgot-password" as never)
                                }
                            >
                                <Text className="text-sm font-medium text-on-primary">
                                    Quên mật khẩu?
                                </Text>
                            </Pressable>

                            <Button
                                type="primary"
                                variant="bold"
                                className="w-full rounded-xl"
                                disabled={!isFormValid || isSubmitting}
                                onPress={handleLogin}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    "Đăng nhập"
                                )}
                            </Button>
                        </View>

                        <View className="mt-6 items-center gap-3">
                            <Text className="text-sm text-on-primary">
                                Chưa có tài khoản?{" "}
                                <Text
                                    className="font-semibold text-on-primary"
                                    onPress={() => router.push("/register")}
                                >
                                    Đăng ký ngay
                                </Text>
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    );
}
