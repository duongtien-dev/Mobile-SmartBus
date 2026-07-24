import useTripBookingStore from "@/store/tripBooking.store";
import { Text, View } from "react-native";
import { CalendarClock, Circle, MapPin, Ticket } from "lucide-react-native";
import IconDetail from "./IconDetail";

const TicketSummary = () => {
    const searchContext = useTripBookingStore((state) => state.searchContext);
    const bookingSelection = useTripBookingStore((state) => state.bookingSelection);
    const ticketType = useTripBookingStore((state) => state.ticketType);
    const singleForm = useTripBookingStore((state) => state.singleForm);
    const monthlyForm = useTripBookingStore((state) => state.monthlyForm);

    const origin = searchContext?.originName ?? "Điểm đi";
    const dest = searchContext?.destinationName ?? "Điểm đến";
    const isSingleTicket = ticketType === "single";
    const quantity = Math.max(
        Number(
            isSingleTicket ? singleForm.seatCount : monthlyForm.ticketCount,
        ) || 1,
        1,
    );

    const config = isSingleTicket
        ? {
            badgeLabel: "VÉ LƯỢT ĐI",
            primaryLabel: "Khởi hành",
            primaryValue: `${singleForm.departureTime} • ${singleForm.departureDate}`,
            countValue: `${quantity} ghế`,
            pickupValue: bookingSelection?.startStopName || "—",
        }
        : {
            badgeLabel:
                ticketType === "monthlyInterRoute"
                    ? "VÉ THÁNG LIÊN TUYẾN"
                    : "VÉ THÁNG ĐƠN TUYẾN",
            primaryLabel: "Tháng sử dụng",
            primaryValue: monthlyForm.usageMonth || "—",
            countValue: `${quantity} vé`,
            pickupValue: "Không giới hạn",
        };

    return (
        <View className="mb-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <View className="bg-primary/5 p-4 border-b border-border border-dashed">
                <Text className="text-xs font-medium text-primary mb-3">
                    {config.badgeLabel} • {bookingSelection?.routeCode || "—"}
                </Text>

                <View>
                    <View className="flex-row gap-3">
                        <View className="items-center w-5">
                            <Circle size={14} color="#005f8b" fill="#005f8b" />
                            <View className="w-px flex-1 bg-border/70 my-1" />
                        </View>
                        <View className="flex-1 pb-3">
                            <Text className="text-[11px] text-text-muted mb-0.5">Điểm đi</Text>
                            <Text className="text-sm font-bold text-text-primary">{origin}</Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        <View className="items-center w-5">
                            <MapPin size={16} color="#005f8b" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[11px] text-text-muted mb-0.5">Điểm đến</Text>
                            <Text className="text-sm font-bold text-text-primary">{dest}</Text>
                        </View>
                    </View>
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
