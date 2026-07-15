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

export default function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <LinearGradient
            colors={["#004a6e", "#0082ba", "#ffe082"]}
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
                                Họ và tên
                            </Text>
                            <InputText
                                value={user.username}
                                onChangeText={(text) => setUser({ ...user, username: text })}
                                placeholder="Họ và tên"
                                autoCapitalize="none"
                                className="w-full text"
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                Email
                            </Text>
                            <InputText
                                value={user.email}
                                onChangeText={(text) => setUser({ ...user, email: text })}
                                placeholder="Email"
                                autoCapitalize="none"
                                className="w-full text"
                            />
                        </View>

                        <View className="gap-2">
                            <Text className="text-sm font-medium text-on-primary">
                                Số điện thoại
                            </Text>
                            <InputText
                                value={user.phone}
                                onChangeText={(text) => setUser({ ...user, phone: text })}
                                placeholder="Số điện thoại"
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
                                    value={user.password}
                                    onChangeText={(text) => setUser({ ...user, password: text })}
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

                        <Button type="accent" variant="bold"
                            onPress={() => router.push("/")}
                        >
                            Đăng ký
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
