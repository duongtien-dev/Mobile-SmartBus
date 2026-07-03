import InputText from "@/components/Input/TextInput";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Eye, EyeOff, X } from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";

const GRADIENT_COLORS = ["#004a6e", "#0082ba", "#ffe082"] as const;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <LinearGradient
            colors={GRADIENT_COLORS}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="flex-1 justify-center px-6">
                    {/* Logo */}
                    <View className="mb-10 items-center">
                        <Image
                            source={require("../../../assets/images/logo.png")}
                            className="h-20 w-48"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Form */}
                    <View className="gap-4">
                        <View className="gap-1.5">
                            <Text className="text-sm font-medium text-on-primary">
                                Tên đăng nhập
                            </Text>
                            <View className="flex-row items-center rounded-xl bg-surface-elevated px-4">
                                <InputText
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder="Tên đăng nhập"
                                    autoCapitalize="none"
                                />
                                {username.length > 0 && (
                                    <Pressable onPress={() => setUsername("")}>
                                        <View className="h-5 w-5 items-center justify-center rounded-full bg-disabled">
                                            <X size={12} color="#fff" />
                                        </View>
                                    </Pressable>
                                )}
                            </View>
                        </View>

                        <View className="gap-1.5">
                            <Text className="text-sm font-medium text-on-primary">
                                Mật khẩu
                            </Text>
                            <View className="flex-row items-center rounded-xl bg-surface-elevated px-4">
                                <InputText
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Mật khẩu"
                                    secureTextEntry={!showPassword}
                                />
                                <Pressable onPress={() => setShowPassword((v) => !v)}>
                                    {showPassword ? (
                                        <EyeOff size={18} color="#64748b" />
                                    ) : (
                                        <Eye size={18} color="#64748b" />
                                    )}
                                </Pressable>
                            </View>
                        </View>

                        <Pressable className="self-end">
                            <Text className="text-sm text-on-primary">
                                Quên mật khẩu
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => router.push("/")}
                            className="h-12 items-center justify-center rounded-xl bg-accent active:opacity-80"
                        >
                            <Text className="text-base font-semibold text-on-accent">
                                Đăng nhập
                            </Text>
                        </Pressable>
                    </View>

                    {/* Footer */}
                    <View className="mt-10 items-center gap-4">
                        <Text className="text-sm text-on-primary">
                            Chưa có tài khoản?{" "}
                            <Text
                                className="font-semibold underline"
                                onPress={() => router.push("/register")}
                            >
                                Đăng ký ngay!
                            </Text>
                        </Text>

                        <Pressable
                            onPress={() => router.push("/register")}
                            className="h-12 w-full items-center justify-center rounded-xl bg-surface-elevated active:opacity-80"
                        >
                            <Text className="text-base font-semibold text-text-primary">
                                Tạo tài khoản
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
