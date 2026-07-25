import { StaffHeader } from "@/components/StaffHeader";
import { STAFF_NOTIFICATIONS_MOCK } from "@/constants/staff";
import { useTranslation } from "@/i18n";
import { Bell } from "lucide-react-native";
import { FlatList, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function StaffNotificationsScreen() {
    const { t } = useTranslation();

    return (
        <View className="flex-1 bg-card">
            <StaffHeader title={t("staff.notifications.title")} showBack />

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
                                {t(item.titleKey)}
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
                                    text1: t(
                                        "staff.notifications.detailTitle",
                                    ),
                                    text2: t(
                                        "staff.notifications.detailSoon",
                                    ),
                                })
                            }
                        >
                            <Text className="text-sm font-medium text-accent">
                                {t("staff.notifications.viewDetail")}
                            </Text>
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={
                    <Text className="py-10 text-center text-sm text-text-muted">
                        {t("staff.notifications.empty")}
                    </Text>
                }
            />
        </View>
    );
}
