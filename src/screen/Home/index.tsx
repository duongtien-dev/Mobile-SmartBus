import { Button } from "@/components/Button";
import InputText from "@/components/Input/InputText";
import { NEWS_ITEMS, QUICK_ACTIONS } from "@/constants/home";
import { ROUTES } from "@/constants/routes";
import { router } from "expo-router";
import { Settings } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NewsCard } from "./NewCard";
import { QuickActionButton } from "./QuickAction";

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
            <ScrollView
                className="flex-1"
                contentContainerClassName="p-5 flex-col gap-3"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row items-center justify-end gap-2">
                    <Pressable
                        accessibilityRole="button"
                        className="h-9 w-9 items-center justify-center rounded-full active:opacity-80"
                    >
                        <Settings color="#00a2e8" size={30} />
                    </Pressable>
                </View>

                <View className="gap-4">
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

                <View className="mt-6 flex-row">
                    {QUICK_ACTIONS.map((action) => (
                        <QuickActionButton key={action.id} action={action} />
                    ))}
                </View>

                <View className="mt-8">
                    <View className="mb-4 flex-row items-center justify-between">
                        <Text className="text-sm font-bold tracking-wide text-primary">
                            KHÁM PHÁ TIN TỨC
                        </Text>
                        <Pressable
                            className="active:opacity-80"
                            onPress={() => router.push(ROUTES.pages.news)}
                        >
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
                            <NewsCard
                                key={item.id}
                                item={item}
                                onPress={() =>
                                    router.push(ROUTES.pages.noticeDetail(item.id))
                                }
                            />
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}
