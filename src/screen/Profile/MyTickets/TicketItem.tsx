import type { ITicket } from "@/models/ticket";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import {
    getTicketRouteTitle,
    getTicketStatusConfig,
    getTicketSubtitle,
    getTicketTypeLabel,
    getTicketValidityLabel,
} from "@/utils/ticket";
import { Image } from "expo-image";
import { ChevronRight, Ticket } from "lucide-react-native";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";

function statusToVariant(
    status: ITicket["status"],
): "success" | "warning" | "muted" | "danger" {
    if (status === "paid" || status === "active") return "success";
    if (status === "pending") return "warning";
    if (status === "cancelled") return "danger";
    return "muted";
}

type MyTicketItemProps = {
    ticket: ITicket;
    onPress?: (ticket: ITicket) => void;
};

function MyTicketItemComponent({ ticket, onPress }: MyTicketItemProps) {
    const status = getTicketStatusConfig(ticket.status);
    const typeLabel = getTicketTypeLabel(ticket.ticketType);

    return (
        <Pressable
            accessibilityRole="button"
            className="mb-3 active:opacity-90"
            onPress={() => onPress?.(ticket)}
        >
            <Card className="flex-row gap-3" padding="md">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-primary-light">
                    <Ticket color="#005f8b" size={22} />
                </View>

                <View className="min-w-0 flex-1 gap-1">
                    <Text
                        className="text-base font-bold text-text-primary"
                        numberOfLines={2}
                    >
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
                    <StatusPill
                        label={status.label}
                        variant={statusToVariant(ticket.status)}
                    />
                    <Text className="text-xs text-text-muted">({typeLabel})</Text>
                </View>
            </Card>
        </Pressable>
    );
}

export const MyTicketItem = memo(MyTicketItemComponent);

type QrTicketItemProps = {
    ticket: ITicket;
    onPress?: (ticket: ITicket) => void;
};

function QrTicketItemComponent({ ticket, onPress }: QrTicketItemProps) {
    return (
        <Pressable
            accessibilityRole="button"
            className="mb-3 active:opacity-90"
            onPress={() => onPress?.(ticket)}
        >
            <Card className="flex-row items-center gap-3" padding="md">
                <View className="h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-surface">
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
                    <Text
                        className="text-base font-bold text-text-primary"
                        numberOfLines={2}
                    >
                        {getTicketRouteTitle(ticket)}
                    </Text>
                    <Text className="text-sm text-text-muted">
                        {getTicketSubtitle(ticket)}
                    </Text>
                </View>

                <ChevronRight color="#005f8b" size={22} />
            </Card>
        </Pressable>
    );
}

export const QrTicketItem = memo(QrTicketItemComponent);
