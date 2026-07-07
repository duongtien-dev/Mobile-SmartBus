import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
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
            >
                <View className="flex-1 justify-center px-5">
                    <View className="items-center">
                        <Image
                            source={require("../../../assets/images/logo.png")}
                            style={{ width: 255, height: 290 }}
                            resizeMode="contain"
                        />
                    </View>

                    <View className="gap-4">
                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                Tên đăng nhập
                            </Text>
                            <InputText
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Tên đăng nhập"
                                autoCapitalize="none"
                                className="w-full text"
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
                                    className="w-full pr-10"
                                />
                                <Pressable onPress={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2">
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

                        <Button type="accent" variant="bold"
                            onPress={() => router.push("/")}
                        >
                            Đăng nhập
                        </Button>
                    </View>

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

                        <Button
                            className="w-full rounded-xl bg-white text-primary font-bold text-md"
                            onPress={() => router.push("/register")}
                        >
                            Tạo tài khoản
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
