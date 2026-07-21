import { Pressable, Text, View } from "react-native";

type Props = {
    title: string;
    actionLabel?: string;
    onActionPress?: () => void;
};

export function SectionHeader({ ...Props }: Props) {
    // Destructure props
    const { title, actionLabel, onActionPress } = Props;
    // Destructure props

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
