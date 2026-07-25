import { Select } from "@/components/Select";
import { useTranslation } from "@/i18n";
import { Text, View } from "react-native";

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export function InputTime({ value, onChange, options }: Props) {
    const { t } = useTranslation();

    return (
        <View className="flex-1 gap-2">
            <Text className="text-sm font-medium text-primary">
                {t("ticket.single.departureTime")}{" "}
                <Text className="text-alert">{t("common.required")}</Text>
            </Text>
            <Select
                value={value}
                onValueChange={(next) => onChange(next)}
                placeholder={t("ticket.single.selectTime")}
                options={options}
                triggerClassName="h-12 rounded-xl"
            />
        </View>
    );
}
