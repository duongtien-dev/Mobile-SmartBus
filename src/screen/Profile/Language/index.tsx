import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { ListRow } from "@/components/ui/ListRow";
import { useTranslation } from "@/i18n";
import { APP_LOCALE_OPTIONS, type AppLocale } from "@/i18n/localeConfig";
import { translate } from "@/i18n/translations";
import { Check } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function LanguageSettingsScreen() {
    const { t, locale, setLocale } = useTranslation();

    const handleSelect = async (code: AppLocale) => {
        if (code === locale) return;
        await setLocale(code);
        Toast.show({
            type: "success",
            text1: translate(code, "language.changed"),
        });
    };

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={t("language.title")} isIconBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-4 px-5 pb-10 pt-5"
                showsVerticalScrollIndicator={false}
            >
                <Text className="px-1 text-sm text-text-muted">
                    {t("language.subtitle")}
                </Text>

                <Card padding="none" shadow>
                    {APP_LOCALE_OPTIONS.map((option, index) => {
                        const selected = option.code === locale;
                        return (
                            <View key={option.code}>
                                <ListRow
                                    label={option.nativeLabel}
                                    description={option.secondaryLabel}
                                    showChevron={false}
                                    trailing={
                                        selected ? (
                                            <Check
                                                color="#00a2e8"
                                                size={20}
                                                strokeWidth={2.5}
                                            />
                                        ) : (
                                            <View className="h-5 w-5" />
                                        )
                                    }
                                    onPress={() => handleSelect(option.code)}
                                    accessibilityState={{ selected }}
                                />
                                {index < APP_LOCALE_OPTIONS.length - 1 ? (
                                    <View className="mx-4 h-px bg-border" />
                                ) : null}
                            </View>
                        );
                    })}
                </Card>
            </ScrollView>
        </View>
    );
}
