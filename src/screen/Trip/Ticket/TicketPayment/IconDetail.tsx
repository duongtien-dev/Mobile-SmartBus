import { Text, View } from "react-native";

interface IconDetailProps {
    icon: any;
    label: string;
    value: string;
}

const IconDetail = ({ icon: Icon, label, value }: IconDetailProps) => (
    <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-1.5">
            <Icon size={14} color="#64748b" />
            <Text className="text-xs text-text-muted">{label}</Text>
        </View>
        <Text className="text-sm font-medium text-text-primary" numberOfLines={1}>
            {value}
        </Text>
    </View>
);

export default IconDetail;
