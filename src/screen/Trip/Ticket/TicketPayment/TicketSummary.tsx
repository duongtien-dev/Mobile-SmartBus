import { useTranslation } from "@/i18n";
import useTripBookingStore from "@/store/tripBooking.store";
import { CalendarClock, Circle, MapPin, Ticket } from "lucide-react-native";
import { Text, View } from "react-native";
import IconDetail from "./IconDetail";

const TicketSummary = () => {
    const { t } = useTranslation();
    const searchContext = useTripBookingStore((state) => state.searchContext);
    const bookingSelection = useTripBookingStore(
        (state) => state.bookingSelection,
    );
    const ticketType = useTripBookingStore((state) => state.ticketType);
    const singleForm = useTripBookingStore((state) => state.singleForm);
    const monthlyForm = useTripBookingStore((state) => state.monthlyForm);

    const origin = searchContext?.originName ?? t("common.origin");
    const dest = searchContext?.destinationName ?? t("common.destination");
    const isSingleTicket = ticketType === "single";
    const quantity = Math.max(
        Number(
            isSingleTicket ? singleForm.seatCount : monthlyForm.ticketCount,
        ) || 1,
        1,
    );

    const config = isSingleTicket
        ? {
              badgeLabel: t("ticket.payment.badgeSingle"),
              primaryLabel: t("ticket.payment.departure"),
              primaryValue: `${singleForm.departureTime} • ${singleForm.departureDate}`,
              countValue: t("ticket.payment.seatUnit", { n: quantity }),
              pickupValue: bookingSelection?.startStopName || "—",
          }
        : {
              badgeLabel:
                  ticketType === "monthlyInterRoute"
                      ? t("ticket.payment.badgeMonthlyInter")
                      : t("ticket.payment.badgeMonthlySingle"),
              primaryLabel: t("ticket.payment.useMonth"),
              primaryValue: monthlyForm.usageMonth || "—",
              countValue: t("ticket.payment.ticketUnit", { n: quantity }),
              pickupValue: t("ticket.payment.unlimited"),
          };

    return (
        <View className="mb-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <View className="border-b border-dashed border-border bg-primary/5 p-4">
                <Text className="mb-3 text-xs font-medium text-primary">
                    {config.badgeLabel} • {bookingSelection?.routeCode || "—"}
                </Text>

                <View>
                    <View className="flex-row gap-3">
                        <View className="w-5 items-center">
                            <Circle size={14} color="#005f8b" fill="#005f8b" />
                            <View className="my-1 w-px flex-1 bg-border/70" />
                        </View>
                        <View className="flex-1 pb-3">
                            <Text className="mb-0.5 text-[11px] text-text-muted">
                                {t("common.origin")}
                            </Text>
                            <Text className="text-sm font-bold text-text-primary">
                                {origin}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        <View className="w-5 items-center">
                            <MapPin size={16} color="#005f8b" />
                        </View>
                        <View className="flex-1">
                            <Text className="mb-0.5 text-[11px] text-text-muted">
                                {t("common.destination")}
                            </Text>
                            <Text className="text-sm font-bold text-text-primary">
                                {dest}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className="gap-4 p-4">
                <View className="flex-row justify-between gap-4">
                    <IconDetail
                        icon={CalendarClock}
                        label={config.primaryLabel}
                        value={config.primaryValue}
                    />
                    <IconDetail
                        icon={Ticket}
                        label={t("ticket.payment.quantity")}
                        value={config.countValue}
                    />
                </View>

                <View className="flex-row justify-between gap-4">
                    <IconDetail
                        icon={MapPin}
                        label={t("ticket.payment.pickup")}
                        value={config.pickupValue}
                    />
                    <IconDetail
                        icon={MapPin}
                        label={t("ticket.payment.dropoff")}
                        value={dest}
                    />
                </View>
            </View>
        </View>
    );
};

export default TicketSummary;
