
import { Text, View } from "react-native";
import { Phone, User } from "lucide-react-native";
import useAuthStore from "@/store/auth.store";

const Passenger = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <View className="mb-6 rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <View className="mb-3 flex-row items-center gap-2">
                <User size={20} color="#005f8b" />
                <Text className="text-lg font-bold text-primary">Hành khách</Text>
            </View>

            <View className="gap-3 mt-1">
                <View className="flex-row items-center gap-3">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-background">
                        <User size={18} color="#64748b" />
                    </View>
                    <View className="flex-1 border-b border-border/50 pb-2">
                        <Text className="text-xs text-text-muted">Họ và tên</Text>
                        <Text className="text-sm font-semibold text-text-primary mt-0.5">
                            {user?.full_name || "N/A"}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center gap-3">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-background">
                        <Phone size={18} color="#64748b" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs text-text-muted">Số điện thoại</Text>
                        <Text className="text-sm font-semibold text-text-primary mt-0.5">
                            {user?.phone || "N/A"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Passenger;
