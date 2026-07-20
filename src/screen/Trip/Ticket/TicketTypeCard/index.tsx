import type { TicketTypeOption } from "@/constants/ticket";
import { ChevronRight, Clock, DollarSign, Ticket } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type TicketTypeCardProps = {
    option: TicketTypeOption;
    onPress: () => void;
};

export function TicketTypeCard({ option, onPress }: TicketTypeCardProps) {
    return (
        <Pressable
            className="flex-row items-center gap-4 rounded-xl bg-surface px-4 py-4 shadow-sm active:opacity-80"
            onPress={onPress}
        >
            <Ticket color="#1f2937" size={28} strokeWidth={1.5} />

            <View className="flex-1 gap-1.5">
                <Text className="text-base font-bold text-primary">
                    {option.title}
                </Text>

                <View className="flex-row items-center gap-1.5">
                    <Clock color="#6b7280" size={14} />
                    <Text className="text-xs text-text-muted">
                        {option.validity}
                    </Text>
                </View>

                <View className="flex-row items-center gap-1.5">
                    <DollarSign color="#6b7280" size={14} />
                    <Text className="text-xs text-text-muted">
                        {option.priceLabel}
                    </Text>
                </View>
            </View>

            <View className="h-8 w-8 items-center justify-center rounded-full bg-surface-elevated">
                <ChevronRight color="#9ca3af" size={18} />
            </View>
        </Pressable>
    );
}
