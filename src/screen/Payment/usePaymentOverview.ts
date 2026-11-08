import type { IPaymentMethod } from "@/models/paymentMethod";
import type { ITicket } from "@/models/ticket";
import { paymentService } from "@/services/PaymentService";
import { ticketService } from "@/services/TicketService";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";

export default function usePaymentOverview() {
    const [methods, setMethods] = useState<IPaymentMethod[]>([]);
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [methodsError, setMethodsError] = useState(false);
    const [ticketsError, setTicketsError] = useState(false);
    const requestId = useRef(0);

    const refresh = useCallback(async () => {
        const id = ++requestId.current;
        setIsLoading(true);
        const [methodsResult, ticketsResult] = await Promise.allSettled([
            paymentService.getMyPaymentMethods({}).then((response) => {
                if (!response.success || !Array.isArray(response.data)) {
                    throw new Error("Invalid payment methods response");
                }
                return response.data as IPaymentMethod[];
            }),
            ticketService.getMyTickets({ page: 1, limit: 6 }).then((response) => {
                if (!response.success || !Array.isArray(response.data?.items)) {
                    throw new Error("Invalid tickets response");
                }
                return response.data.items as ITicket[];
            }),
        ]);
        // A request from an earlier visit must not replace the latest data.
        if (id !== requestId.current) return;
        if (methodsResult.status === "fulfilled") setMethods(methodsResult.value);
        if (ticketsResult.status === "fulfilled") setTickets(ticketsResult.value);
        setMethodsError(methodsResult.status === "rejected");
        setTicketsError(ticketsResult.status === "rejected");
        setHasLoaded(true);
        setIsLoading(false);
    }, []);

    useFocusEffect(useCallback(() => {
        void refresh();
        return () => { requestId.current++; };
    }, [refresh]));

    return { methods, tickets, isLoading, hasLoaded, methodsError, ticketsError, refresh };
}
