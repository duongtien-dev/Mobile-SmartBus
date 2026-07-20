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
            className="flex-row items-center gap-4 rounded-2xl border border-primary/10 bg-white px-4 py-4 shadow-sm active:opacity-80"
            onPress={onPress}
        >
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Ticket color="#005f8b" size={30} strokeWidth={1.8} />
            </View>

            <View className="flex-1 gap-2">
                <View className="self-start rounded-full bg-primary/10 px-2.5 py-1">
                    <Text className="text-[11px] font-bold uppercase tracking-wide text-primary">
                        Vé xe buýt
                    </Text>
                </View>

                <Text className="text-lg font-bold text-primary">
                    {option.title}
                </Text>

                <View className="flex-row items-center gap-1.5">
                    <Clock color="#64748b" size={15} />
                    <Text className="text-sm text-text-muted">
                        {option.validity}
                    </Text>
                </View>

                <View className="mt-1 flex-row items-center gap-1.5">
                    <DollarSign size={16} />
                    <Text className="text-base font-semibold text-text-primary">
                        {option.priceLabel}
                    </Text>
                </View>
            </View>

            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ChevronRight color="#005f8b" size={20} />
            </View>
        </Pressable>
    );
}
