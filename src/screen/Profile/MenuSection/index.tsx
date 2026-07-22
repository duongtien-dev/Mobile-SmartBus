import { Card } from "@/components/ui/Card";
import { ListRow } from "@/components/ui/ListRow";
import type { LucideIcon } from "lucide-react-native";
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
            <Card padding="none" shadow>
                {items.map((item, index) => (
                    <View key={item.id}>
                        <ListRow
                            label={item.label}
                            description={item.description}
                            icon={item.icon}
                            destructive={item.destructive}
                            onPress={() => onItemPress(item)}
                        />
                        {index < items.length - 1 ? (
                            <View className="mx-4 h-px bg-border" />
                        ) : null}
                    </View>
                ))}
            </Card>
        </View>
    );
}
