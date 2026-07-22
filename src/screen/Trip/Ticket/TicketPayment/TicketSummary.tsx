import useTripBookingStore from "@/store/tripBooking.store";
import { Text, View } from "react-native";
import { ArrowDown, CalendarClock, MapPin, Ticket } from "lucide-react-native";
import IconDetail from "./IconDetail";

const TicketSummary = () => {
    const searchContext = useTripBookingStore((state) => state.searchContext);
    const routeCode = useTripBookingStore((state) => state.routeCode);
    const ticketType = useTripBookingStore((state) => state.ticketType);
    const singleForm = useTripBookingStore((state) => state.singleForm);
    const monthlyForm = useTripBookingStore((state) => state.monthlyForm);
    const pickupStopName = useTripBookingStore((state) => state.pickupStopName);

    const origin = searchContext?.originName ?? "Điểm đi";
    const dest = searchContext?.destinationName ?? "Điểm đến";

    const TICKET_TYPE_CONFIG: Record<
        "single" | "monthly",
        { badgeLabel: string; primaryLabel: string; primaryValue: string; countValue: string; pickupValue: string }
    > = {
        single: {
            badgeLabel: "VÉ LƯỢT ĐI",
            primaryLabel: "Khởi hành",
            primaryValue: `${singleForm.departureTime} • ${singleForm.departureDate}`,
            countValue: `${(singleForm.seatCount || "0").padStart(2, "0")} ghế`,
            pickupValue: pickupStopName,
        },
        monthly: {
            badgeLabel: "VÉ THÁNG",
            primaryLabel: "Tháng sử dụng",
            primaryValue: monthlyForm.usageMonth,
            countValue: `${(monthlyForm.ticketCount || "0").padStart(2, "0")} vé`,
            pickupValue: "Không giới hạn",
        },
    };
    const config = TICKET_TYPE_CONFIG[ticketType as "single" | "monthly"];

    return (
        <View className="mb-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <View className="bg-primary/5 p-4 border-b border-border border-dashed">
                <Text className="text-xs font-medium text-primary mb-2">
                    {config.badgeLabel} • {routeCode}
                </Text>
                <View className="flex-col items-center justify-center gap-2">
                    <Text className="text-base font-bold text-text-primary" numberOfLines={2}>
                        {origin}
                    </Text>
                    <View className="items-center justify-center rounded-full bg-surface-elevated">
                        <ArrowDown size={18} color="#005f8b" />
                    </View>
                    <Text className="text-center text-base font-bold text-text-primary" numberOfLines={2}>
                        {dest}
                    </Text>
                </View>
            </View>

            <View className="p-4 gap-4">
                <View className="flex-row justify-between gap-4">
                    <IconDetail icon={CalendarClock} label={config.primaryLabel} value={config.primaryValue} />
                    <IconDetail icon={Ticket} label="Số lượng" value={config.countValue} />
                </View>

                <View className="flex-row justify-between gap-4">
                    <IconDetail icon={MapPin} label="Điểm đón" value={config.pickupValue} />
                    <IconDetail icon={MapPin} label="Điểm trả" value={dest} />
                </View>
            </View>
        </View>
    );
};

export default TicketSummary;
