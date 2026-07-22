import type { ITicket } from "@/models/ticket";
import {
    getTicketRouteTitle,
    getTicketTypeLabel,
    getTripHistoryStatusLabel,
    getTripHistoryTimeLabel,
} from "@/utils/ticket";
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
            className="mx-5 mb-3 flex-row gap-3 rounded-2xl border border-border bg-surface-elevated px-4 py-4 active:opacity-90"
            onPress={() => onPress?.(ticket)}
        >
            <View className="min-w-0 flex-1 gap-1">
                <Text className="text-base font-bold text-text-primary" numberOfLines={2}>
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
                <View className="rounded-full bg-text-muted/15 px-2.5 py-1">
                    <Text className="text-xs font-semibold text-text-muted">
                        {statusLabel}
                    </Text>
                </View>
                <Text className="text-xs text-text-muted">({typeLabel})</Text>
            </View>
        </Pressable>
    );
}
