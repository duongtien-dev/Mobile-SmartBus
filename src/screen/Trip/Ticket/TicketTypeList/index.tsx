import type { TicketTypeId } from "@/constants/ticket";
import { TICKET_TYPE_OPTIONS } from "@/constants/ticket";
import { PageHeader } from "@/components/PageHeader";
import { TicketTypeCard } from "@/screen/Trip/Ticket/TicketTypeCard";
import useTripBookingStore from "@/store/tripBooking.store";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function TicketTypeListScreen() {
    const setTicketType = useTripBookingStore((state) => state.setTicketType);

    const handleSelectTicket = (ticketId: TicketTypeId) => {
        setTicketType(ticketId);

        if (ticketId === "single") {
            router.push("/trips/tickets/single" as never);
            return;
        }

        router.push("/trips/tickets/monthly" as never);
    };

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Mua vé" isIconBack={true} />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-5 px-5 pb-8 pt-2"
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-lg font-bold text-primary">
                    Bạn muốn mua loại vé nào?
                </Text>

                {TICKET_TYPE_OPTIONS.map((option) => (
                    <TicketTypeCard
                        key={option.id}
                        option={option}
                        onPress={() => handleSelectTicket(option.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
