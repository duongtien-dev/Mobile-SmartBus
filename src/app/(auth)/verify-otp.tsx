import { Button } from "@/components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 120;

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

export default function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const [remainingSeconds, setRemainingSeconds] = useState(COUNTDOWN_SECONDS);

    useEffect(() => {
        if (remainingSeconds <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setRemainingSeconds((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingSeconds]);

    return (
        <View className="flex-1 bg-background">
            <View
                pointerEvents="none"
                className="absolute -right-24 -top-16 h-72 w-72 overflow-hidden rounded-full opacity-40"
            >
                <LinearGradient
                    colors={["#00a2e8", "#ffc20e"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </View>

            <View
                pointerEvents="none"
                className="absolute -bottom-20 -right-16 h-64 w-64 overflow-hidden rounded-full opacity-35"
            >
                <LinearGradient
                    colors={["#ffe082", "#00a2e8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </View>

            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <View className="flex-1 justify-center px-8">
                        <View className="items-center gap-3">
                            <Text className="text-2xl font-bold text-primary">
                                Xác thực OTP
                            </Text>
                            <Text className="text-center text-base text-primary">
                                Nhập mã OTP đã được gửi đến email của bạn
                            </Text>
                        </View>

                        <View className="mt-10 items-center gap-4">
                            <TextInput
                                value={otp}
                                onChangeText={(text) =>
                                    setOtp(text.replace(/\D/g, "").slice(0, OTP_LENGTH))
                                }
                                placeholder=""
                                keyboardType="number-pad"
                                maxLength={OTP_LENGTH}
                                textAlign="center"
                                className="w-full border-b border-text-primary pb-2 text-2xl tracking-[12px] text-text-primary"
                                underlineColorAndroid="transparent"
                            />

                            <Text className="text-base font-medium text-alert">
                                {formatTime(remainingSeconds)}
                            </Text>
                        </View>

                        <View className="mt-10">
                            <Button
                                type="primary"
                                variant="bold"
                                className="w-full rounded-xl"
                                disabled={otp.length < OTP_LENGTH}
                            >
                                Xác thực
                            </Button>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}
