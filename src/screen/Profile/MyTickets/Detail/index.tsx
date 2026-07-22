import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import type { ITicket } from "@/models/ticket";
import { ticketService } from "@/services/TicketService";
import {
    getTicketRouteTitle,
    getTicketStatusConfig,
    getTicketSubtitle,
    getTicketTypeLabel,
    getTicketValidityLabel,
} from "@/utils/ticket";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function MyTicketDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [ticket, setTicket] = useState<ITicket | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const loadTicket = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await ticketService.getTicketDetail({ id });
                setTicket(response.data ?? null);
            } catch {
                setError("Không thể tải thông tin vé");
            } finally {
                setIsLoading(false);
            }
        };

        loadTicket();
    }, [id]);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-app-shell">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    if (!ticket || error) {
        return (
            <View className="flex-1 bg-app-shell">
                <PageHeader title="Chi tiết vé" isIconBack />
                <Text className="px-5 py-10 text-center text-sm text-text-muted">
                    {error ?? "Không tìm thấy vé"}
                </Text>
            </View>
        );
    }

    const status = getTicketStatusConfig(ticket.status);

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title="Chi tiết vé" isIconBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-4 px-5 pb-10 pt-5"
                showsVerticalScrollIndicator={false}
            >
                <Card className="items-center" padding="lg">
                    {ticket.qrCodeImage ? (
                        <Image
                            source={{ uri: ticket.qrCodeImage }}
                            style={{ width: 220, height: 220 }}
                            contentFit="contain"
                        />
                    ) : (
                        <View className="h-[220px] w-[220px] items-center justify-center rounded-xl bg-surface">
                            <Text className="text-sm text-text-muted">
                                Chưa có mã QR
                            </Text>
                        </View>
                    )}
                    {ticket.qrCode ? (
                        <Text className="mt-4 text-center text-sm text-text-muted">
                            {ticket.qrCode}
                        </Text>
                    ) : null}
                </Card>

                <Card className="gap-4" padding="lg">
                    <View className="flex-row items-start justify-between gap-3">
                        <Text className="flex-1 text-lg font-bold text-text-primary">
                            Tuyến {getTicketRouteTitle(ticket)}
                        </Text>
                        <StatusPill label={status.label} variant="primary" />
                    </View>

                    <DetailRow label="Loại vé" value={getTicketTypeLabel(ticket.ticketType)} />
                    <DetailRow label="Lên xe tại" value={ticket.startStopName} />
                    <DetailRow label="Xuống tại" value={ticket.endStopName} />
                    <DetailRow label="Thời gian" value={getTicketSubtitle(ticket)} />
                    <DetailRow label="Hiệu lực" value={getTicketValidityLabel(ticket)} />
                    <DetailRow label="Số ghế" value={String(ticket.seatQuantity)} />
                    <DetailRow
                        label="Giá"
                        value={`${ticket.price.toLocaleString("vi-VN")} đồng`}
                    />
                </Card>
            </ScrollView>
        </View>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <View className="gap-1">
            <Text className="text-xs text-text-muted">{label}</Text>
            <Text className="text-sm font-medium text-text-primary">{value}</Text>
        </View>
    );
}
