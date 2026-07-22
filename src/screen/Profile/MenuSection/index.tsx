import type { LucideIcon } from "lucide-react-native";
import { ProfileMenuItem } from "@/screen/Profile/MenuItem";
import { Text, View } from "react-native";

type MenuItem = {
    id: string;
    label: string;
    description?: string;
    icon: LucideIcon;
    destructive?: boolean;
};

type ProfileMenuSectionProps<T extends MenuItem> = {
    title: string;
    items: readonly T[];
    onItemPress: (item: T) => void;
};

export function ProfileMenuSection<T extends MenuItem>({
    title,
    items,
    onItemPress,
}: ProfileMenuSectionProps<T>) {
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
