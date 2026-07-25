import { FormField } from "@/components/Form/FormField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "@/i18n";
import { Text, View } from "react-native";

/** Giá trị gửi API giữ nguyên Nam/Nữ; chỉ label theo locale. */
const GENDER_OPTIONS = [
    { value: "Nam", labelKey: "profile.edit.genderMale" },
    { value: "Nữ", labelKey: "profile.edit.genderFemale" },
] as const;

interface SelectGenderProps {
    value?: string;
    onChange: (value: string) => void;
}

export default function SelectGender({ value, onChange }: SelectGenderProps) {
    const { t } = useTranslation();

    return (
        <FormField labelText={t("profile.edit.gender")} required>
            <RadioGroup
                className="flex-row items-center gap-6"
                value={value}
                onValueChange={onChange}
            >
                {GENDER_OPTIONS.map((option) => (
                    <View
                        key={option.value}
                        className="flex-row items-center gap-2"
                    >
                        <RadioGroupItem value={option.value} />
                        <Text>{t(option.labelKey)}</Text>
                    </View>
                ))}
            </RadioGroup>
        </FormField>
    );
}
