import { Image } from "expo-image";
import { Settings } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/Button";
import { NewsCard } from "@/components/home/news-card";
import { QuickActionButton } from "@/components/home/quick-action-button";
import InputText from "@/components/Input/InputText";
import { NEWS_ITEMS, QUICK_ACTIONS } from "@/constants/home";

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-8"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row items-center justify-end gap-3 px-5 pt-2">
                    <Pressable className="h-9 w-9 items-center justify-center rounded-full border border-border bg-surface active:opacity-80">
                        <Text className="text-base">🇻🇳</Text>
                    </Pressable>
                    <Pressable
                        accessibilityRole="button"
                        className="h-9 w-9 items-center justify-center rounded-full active:opacity-80"
                    >
                        <Settings color="#00a2e8" size={22} />
                    </Pressable>
                </View>

                <View className="items-center px-6 pb-4 pt-2">
                    <Image
                        className="h-28 w-56"
                        contentFit="contain"
                        source={require("../../../assets/images/logo.png")}
                    />
                </View>

                <View className="gap-4 px-5">
                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Điểm đi
                        </Text>
                        <InputText
                            placeholder="Địa chỉ hiện tại"
                            value={origin}
                            onChangeText={setOrigin}
                            className="w-full"
                        />
                    </View>

                    <View className="gap-1.5">
                        <Text className="text-sm font-semibold text-text-primary">
                            Điểm đến
                        </Text>
                        <InputText
                            placeholder="Điểm đến"
                            value={destination}
                            onChangeText={setDestination}
                            className="w-full"
                        />
                    </View>

                    <Button
                        type="accent"
                        variant="bold"
                        className="w-full rounded-xl"
                    >
                        Tìm
                    </Button>
                </View>

                <View className="mt-6 flex-row px-3">
                    {QUICK_ACTIONS.map((action) => (
                        <QuickActionButton key={action.id} action={action} />
                    ))}
                </View>

                <View className="mt-8 px-5">
                    <View className="mb-4 flex-row items-center justify-between">
                        <Text className="text-sm font-bold tracking-wide text-primary">
                            KHÁM PHÁ TIN TỨC
                        </Text>
                        <Pressable className="active:opacity-80">
                            <Text className="text-sm font-medium text-accent">
                                Xem tất cả
                            </Text>
                        </Pressable>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerClassName="pr-5"
                    >
                        {NEWS_ITEMS.map((item) => (
                            <NewsCard key={item.id} item={item} />
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}
