import type { ITicket } from "@/models/ticket";
import {
    getTicketRouteTitle,
    getTicketStatusConfig,
    getTicketSubtitle,
    getTicketTypeLabel,
    getTicketValidityLabel,
} from "@/utils/ticket";
import { Image } from "expo-image";
import { Ticket } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type MyTicketItemProps = {
    ticket: ITicket;
    onPress?: (ticket: ITicket) => void;
};

export function MyTicketItem({ ticket, onPress }: MyTicketItemProps) {
    const status = getTicketStatusConfig(ticket.status);
    const typeLabel = getTicketTypeLabel(ticket.ticketType);

    return (
        <Pressable
            accessibilityRole="button"
            className="flex-row gap-3 border-b border-border px-4 py-4 active:bg-surface"
            onPress={() => onPress?.(ticket)}
        >
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Ticket color="#005f8b" size={22} />
            </View>

            <View className="min-w-0 flex-1 gap-1">
                <Text className="text-base font-bold text-text-primary" numberOfLines={2}>
                    Tuyến {getTicketRouteTitle(ticket)}
                </Text>
                <Text className="text-sm text-text-muted" numberOfLines={1}>
                    Lên xe tại: {ticket.startStopName}
                </Text>
                <Text className="text-sm text-text-muted">
                    {getTicketValidityLabel(ticket)}
                </Text>
            </View>

            <View className="items-end gap-1">
                <View className={`rounded-full px-2.5 py-1 ${status.badgeClass}`}>
                    <Text className="text-xs font-semibold">{status.label}</Text>
                </View>
                <Text className="text-xs text-text-muted">({typeLabel})</Text>
            </View>
        </Pressable>
    );
}

type QrTicketItemProps = {
    ticket: ITicket;
    onPress?: (ticket: ITicket) => void;
};

export function QrTicketItem({ ticket, onPress }: QrTicketItemProps) {
    return (
        <Pressable
            accessibilityRole="button"
            className="mx-5 mb-3 flex-row items-center gap-3 rounded-2xl border border-border bg-surface-elevated px-4 py-4 active:opacity-90"
            onPress={() => onPress?.(ticket)}
        >
            <View className="h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white">
                {ticket.qrCodeImage ? (
                    <Image
                        source={{ uri: ticket.qrCodeImage }}
                        style={{ width: 52, height: 52 }}
                        contentFit="contain"
                    />
                ) : (
                    <Ticket color="#005f8b" size={24} />
                )}
            </View>

            <View className="min-w-0 flex-1 gap-1">
                <Text className="text-base font-bold text-text-primary" numberOfLines={2}>
                    {getTicketRouteTitle(ticket)}
                </Text>
                <Text className="text-sm text-text-muted">
                    {getTicketSubtitle(ticket)}
                </Text>
            </View>

            <Text className="text-xl text-primary">{">"}</Text>
        </Pressable>
    );
}
