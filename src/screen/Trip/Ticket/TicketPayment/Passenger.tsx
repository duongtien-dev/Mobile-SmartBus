import { useTranslation } from "@/i18n";
import useAuthStore from "@/store/auth.store";
import { Phone, User } from "lucide-react-native";
import { Text, View } from "react-native";

const Passenger = () => {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);

    return (
        <View className="mb-6 rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <View className="mb-3 flex-row items-center gap-2">
                <User size={20} color="#005f8b" />
                <Text className="text-lg font-bold text-primary">
                    {t("ticket.payment.passenger")}
                </Text>
            </View>

            <View className="mt-1 gap-3">
                <View className="flex-row items-center gap-3">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-background">
                        <User size={18} color="#64748b" />
                    </View>
                    <View className="flex-1 border-b border-border/50 pb-2">
                        <Text className="text-xs text-text-muted">
                            {t("ticket.payment.fullName")}
                        </Text>
                        <Text className="mt-0.5 text-sm font-semibold text-text-primary">
                            {user?.full_name || t("common.na")}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center gap-3">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-background">
                        <Phone size={18} color="#64748b" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs text-text-muted">
                            {t("ticket.payment.phone")}
                        </Text>
                        <Text className="mt-0.5 text-sm font-semibold text-text-primary">
                            {user?.phone || t("common.na")}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Passenger;
