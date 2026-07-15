import type { ProfileMenuItem as ProfileMenuItemType } from "@/constants/profile";
import { ProfileMenuItem } from "@/screen/Profile/MenuItem";
import { Text, View } from "react-native";

type ProfileMenuSectionProps = {
    title: string;
    items: ProfileMenuItemType[];
    onItemPress: (item: ProfileMenuItemType) => void;
};

export function ProfileMenuSection({
    title,
    items,
    onItemPress,
}: ProfileMenuSectionProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <View className="gap-2">
            <Text className="px-1 text-xs font-bold tracking-wide text-text-muted">
                {title.toUpperCase()}
            </Text>
            <View className="overflow-hidden rounded-xl border border-border bg-surface-elevated">
                {items.map((item, index) => (
                    <ProfileMenuItem
                        key={item.id}
                        label={item.label}
                        description={item.description}
                        icon={item.icon}
                        index={index}
                        destructive={item.destructive}
                        onPress={() => onItemPress(item)}
                    />
                ))}
            </View>
        </View>
    );
}
