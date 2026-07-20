import { Text, View } from "react-native";

type FormSectionProps = {
    title: string;
    children: React.ReactNode;
};

export function FormSection({ title, children }: FormSectionProps) {
    return (
        <View className="gap-4">
            <Text className="text-base font-bold text-primary">{title}</Text>
            {children}
        </View>
    );
}
