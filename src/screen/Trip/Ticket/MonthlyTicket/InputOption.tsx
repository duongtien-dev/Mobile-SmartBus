import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { Select } from "@/components/Select";
import { useTranslation } from "@/i18n";
import { Text, View } from "react-native";

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export function InputOption({ value, onChange, options }: Props) {
    const { t } = useTranslation();

    return (
        <View className="flex-row gap-3">
            <View className="flex-1">
                <FormField labelText={t("ticket.monthly.departureTime")}>
                    <InputText
                        value={t("ticket.monthly.unlimited")}
                        editable={false}
                        className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                    />
                </FormField>
            </View>

            <View className="flex-1 gap-2">
                <Text className="text-sm font-medium text-primary">
                    {t("ticket.monthly.ticketCount")}{" "}
                    <Text className="text-alert">{t("common.required")}</Text>
                </Text>
                <Select
                    value={value}
                    onValueChange={(next) => onChange(next)}
                    placeholder={t("ticket.monthly.select")}
                    options={options}
                    triggerClassName="h-12 rounded-xl border border-border bg-surface px-4 shadow-sm focus:border-primary focus:outline-none"
                />
            </View>
        </View>
    );
}
