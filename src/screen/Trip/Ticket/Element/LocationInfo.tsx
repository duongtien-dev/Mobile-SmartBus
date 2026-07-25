import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { useTranslation } from "@/i18n";
import { Text, View } from "react-native";

interface Props {
    originName?: string;
    destinationName?: string;
}

export function LocationInfo({ originName, destinationName }: Props) {
    const { t } = useTranslation();

    return (
        <View className="gap-4">
            <Text className="text-base font-bold text-primary">
                {t("ticket.location.section")}
            </Text>
            <FormField labelText={t("common.origin")}>
                <InputText
                    value={originName}
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>
            <FormField labelText={t("common.destination")}>
                <InputText
                    value={destinationName}
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>
        </View>
    );
}
