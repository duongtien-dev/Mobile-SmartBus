import { Button } from "@/components/Button";
import { formatVnd } from "@/constants/ticket";
import { Text, View } from "react-native";

type FormFooterProps = {
    price: number;
    buttonLabel?: string;
    disabled?: boolean;
    onPress?: () => void;
};

export function FormFooter({
    price,
    buttonLabel = "Tiếp theo",
    disabled,
    onPress,
}: FormFooterProps) {
    return (
        <View className="border-t border-border bg-background px-5 pb-6 pt-4">
            <View className="flex-row items-center justify-between gap-4">
                <Text className="text-2xl font-bold text-primary">
                    {formatVnd(price)}
                </Text>

                <Button
                    type="primary"
                    variant="bold"
                    className="min-w-36"
                    disabled={disabled}
                    onPress={onPress}
                >
                    <Text className="font-bold text-on-primary">{buttonLabel}</Text>
                </Button>
            </View>
        </View>
    );
}
