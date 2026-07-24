import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { authService } from "@/services/AuthService";
import { LinearGradient } from "expo-linear-gradient";
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
import Toast from "react-native-toast-message";

export default function Register() {
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirm: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegister = async () => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await authService.register(user);

            Toast.show({
                type: "success",
                text1: "Gửi OTP thành công",
                text2: response.data?.message ?? response.message,
            });

            router.push({
                pathname: "/verify-otp",
                params: { email: user.email },
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Đăng ký thất bại",
                text2: "Vui lòng kiểm tra lại thông tin và thử lại",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <LinearGradient
            colors={["#004a6e", "#0082ba", "#ffe082"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        paddingHorizontal: 20,
                        paddingVertical: 24,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="items-center">
                        <Image
                            source={require("../../../assets/images/logo.png")}
                            style={{ width: 200, height: 160 }}
                            resizeMode="contain"
                        />
                    </View>

                    <View className="mt-2 gap-4">
                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                Họ và tên
                            </Text>
                            <InputText
                                value={user.full_name}
                                onChangeText={(text) =>
                                    setUser({ ...user, full_name: text })
                                }
                                placeholder="Họ và tên"
                                autoCapitalize="words"
                                className="w-full rounded-xl border-0 bg-surface"
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                Email
                            </Text>
                            <InputText
                                value={user.email}
                                onChangeText={(text) =>
                                    setUser({ ...user, email: text })
                                }
                                placeholder="Email"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                className="w-full rounded-xl border-0 bg-surface"
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                Số điện thoại
                            </Text>
                            <InputText
                                value={user.phone}
                                onChangeText={(text) =>
                                    setUser({ ...user, phone: text })
                                }
                                placeholder="Số điện thoại"
                                keyboardType="phone-pad"
                                className="w-full rounded-xl border-0 bg-surface"
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                Mật khẩu
                            </Text>
                            <View className="relative">
                                <InputText
                                    value={user.password}
                                    onChangeText={(text) =>
                                        setUser({ ...user, password: text })
                                    }
                                    placeholder="Mật khẩu"
                                    className="w-full rounded-xl border-0 bg-surface"
                                    style={{ paddingRight: 40 }}
                                    secureTextEntry={!showPassword}
                                />
                                <Pressable
                                    onPress={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    hitSlop={8}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} color="#64748b" />
                                    ) : (
                                        <Eye size={18} color="#64748b" />
                                    )}
                                </Pressable>
                            </View>
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                Xác nhận mật khẩu
                            </Text>
                            <View className="relative">
                                <InputText
                                    value={user.password_confirm}
                                    onChangeText={(text) =>
                                        setUser({
                                            ...user,
                                            password_confirm: text,
                                        })
                                    }
                                    placeholder="Xác nhận mật khẩu"
                                    secureTextEntry={!showPasswordConfirm}
                                    className="w-full rounded-xl border-0 bg-surface"
                                    style={{ paddingRight: 40 }}
                                />
                                <Pressable
                                    onPress={() =>
                                        setShowPasswordConfirm((v) => !v)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    hitSlop={8}
                                >
                                    {showPasswordConfirm ? (
                                        <EyeOff size={18} color="#64748b" />
                                    ) : (
                                        <Eye size={18} color="#64748b" />
                                    )}
                                </Pressable>
                            </View>
                        </View>

                        <Button
                            type="accent"
                            variant="bold"
                            className="w-full rounded-xl"
                            disabled={isSubmitting}
                            onPress={handleRegister}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                "Đăng ký"
                            )}
                        </Button>

                        <View className="mt-2 items-center">
                            <Text className="text-sm text-on-primary">
                                Đã có tài khoản?{" "}
                                <Text
                                    className="font-semibold text-on-primary"
                                    onPress={() => router.back()}
                                >
                                    Đăng nhập
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
