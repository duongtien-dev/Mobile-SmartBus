import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { useTranslation } from "@/i18n";
import Constants from "expo-constants";
import { router, type Href } from "expo-router";
import { Bus } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function AboutScreen() {
    const { t } = useTranslation();
    const version =
        Constants.expoConfig?.version ??
        Constants.nativeAppVersion ??
        "1.0.0";

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={t("profile.about.title")} isIconBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-4 px-5 pb-10 pt-5"
                showsVerticalScrollIndicator={false}
            >
                <Card className="items-center gap-3" padding="lg">
                    <View className="h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
                        <Bus color="#005f8b" size={32} />
                    </View>
                    <Text className="text-xl font-bold text-text-primary">
                        {t("profile.about.appName")}
                    </Text>
                    <Text className="text-center text-sm text-text-muted">
                        {t("profile.about.tagline")}
                    </Text>
                    <Text className="text-sm font-medium text-accent">
                        {t("profile.about.version", { version })}
                    </Text>
                </Card>

                <Card padding="md">
                    <Text className="text-sm leading-6 text-text-secondary">
                        {t("profile.about.description")}
                    </Text>
                </Card>

                <Pressable
                    accessibilityRole="button"
                    className="active:opacity-80"
                    onPress={() => router.push("/help" as Href)}
                >
                    <Card padding="md">
                        <Text className="text-center text-sm font-semibold text-primary">
                            {t("profile.about.helpCta")}
                        </Text>
                    </Card>
                </Pressable>
            </ScrollView>
        </View>
    );
}
