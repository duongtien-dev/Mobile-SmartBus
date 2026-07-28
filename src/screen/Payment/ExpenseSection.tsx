import { formatVnd } from "@/constants/ticket";
import { useTranslation } from "@/i18n";
import type { ITicket } from "@/models/ticket";
import { getTicketRouteTitle, getTripHistoryTimeLabel } from "@/utils/ticket";
import type { LucideIcon } from "lucide-react-native";
import { Bus, ShoppingBag, Ticket } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type ExpenseRowProps = {
    ticket: ITicket;
    onPress: (ticket: ITicket) => void;
};

function iconForTicket(ticket: ITicket): LucideIcon {
    if (ticket.ticketType === "single") return Ticket;
    if (ticket.ticketType.startsWith("monthly")) return ShoppingBag;
    return Bus;
}

function ExpenseRow({ ticket, onPress }: ExpenseRowProps) {
    const Icon = iconForTicket(ticket);

    return (
        <Pressable
            accessibilityRole="button"
            onPress={() => onPress(ticket)}
            className="flex-row items-center gap-3 px-4 py-3.5 active:opacity-80"
        >
            <View className="h-12 w-12 items-center justify-center rounded-full bg-[#F0EFF4]">
                <Icon color="#1A1A1A" size={20} />
            </View>
            <View className="min-w-0 flex-1">
                <Text
                    className="text-[15px] font-semibold text-text-primary"
                    numberOfLines={1}
                >
                    {getTicketRouteTitle(ticket)}
                </Text>
                <Text className="mt-0.5 text-xs text-text-muted" numberOfLines={1}>
                    {getTripHistoryTimeLabel(ticket)}
                </Text>
            </View>
            <Text className="text-[15px] font-bold text-text-primary">
                {formatVnd(ticket.price)}
            </Text>
        </Pressable>
    );
}

type ExpenseSectionProps = {
    tickets: ITicket[];
    onViewAll: () => void;
    onItemPress: (ticket: ITicket) => void;
};

export function ExpenseSection({
    tickets,
    onViewAll,
    onItemPress,
}: ExpenseSectionProps) {
    const { t } = useTranslation();

    return (
        <View className="mt-6 flex-1 px-5">
            <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-lg font-bold text-text-primary">
                    {t("payment.manageExpenses")}
                </Text>
                <Pressable
                    accessibilityRole="button"
                    onPress={onViewAll}
                    className="active:opacity-70"
                >
                    <Text className="text-sm font-semibold text-[#6B4EFF]">
                        {t("payment.viewAll")}
                    </Text>
                </Pressable>
            </View>

            <View className="overflow-hidden rounded-t-[28px] bg-white pb-2">
                {tickets.length > 0 ? (
                    tickets.map((ticket, index) => (
                        <View key={ticket._id}>
                            <ExpenseRow ticket={ticket} onPress={onItemPress} />
                            {index < tickets.length - 1 ? (
                                <View className="mx-4 h-px bg-[#F0EFF4]" />
                            ) : null}
                        </View>
                    ))
                ) : (
                    <Text className="px-4 py-8 text-center text-sm text-text-muted">
                        {t("payment.expensesEmpty")}
                    </Text>
                )}
            </View>
        </View>
    );
}
