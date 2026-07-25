import { Button } from "@/components/Button";
import { Card } from "@/components/ui/Card";
import { DEMO_PROFILE_STATS, GUEST_PROFILE_STATS } from "@/constants/profile";
import { useTranslation } from "@/i18n";
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
    const { t } = useTranslation();
    const stats = isAuthenticated ? DEMO_PROFILE_STATS : GUEST_PROFILE_STATS;

    return (
        <Card padding="none" className="overflow-hidden">
            <View className="h-1.5 bg-primary" />

            <Pressable
                accessibilityRole="button"
                className="flex-row items-center gap-4 px-5 py-5 active:opacity-90"
                disabled={!isAuthenticated}
                onPress={onEditPress}
            >
                <View className="h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary-light">
                    <UserRound color="#005f8b" size={32} strokeWidth={1.8} />
                </View>

                <View className="flex-1 gap-1">
                    <Text className="text-lg font-bold text-text-primary">
                        {isAuthenticated
                            ? (name ?? t("profile.user.fallbackName"))
                            : t("profile.user.guest")}
                    </Text>
                    <Text className="text-sm text-text-muted">
                        {isAuthenticated
                            ? (email ?? t("profile.user.noEmail"))
                            : t("profile.user.loginHint")}
                    </Text>
                </View>

                {isAuthenticated ? (
                    <ChevronRight color="#94a3b8" size={20} />
                ) : null}
            </Pressable>

            <View className="flex-row border-t border-border bg-surface/50">
                {stats.map((stat, index) => (
                    <View
                        key={stat.id}
                        className={`flex-1 items-center px-2 py-3 ${
                            index > 0 ? "border-l border-border" : ""
                        }`}
                    >
                        <Text className="text-base font-bold text-primary">
                            {stat.value}
                        </Text>
                        <Text className="mt-0.5 text-xs text-text-muted">
                            {t(stat.labelKey)}
                        </Text>
                    </View>
                ))}
            </View>

            {!isAuthenticated ? (
                <View className="border-t border-border px-5 py-4">
                    <Button
                        type="primary"
                        variant="bold"
                        className="w-full rounded-xl"
                        onPress={() => router.push("/login")}
                    >
                        {t("profile.user.loginCta")}
                    </Button>
                </View>
            ) : null}
        </Card>
    );
}
