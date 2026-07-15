import { Button } from "@/components/Button";
import { DEMO_PROFILE_STATS, GUEST_PROFILE_STATS } from "@/constants/profile";
import { router } from "expo-router";
import { ChevronRight, UserRound } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type ProfileUserCardProps = {
    name?: string | null;
    email?: string | null;
    isAuthenticated: boolean;
    onEditPress?: () => void;
};

export function ProfileUserCard({
    name,
    email,
    isAuthenticated,
    onEditPress,
}: ProfileUserCardProps) {
    const stats = isAuthenticated ? DEMO_PROFILE_STATS : GUEST_PROFILE_STATS;

    return (
        <View className="overflow-hidden rounded-2xl bg-primary">
            <Pressable
                accessibilityRole="button"
                className="flex-row items-center gap-4 px-5 py-5 active:opacity-90"
                disabled={!isAuthenticated}
                onPress={onEditPress}
            >
                <View className="h-16 w-16 items-center justify-center rounded-full bg-on-primary/15">
                    <UserRound color="#ffffff" size={32} strokeWidth={1.8} />
                </View>

                <View className="flex-1 gap-1">
                    <Text className="text-lg font-bold text-on-primary">
                        {isAuthenticated ? (name ?? "Người dùng") : "Khách"}
                    </Text>
                    <Text className="text-sm text-on-primary/80">
                        {isAuthenticated
                            ? (email ?? "Chưa cập nhật email")
                            : "Đăng nhập để quản lý vé và điểm"}
                    </Text>
                </View>

                {isAuthenticated ? (
                    <ChevronRight color="#ffffff" size={20} />
                ) : null}
            </Pressable>

            <View className="flex-row border-t border-on-primary/15">
                {stats.map((stat, index) => (
                    <View
                        key={stat.id}
                        className={`flex-1 items-center px-2 py-3 ${
                            index > 0 ? "border-l border-on-primary/15" : ""
                        }`}
                    >
                        <Text className="text-base font-bold text-on-primary">
                            {stat.value}
                        </Text>
                        <Text className="mt-0.5 text-xs text-on-primary/75">
                            {stat.label}
                        </Text>
                    </View>
                ))}
            </View>

            {!isAuthenticated ? (
                <View className="border-t border-on-primary/15 px-5 py-4">
                    <Button
                        type="accent"
                        variant="bold"
                        className="w-full rounded-xl"
                        onPress={() => router.push("/login")}
                    >
                        Đăng nhập / Đăng ký
                    </Button>
                </View>
            ) : null}
        </View>
    );
}
