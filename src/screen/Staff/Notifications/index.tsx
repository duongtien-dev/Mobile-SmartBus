import { StaffHeader } from "@/components/StaffHeader";
import { STAFF_NOTIFICATIONS_MOCK } from "@/constants/staff";
import { Bell } from "lucide-react-native";
import { FlatList, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function StaffNotificationsScreen() {
    return (
        <View className="flex-1 bg-card">
            <StaffHeader title="Thông báo" showBack />

            <FlatList
                data={STAFF_NOTIFICATIONS_MOCK}
                keyExtractor={(item) => item.id}
                contentContainerClassName="px-4 py-2"
                ItemSeparatorComponent={() => (
                    <View className="h-px bg-border" />
                )}
                renderItem={({ item }) => (
                    <View className="flex-row items-start gap-3 py-4">
                        <View className="mt-0.5">
                            <Bell color="#0f172a" size={20} />
                        </View>

                        <View className="min-w-0 flex-1 gap-1">
                            <Text className="text-[15px] font-bold text-primary">
                                {item.title}
                            </Text>
                            <Text className="text-xs text-text-muted">
                                {item.datetime}
                            </Text>
                        </View>

                        <Pressable
                            accessibilityRole="button"
                            className="pt-1 active:opacity-70"
                            onPress={() =>
                                Toast.show({
                                    type: "success",
                                    text1: "Chi tiết thông báo",
                                    text2: "Sẽ gắn API sau",
                                })
                            }
                        >
                            <Text className="text-sm font-medium text-accent">
                                Xem chi tiết
                            </Text>
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={
                    <Text className="py-10 text-center text-sm text-text-muted">
                        Chưa có thông báo
                    </Text>
                }
            />
        </View>
    );
}
