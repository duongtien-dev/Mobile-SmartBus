import CheckBox from "@/components/Input/CheckBox";
import { useTranslation } from "@/i18n";
import { Pressable, Text, View } from "react-native";

interface Props {
    value: boolean;
    onChange: (value: boolean) => void;
}

export function InputTerm({ value, onChange }: Props) {
    const { t } = useTranslation();

    return (
        <View className="gap-4">
            <Text className="text-base font-bold text-primary">
                {t("ticket.terms.title")}
            </Text>
            <Text className="text-sm leading-6 text-text-muted">
                {t("ticket.terms.arriveEarly")}
            </Text>
            <Text className="text-sm leading-6 text-text-muted">
                {t("ticket.terms.noExchange")}
            </Text>

            <Pressable
                className="mt-2 flex-row items-center gap-3 active:opacity-80"
                onPress={() => onChange(!value)}
            >
                <View pointerEvents="none">
                    <CheckBox checked={value} />
                </View>

                <Text className="flex-1 text-sm leading-6 text-text-primary">
                    {t("ticket.terms.acceptPrivacy")}
                </Text>
            </Pressable>
        </View>
    );
}
