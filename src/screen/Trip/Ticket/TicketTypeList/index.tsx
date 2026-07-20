import { PageHeader } from "@/components/PageHeader";
import { TICKET_TYPE_OPTIONS } from "@/constants/ticket";
import { TicketTypeCard } from "@/screen/Trip/Ticket/TicketTypeCard";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function TicketTypeListScreen() {
    const params = useLocalSearchParams<{
        originName?: string;
        destinationName?: string;
        originLat?: string;
        originLng?: string;
        destinationLat?: string;
        destinationLng?: string;
        pickupStopName?: string;
        routeCode?: string;
    }>();

    const handleSelectTicket = (ticketId: string) => {
        if (ticketId === "single") {
            router.push({
                pathname: "/trips/tickets/single",
                params,
            });
            return;
        }

        router.push({
            pathname: "/trips/tickets/monthly",
            params: {
                ...params,
                ticketType: ticketId,
            },
        });
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
