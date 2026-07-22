import { FormField } from "@/components/Form/FormField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Text, View } from "react-native";

const GENDER_OPTIONS: string[] = ["Nam", "Nữ"];

interface SelectGenderProps {
    value?: string;
    onChange: (value: string) => void;
}

export default function SelectGender({ value, onChange }: SelectGenderProps) {
    return (
        <FormField labelText="Giới tính" required={true}>
            <RadioGroup
                className="flex-row items-center gap-6"
                value={value}
                onValueChange={onChange}
            >
                {GENDER_OPTIONS.map((option) => {
                    return (
                        <View key={option} className="flex-row items-center gap-2"
                        >
                            <RadioGroupItem
                                value={option}
                            />
                            <Text>{option}</Text>
                        </View>
                    );
                })}
            </RadioGroup>
        </FormField>
    );
}
