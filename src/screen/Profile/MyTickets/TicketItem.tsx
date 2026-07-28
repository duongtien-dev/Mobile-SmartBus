import type { ITicket, TicketType } from "@/models/ticket";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import {
    getTicketDisplayCode,
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

function typeTone(type: TicketType) {
    switch (type) {
        case "single":
            return {
                iconBg: "bg-primary-light",
                badgeBg: "bg-primary/15",
            };
        case "monthlySingleRoute":
            return {
                iconBg: "bg-[#6B4EFF]/20",
                badgeBg: "bg-[#6B4EFF]/15",
            };
        case "monthlyInterRoute":
            return {
                iconBg: "bg-[#F0A07A]/20",
                badgeBg: "bg-[#F0A07A]/15",
            };
    }
}

type MyTicketItemProps = {
    ticket: ITicket;
    onPress?: (ticket: ITicket) => void;
};

function MyTicketItemComponent({ ticket, onPress }: MyTicketItemProps) {
    const status = getTicketStatusConfig(ticket.status);
    const typeLabel = getTicketTypeLabel(ticket.ticketType);
    const tone = typeTone(ticket.ticketType);

    return (
        <Pressable
            accessibilityRole="button"
            className="mb-3 active:opacity-90"
            onPress={() => onPress?.(ticket)}
        >
            <Card
                padding="none"
                className="border border-border/60 bg-white"
            >
                <View className="flex-row items-start gap-4 px-5 py-4">
                    <View
                        className={`h-12 w-12 items-center justify-center rounded-2xl ${tone.iconBg}`}
                    >
                        <Ticket color="#005f8b" size={22} />
                    </View>

                    <View className="min-w-0 flex-1 gap-1">
                        <Text
                            className="text-[15px] font-bold text-text-primary"
                            numberOfLines={1}
                        >
                            Tuyến {getTicketRouteTitle(ticket)}
                        </Text>
                        <Text
                            className="text-sm text-text-muted"
                            numberOfLines={1}
                        >
                            Lên xe tại: {ticket.startStopName}
                        </Text>
                        <Text className="text-sm text-text-muted">
                            {getTicketValidityLabel(ticket)}
                        </Text>
                    </View>

                    <View className="items-end gap-2">
                        <StatusPill
                            label={status.label}
                            variant={statusToVariant(ticket.status)}
                        />
                        <View
                            className={`rounded-full px-3 py-1 ${tone.badgeBg}`}
                        >
                            <Text className="text-[11px] font-semibold text-text-muted">
                                {typeLabel}
                            </Text>
                        </View>
                        <ChevronRight color="#005f8b" size={20} />
                    </View>
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
    const code = getTicketDisplayCode(ticket);

    const tone = typeTone(ticket.ticketType);

    return (
        <Pressable
            accessibilityRole="button"
            className="mb-3 active:opacity-90"
            onPress={() => onPress?.(ticket)}
        >
            <Card
                padding="none"
                className="border border-border/60 bg-white"
            >
                <View className="flex-row items-center gap-4 px-5 py-4">
                    <View
                        className={`h-14 w-14 items-center justify-center overflow-hidden rounded-2xl ${tone.iconBg}`}
                    >
                        {ticket.qrCodeImage ? (
                            <Image
                                source={{ uri: ticket.qrCodeImage }}
                                style={{ width: 56, height: 56 }}
                                contentFit="contain"
                            />
                        ) : (
                            <Ticket color="#005f8b" size={24} />
                        )}
                    </View>

                    <View className="min-w-0 flex-1 gap-1">
                        <Text
                            className="text-[15px] font-bold text-text-primary"
                            numberOfLines={1}
                        >
                            Tuyến {getTicketRouteTitle(ticket)}
                        </Text>
                        <Text
                            className="text-sm text-text-muted"
                            numberOfLines={1}
                        >
                            {getTicketSubtitle(ticket)}
                        </Text>
                        <Text
                            className="text-xs text-text-muted"
                            numberOfLines={1}
                        >
                            {code}
                        </Text>
                    </View>

                    <ChevronRight color="#005f8b" size={22} />
                </View>
            </Card>
        </Pressable>
    );
}

export const QrTicketItem = memo(QrTicketItemComponent);
