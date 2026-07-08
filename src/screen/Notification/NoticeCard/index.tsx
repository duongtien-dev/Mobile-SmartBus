import { Bell } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export interface INotice {
    id: string;
    title: string;
    time: string;
    date: string;
};

export function NoticeCard({ item }: { item: INotice }) {
    return (
        <Pressable className="flex-row items-start gap-3 border-b border-border px-4 py-3 active:bg-surface">
            <View className="pt-0.5">
                <Bell color="#0f172a" size={18} strokeWidth={1.8} />
            </View>

            <View className="flex-1 gap-1">
                <Text className="text-sm font-medium leading-5 text-primary">
                    {item.title}
                </Text>
                <View className="flex-row items-center gap-3">
                    <Text className="text-[11px] text-disabled">{item.time}</Text>
                    <Text className="text-[11px] text-disabled">{item.date}</Text>
                </View>
            </View>

            <Text className="pt-0.5 text-xs font-medium text-accent">
                Xem chi tiết
            </Text>
        </Pressable>
    );
}
