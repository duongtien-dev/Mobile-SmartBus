import { useTranslation } from "@/i18n";
import { formatVnd } from "@/constants/ticket";
import type { IPaymentMethod } from "@/models/paymentMethod";
import useAuthStore from "@/store/auth.store";
import { getPaymentSubtitle, getPaymentTitle } from "@/utils/payment";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Animated,
    PanResponder,
    Pressable,
    Text,
    View,
} from "react-native";

const CARD_GRADIENTS: [string, string][] = [
    ["#6B4EFF", "#8B74FF"],
    ["#F2A17C", "#E8895C"],
    ["#3D3A5C", "#5A5678"],
    ["#0EA5A4", "#14B8A6"],
];

const SWIPE_THRESHOLD = 48;

type WalletCardStackProps = {
    methods: IPaymentMethod[];
    onAdd: () => void;
    onCardPress: (method: IPaymentMethod) => void;
};

function maskNumber(method: IPaymentMethod) {
    const raw =
        method.cardNumber?.replace(/\s/g, "") ||
        method.accountNumber?.replace(/\s/g, "") ||
        "";
    if (raw.length >= 4) {
        return `•••• •••• •••• ${raw.slice(-4)}`;
    }
    return getPaymentSubtitle(method) || "•••• •••• •••• ••••";
}

function formatExp(method: IPaymentMethod) {
    if (method.expiryDate) return method.expiryDate;
    return "—";
}

export function WalletCardStack({
    methods,
    onAdd,
    onCardPress,
}: WalletCardStackProps) {
    const { t } = useTranslation();
    const user = useAuthStore((s) => s.user);
    const [activeIndex, setActiveIndex] = useState(0);
    const dragX = useRef(new Animated.Value(0)).current;

    const count = methods.length;
    const currentIndex = count > 0 ? activeIndex % count : 0;

    useEffect(() => {
        if (activeIndex >= count && activeIndex !== 0) {
            setActiveIndex(0);
        }
    }, [activeIndex, count]);

    const front = count > 0 ? methods[currentIndex] : undefined;
    const back =
        count > 1 ? methods[(currentIndex + 1) % count] : undefined;

    const frontColors =
        CARD_GRADIENTS[currentIndex % CARD_GRADIENTS.length];
    const backColors =
        CARD_GRADIENTS[(currentIndex + 1) % CARD_GRADIENTS.length];

    const holderName =
        front?.cardHolderName || user?.full_name || t("payment.cardGuest");

    const goTo = (next: number) => {
        if (count <= 1) return;
        const normalized = ((next % count) + count) % count;
        setActiveIndex(normalized);
        dragX.setValue(0);
    };

    const goNext = () => {
        setActiveIndex((prev) => {
            if (count <= 1) return prev;
            return (prev + 1) % count;
        });
        dragX.setValue(0);
    };

    const goPrev = () => {
        setActiveIndex((prev) => {
            if (count <= 1) return prev;
            return (prev - 1 + count) % count;
        });
        dragX.setValue(0);
    };

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (_, gesture) =>
                    count > 1 &&
                    Math.abs(gesture.dx) > 8 &&
                    Math.abs(gesture.dx) > Math.abs(gesture.dy),
                onPanResponderMove: (_, gesture) => {
                    dragX.setValue(gesture.dx);
                },
                onPanResponderRelease: (_, gesture) => {
                    if (gesture.dx <= -SWIPE_THRESHOLD) {
                        Animated.timing(dragX, {
                            toValue: -120,
                            duration: 120,
                            useNativeDriver: true,
                        }).start(() => {
                            setActiveIndex((prev) =>
                                count <= 1 ? prev : (prev + 1) % count,
                            );
                            dragX.setValue(0);
                        });
                        return;
                    }
                    if (gesture.dx >= SWIPE_THRESHOLD) {
                        Animated.timing(dragX, {
                            toValue: 120,
                            duration: 120,
                            useNativeDriver: true,
                        }).start(() => {
                            setActiveIndex((prev) =>
                                count <= 1
                                    ? prev
                                    : (prev - 1 + count) % count,
                            );
                            dragX.setValue(0);
                        });
                        return;
                    }
                    Animated.spring(dragX, {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 6,
                    }).start();
                },
                onPanResponderTerminate: () => {
                    Animated.spring(dragX, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                },
            }),
        [count, dragX],
    );

    return (
        <View className="px-5 pt-3">
            <View className="relative h-[236px]">
                {back ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={t("payment.nextCard")}
                        onPress={goNext}
                        className="absolute left-4 right-4 top-0 h-[170px] -rotate-[5deg] overflow-hidden rounded-[28px] opacity-95"
                    >
                        <LinearGradient
                            colors={backColors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ flex: 1, justifyContent: "space-between", padding: 20 }}
                        >
                            <Text className="text-sm font-bold text-white/90">
                                {getPaymentTitle(back)}
                            </Text>
                            <Text className="text-right text-[13px] tracking-widest text-white/85">
                                {maskNumber(back)}
                            </Text>
                        </LinearGradient>
                    </Pressable>
                ) : (
                    <View className="absolute left-4 right-4 top-0 h-[170px] -rotate-[5deg] overflow-hidden rounded-[28px] opacity-90">
                        <LinearGradient
                            colors={["#F5B897", "#ECA888"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ flex: 1 }}
                        />
                    </View>
                )}

                <Animated.View
                    {...(count > 1 ? panResponder.panHandlers : {})}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 26,
                        height: 196,
                        transform: [
                            {
                                translateX: dragX.interpolate({
                                    inputRange: [-140, 0, 140],
                                    outputRange: [-56, 0, 56],
                                    extrapolate: "clamp",
                                }),
                            },
                            {
                                rotate: dragX.interpolate({
                                    inputRange: [-140, 0, 140],
                                    outputRange: ["-4deg", "0deg", "4deg"],
                                    extrapolate: "clamp",
                                }),
                            },
                        ],
                    }}
                    className="overflow-hidden rounded-[28px] shadow-lg"
                >
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => (front ? onCardPress(front) : onAdd())}
                        className="flex-1"
                    >
                        <LinearGradient
                            colors={frontColors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ flex: 1, justifyContent: "space-between", paddingHorizontal: 22, paddingVertical: 16 }}
                        >
                            {front ? (
                                <>
                                    <View className="flex-row items-start justify-between">
                                        <Text numberOfLines={1} className="flex-1 pr-2 text-lg font-extrabold tracking-wide text-white">
                                            {getPaymentTitle(front).toUpperCase()}
                                        </Text>
                                        <Text className="text-[13px] font-medium tracking-wider text-white/90">
                                            {maskNumber(front)}
                                        </Text>
                                    </View>

                                    <View className="flex-row justify-between">
                                        <View className="flex-1 pr-3">
                                            <Text className="text-xs font-medium text-white/70">
                                                {t("payment.cardBalance")}
                                            </Text>
                                            <Text
                                                className="mt-1 text-[26px] font-extrabold text-white"
                                                numberOfLines={1}
                                            >
                                                {formatVnd(front.balance ?? 0)}
                                            </Text>
                                        </View>
                                        <View className="items-end">
                                            <Text className="text-xs font-medium text-white/70">
                                                {t("payment.cardExp")}
                                            </Text>
                                            <Text className="mt-1 text-[15px] font-bold text-white">
                                                {formatExp(front)}
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="pr-[138px]">
                                        <Text className="text-xs font-medium text-white/70">
                                            {t("payment.cardNameLabel")}
                                        </Text>
                                        <Text
                                            className="mt-1 text-[15px] font-semibold text-white"
                                            numberOfLines={1}
                                        >
                                            {holderName}
                                        </Text>
                                    </View>
                                </>
                            ) : (
                                <View className="flex-1 justify-center pb-3">
                                    <Text className="text-lg font-extrabold tracking-wide text-white">
                                        {t("payment.emptyBrand")}
                                    </Text>
                                    <Text className="mt-2.5 max-w-[85%] text-sm leading-5 text-white/90">
                                        {t("payment.emptyDesc")}
                                    </Text>
                                </View>
                            )}
                        </LinearGradient>

                        <View
                            pointerEvents="none"
                            className="absolute bottom-[-1px] right-2 h-[50px] w-[138px] rounded-t-[28px] bg-[#F3F2F7]"
                        />
                    </Pressable>
                </Animated.View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t("payment.addCard")}
                    onPress={onAdd}
                    className="absolute bottom-1.5 right-3.5 z-10 flex-row items-center gap-2 rounded-full bg-black px-4 py-3 shadow-md active:opacity-85"
                >
                    <Plus color="#fff" size={18} strokeWidth={2.6} />
                    <Text className="text-sm font-semibold text-white">
                        {t("payment.addCard")}
                    </Text>
                </Pressable>
            </View>

            {count > 1 ? (
                <View className="mt-3 flex-row items-center justify-center gap-3">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={t("payment.prevCard")}
                        onPress={goPrev}
                        className="h-9 w-9 items-center justify-center rounded-full bg-white active:opacity-70"
                    >
                        <ChevronLeft color="#1A1A1A" size={20} />
                    </Pressable>

                    <View className="flex-row items-center gap-1.5">
                        {methods.map((method, index) => (
                            <Pressable
                                key={method._id}
                                accessibilityRole="button"
                                onPress={() => goTo(index)}
                                className={`h-2 rounded-full ${
                                    index === currentIndex
                                        ? "w-5 bg-[#6B4EFF]"
                                        : "w-2 bg-black/20"
                                }`}
                            />
                        ))}
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={t("payment.nextCard")}
                        onPress={goNext}
                        className="h-9 w-9 items-center justify-center rounded-full bg-white active:opacity-70"
                    >
                        <ChevronRight color="#1A1A1A" size={20} />
                    </Pressable>
                </View>
            ) : null}
        </View>
    );
}
