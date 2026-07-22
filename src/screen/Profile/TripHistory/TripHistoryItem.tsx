import type { ITicket } from "@/models/ticket";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import {
    getTicketRouteTitle,
    getTicketTypeLabel,
    getTripHistoryStatusLabel,
    getTripHistoryTimeLabel,
} from "@/utils/ticket";
import { Bus } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type TripHistoryItemProps = {
    ticket: ITicket;
    onPress?: (ticket: ITicket) => void;
};

export function TripHistoryItem({ ticket, onPress }: TripHistoryItemProps) {
    const statusLabel = getTripHistoryStatusLabel(ticket);
    const typeLabel = getTicketTypeLabel(ticket.ticketType);

    return (
        <Pressable
            accessibilityRole="button"
            className="mb-3 active:opacity-90"
            onPress={() => onPress?.(ticket)}
        >
            <Card className="flex-row gap-3" padding="md">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-primary-light">
                    <Bus color="#005f8b" size={22} />
                </View>

                <View className="min-w-0 flex-1 gap-1">
                    <Text
                        className="text-base font-bold text-text-primary"
                        numberOfLines={2}
                    >
                        Tuyến {getTicketRouteTitle(ticket)}
                    </Text>
                    <Text className="text-sm text-text-muted" numberOfLines={1}>
                        {ticket.startStopName} → {ticket.endStopName}
                    </Text>
                    <Text className="text-sm text-text-muted">
                        {getTripHistoryTimeLabel(ticket)}
                    </Text>
                </View>

                <View className="items-end gap-1">
                    <StatusPill label={statusLabel} variant="muted" />
                    <Text className="text-xs text-text-muted">({typeLabel})</Text>
                </View>
            </Card>
        </Pressable>
    );
}
