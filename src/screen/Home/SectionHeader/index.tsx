import { Pressable, Text, View } from "react-native";

type SectionHeaderProps = {
    title: string;
    actionLabel?: string;
    onActionPress?: () => void;
};

export function SectionHeader({
    title,
    actionLabel,
    onActionPress,
}: SectionHeaderProps) {
    return (
        <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-sm font-bold tracking-wide text-primary">
                {title}
            </Text>
            {actionLabel && onActionPress ? (
                <Pressable className="active:opacity-80" onPress={onActionPress}>
                    <Text className="text-sm font-medium text-accent">
                        {actionLabel}
                    </Text>
                </Pressable>
            ) : null}
        </View>
    );
}
