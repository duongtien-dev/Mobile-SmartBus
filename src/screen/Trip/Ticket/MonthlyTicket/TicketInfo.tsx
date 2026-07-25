import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { useTranslation } from "@/i18n";
import { Text, View } from "react-native";

interface Props {
    usageMonth: string;
}

export function TicketInfo({ usageMonth }: Props) {
    const { t } = useTranslation();

    return (
        <View className="gap-4">
            <Text className="text-base font-bold text-primary">
                {t("ticket.single.tripInfo")}
            </Text>
            <FormField labelText={t("ticket.monthly.pickupHint")}>
                <InputText
                    value={t("ticket.monthly.unlimited")}
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>

            <FormField labelText={t("ticket.monthly.useMonth")}>
                <InputText
                    value={usageMonth}
                    editable={false}
                    className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                />
            </FormField>
        </View>
    );
}
